from typing import Optional, Tuple, Union, Dict
import numpy as np
from scipy import ndimage
from .exceptions import ProcessingError, ValidationError

class WaterDetector:
    """Class for detecting water bodies in satellite imagery"""

    def __init__(self, config: Dict):
        """Initialize water detector with configuration

        Args:
            config: Dictionary containing water detection parameters
        """
        self.config = config
        self._validate_config()

    def _validate_config(self):
        """Validate configuration parameters"""
        required_params = ['threshold_method', 'smooth_kernel', 'min_area']
        if not all(param in self.config for param in required_params):
            raise ValidationError(f"Missing required parameters: {required_params}")

    def detect_from_sar(self, vv: np.ndarray, vh: Optional[np.ndarray] = None) -> np.ndarray:
        """Detect water from SAR imagery using VV/VH polarization

        Args:
            vv: VV polarization band
            vh: Optional VH polarization band

        Returns:
            Binary water mask
        """
        try:
            # VV band processing
            vv_water = self._otsu_threshold(vv)

            if vh is not None:
                # VH band processing
                vh_water = self._otsu_threshold(vh)

                # Calculate VV/VH ratio
                with np.errstate(divide='ignore', invalid='ignore'):
                    ratio = np.power(10, vv/10) / np.power(10, vh/10)
                    ratio = np.nan_to_num(ratio)
                ratio_water = self._otsu_threshold(ratio)

                # Combine results using majority voting
                water_mask = ((vv_water.astype(int) +
                             vh_water.astype(int) +
                             ratio_water.astype(int)) > 1)
            else:
                water_mask = vv_water

            return self._post_process(water_mask)

        except Exception as e:
            raise ProcessingError(f"Error in SAR water detection: {str(e)}")

    def detect_from_optical(self, bands: Dict[str, np.ndarray], method: str = 'MNDWI') -> np.ndarray:
        """Detect water from optical imagery using specified index

        Args:
            bands: Dictionary of optical bands
            method: Water index method

        Returns:
            Binary water mask
        """
        try:
            water_index = self._calculate_water_index(bands, method)
            water_mask = self._otsu_threshold(water_index)
            return self._post_process(water_mask)

        except Exception as e:
            raise ProcessingError(f"Error in optical water detection: {str(e)}")

    def _calculate_water_index(self, bands: Dict[str, np.ndarray], method: str) -> np.ndarray:
        """Calculate water index from optical bands

        Args:
            bands: Dictionary of optical bands
            method: Water index method name

        Returns:
            Water index array
        """
        try:
            if method == 'MNDWI':
                return self._normalized_difference(bands['green'], bands['swir1'])
            elif method == 'NDWI':
                return self._normalized_difference(bands['green'], bands['nir'])
            elif method == 'AWEI':
                return (4 * (bands['green'] - bands['swir1']) -
                       (0.25 * bands['nir'] + 2.75 * bands['swir2']))
            elif method == 'AWEIsh':
                return (bands['blue'] + 2.5 * bands['green'] -
                       1.5 * (bands['nir'] + bands['swir1']) -
                       0.25 * bands['swir2'])
            elif method == 'SMBWI':
                with np.errstate(divide='ignore', invalid='ignore'):
                    result = ((bands['blue'] + bands['green'] + bands['red']) /
                             (bands['nir'] + bands['swir1'] + bands['swir2']))
                    return np.nan_to_num(result)
            else:
                raise ProcessingError(f"Unsupported water index method: {method}")

        except KeyError as e:
            raise ValidationError(f"Missing required band: {str(e)}")
        except Exception as e:
            raise ProcessingError(f"Error calculating water index: {str(e)}")

    def _normalized_difference(self, band1: np.ndarray, band2: np.ndarray) -> np.ndarray:
        """Calculate normalized difference between two bands"""
        with np.errstate(divide='ignore', invalid='ignore'):
            result = (band1 - band2) / (band1 + band2)
            return np.nan_to_num(result)

    def _otsu_threshold(self, image: np.ndarray) -> np.ndarray:
        """Apply Otsu thresholding to image

        Args:
            image: Input image array

        Returns:
            Binary mask after thresholding
        """
        try:
            # Calculate histogram
            hist, bin_edges = np.histogram(image[~np.isnan(image)].ravel(),
                                         bins=256, density=True)
            bin_centers = (bin_edges[:-1] + bin_edges[1:]) / 2

            # Calculate CDF
            cdf = hist.cumsum()
            cdf_normalized = cdf / cdf[-1]

            # Find optimal threshold
            fn_min = np.inf
            threshold = None

            for i in range(1, len(hist)):
                p1, p2 = cdf_normalized[i], 1.0 - cdf_normalized[i]
                if p1 < 1e-8 or p2 < 1e-8:
                    continue

                q1 = cdf[i]
                q2 = cdf[-1] - q1

                if q1 < 1e-8 or q2 < 1e-8:
                    continue

                m1 = np.sum(hist[:i] * bin_centers[:i]) / q1
                m2 = np.sum(hist[i:] * bin_centers[i:]) / q2

                v1 = np.sum(((bin_centers[:i] - m1) ** 2) * hist[:i]) / q1
                v2 = np.sum(((bin_centers[i:] - m2) ** 2) * hist[i:]) / q2

                fn = v1 * p1 + v2 * p2

                if fn < fn_min:
                    fn_min = fn
                    threshold = bin_centers[i]

            if threshold is None:
                raise ProcessingError("Could not determine Otsu threshold")

            return image > threshold

        except Exception as e:
            raise ProcessingError(f"Error in Otsu thresholding: {str(e)}")

    def _post_process(self, water_mask: np.ndarray) -> np.ndarray:
        """Apply post-processing to water mask

        Args:
            water_mask: Binary water mask

        Returns:
            Processed water mask
        """
        try:
            # Remove small objects
            labeled_array, num_features = ndimage.label(water_mask)
            component_sizes = np.bincount(labeled_array.ravel())
            component_sizes[0] = 0  # background
            mask_sizes = component_sizes[labeled_array]
            processed_mask = mask_sizes >= self.config['min_area']

            # Apply morphological operations
            kernel_size = self.config['smooth_kernel']
            kernel = np.ones((kernel_size, kernel_size), np.uint8)
            processed_mask = ndimage.binary_opening(processed_mask, structure=kernel)
            processed_mask = ndimage.binary_closing(processed_mask, structure=kernel)

            return processed_mask

        except Exception as e:
            raise ProcessingError(f"Error in post-processing: {str(e)}")
