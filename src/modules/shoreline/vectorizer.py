from typing import Dict, List, Optional, Tuple, Union
import numpy as np
from scipy import ndimage
from shapely.geometry import LineString, MultiLineString, mapping
from shapely.ops import unary_union
import cv2
from .exceptions import ProcessingError

class Vectorizer:
    """Class for converting water masks into vectorized shorelines"""

    def __init__(self, config: Dict):
        """Initialize vectorizer with configuration

        Args:
            config: Dictionary containing vectorization parameters
        """
        self.config = config
        self.simplify_tolerance = config.get('simplify_tolerance', 10)
        self.smooth_factor = config.get('smooth_factor', 0.5)

    def extract_ocean_water(self, water_mask: np.ndarray, boundary_width: int = 1) -> np.ndarray:
        """Extract ocean water from a binary water mask

        This method identifies the largest water body connected to the image boundary,
        which is typically the ocean.

        Args:
            water_mask: Binary water mask
            boundary_width: Width of boundary zone to check for ocean connection

        Returns:
            Binary mask containing only ocean water
        """
        try:
            # Create boundary zone
            height, width = water_mask.shape
            boundary_mask = np.zeros_like(water_mask)
            boundary_mask[0:boundary_width, :] = 1  # Top
            boundary_mask[-boundary_width:, :] = 1  # Bottom
            boundary_mask[:, 0:boundary_width] = 1  # Left
            boundary_mask[:, -boundary_width:] = 1  # Right

            # Label connected components
            labeled_water, num_features = ndimage.label(water_mask)

            # Find water regions connected to boundary
            boundary_labels = np.unique(labeled_water[boundary_mask == 1])
            boundary_labels = boundary_labels[boundary_labels != 0]  # Remove background

            if len(boundary_labels) == 0:
                return np.zeros_like(water_mask)

            # Get sizes of boundary-connected regions
            sizes = [(label, np.sum(labeled_water == label)) for label in boundary_labels]
            ocean_label = max(sizes, key=lambda x: x[1])[0]

            # Create ocean mask
            ocean_mask = labeled_water == ocean_label
            return ocean_mask

        except Exception as e:
            raise ProcessingError(f"Error extracting ocean water: {str(e)}")

    def vectorize(self, water_mask: np.ndarray, pixel_size: float = 30.0) -> Dict:
        """Convert water mask to vectorized shoreline

        Args:
            water_mask: Binary water mask
            pixel_size: Size of pixels in meters

        Returns:
            GeoJSON-style dictionary containing shoreline features
        """
        try:
            # Extract contours
            contours = self._extract_contours(water_mask)
            if not contours:
                raise ProcessingError("No contours found in water mask")

            # Convert to lines
            lines = []
            for contour in contours:
                # Convert to real-world coordinates
                coords = contour.squeeze() * pixel_size
                # Create line and simplify/smooth
                line = self._process_line(coords)
                if line is not None:
                    lines.append(line)

            if not lines:
                raise ProcessingError("No valid shoreline segments generated")

            # Combine into multi-line feature
            multi_line = MultiLineString(lines)

            # Create GeoJSON-style feature
            feature = {
                "type": "Feature",
                "geometry": mapping(multi_line),
                "properties": {
                    "length": multi_line.length,
                    "segments": len(lines)
                }
            }

            return feature

        except Exception as e:
            raise ProcessingError(f"Error vectorizing shoreline: {str(e)}")

    def _extract_contours(self, mask: np.ndarray) -> List[np.ndarray]:
        """Extract contours from binary mask using OpenCV

        Args:
            mask: Binary mask

        Returns:
            List of contour arrays
        """
        # Convert to uint8 for OpenCV
        mask_uint8 = mask.astype(np.uint8) * 255

        # Find contours
        contours, _ = cv2.findContours(
            mask_uint8,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_TC89_KCOS
        )

        return contours

    def _process_line(self, coords: np.ndarray) -> Optional[LineString]:
        """Process line coordinates with simplification and smoothing

        Args:
            coords: Array of line coordinates

        Returns:
            Processed LineString or None if invalid
        """
        try:
            # Create initial line
            line = LineString(coords)

            # Skip if too short
            if line.length < self.simplify_tolerance * 2:
                return None

            # Simplify to remove redundant points
            line = line.simplify(self.simplify_tolerance)

            # Smooth using Chaikin's algorithm
            if self.smooth_factor > 0:
                line = self._smooth_line(line)

            return line

        except Exception:
            return None

    def _smooth_line(self, line: LineString) -> LineString:
        """Smooth a line using Chaikin's algorithm

        Args:
            line: Input LineString

        Returns:
            Smoothed LineString
        """
        coords = np.array(line.coords)
        iterations = int(round(self.smooth_factor * 3))  # Scale iterations with smooth factor

        for _ in range(iterations):
            L = coords.shape[0]
            Q = np.zeros((2*L - 1, 2))

            # Calculate new points
            Q[::2] = 0.75 * coords[:-1] + 0.25 * coords[1:]
            Q[1::2] = 0.25 * coords[:-1] + 0.75 * coords[1:]

            # Add last point
            Q = np.vstack([Q, coords[-1]])
            coords = Q

        return LineString(coords)
