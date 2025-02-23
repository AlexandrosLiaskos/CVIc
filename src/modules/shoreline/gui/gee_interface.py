from typing import Dict, List, Optional, Tuple
import ee
import numpy as np
from datetime import datetime
from ..exceptions import DataLoadError

class GEEInterface:
    """Interface for fetching and processing Google Earth Engine data"""

    def __init__(self):
        """Initialize the GEE interface"""
        try:
            ee.Initialize()
        except Exception as e:
            raise DataLoadError(f"Failed to initialize GEE: {str(e)}")

    def get_satellite_data(
        self,
        geometry: ee.Geometry,
        start_date: str,
        end_date: str,
        source: str,
        cloud_cover: float = 20
    ) -> Dict[str, np.ndarray]:
        """Fetch satellite imagery from GEE

        Args:
            geometry: Area of interest
            start_date: Start date in YYYY-MM-DD format
            end_date: End date in YYYY-MM-DD format
            source: Satellite source (sentinel1, sentinel2, landsat)
            cloud_cover: Maximum cloud cover percentage

        Returns:
            Dictionary of band arrays
        """
        try:
            if source == 'sentinel1':
                return self._get_sentinel1(geometry, start_date, end_date)
            elif source == 'sentinel2':
                return self._get_sentinel2(geometry, start_date, end_date, cloud_cover)
            elif source == 'landsat':
                return self._get_landsat(geometry, start_date, end_date, cloud_cover)
            else:
                raise DataLoadError(f"Unsupported satellite source: {source}")
        except Exception as e:
            raise DataLoadError(f"Failed to fetch {source} data: {str(e)}")

    def _get_sentinel1(
        self,
        geometry: ee.Geometry,
        start_date: str,
        end_date: str
    ) -> Dict[str, np.ndarray]:
        """Fetch Sentinel-1 SAR imagery"""
        collection = (ee.ImageCollection('COPERNICUS/S1_GRD')
            .filterBounds(geometry)
            .filterDate(start_date, end_date)
            .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
            .filter(ee.Filter.eq('instrumentMode', 'IW')))

        if collection.size().getInfo() == 0:
            raise DataLoadError("No Sentinel-1 images found for the specified parameters")

        # Get median composite
        image = collection.median()

        # Get VV and VH bands
        bands = {}
        for band in ['VV', 'VH']:
            if image.bandNames().contains(band).getInfo():
                # Convert to numpy array
                array = np.array(
                    image.select(band).reduceRegion(
                        reducer=ee.Reducer.toList(),
                        geometry=geometry,
                        scale=10
                    ).getInfo().get(band)
                )
                bands[band] = array

        return bands

    def _get_sentinel2(
        self,
        geometry: ee.Geometry,
        start_date: str,
        end_date: str,
        cloud_cover: float
    ) -> Dict[str, np.ndarray]:
        """Fetch Sentinel-2 optical imagery"""
        collection = (ee.ImageCollection('COPERNICUS/S2')
            .filterBounds(geometry)
            .filterDate(start_date, end_date)
            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloud_cover)))

        if collection.size().getInfo() == 0:
            raise DataLoadError("No Sentinel-2 images found for the specified parameters")

        # Get median composite
        image = collection.median()

        # Get required bands
        bands = {}
        band_list = ['B2', 'B3', 'B4', 'B8', 'B11', 'B12']  # blue, green, red, nir, swir1, swir2
        band_map = {
            'B2': 'blue',
            'B3': 'green',
            'B4': 'red',
            'B8': 'nir',
            'B11': 'swir1',
            'B12': 'swir2'
        }

        for band in band_list:
            array = np.array(
                image.select(band).reduceRegion(
                    reducer=ee.Reducer.toList(),
                    geometry=geometry,
                    scale=10
                ).getInfo().get(band)
            )
            bands[band_map[band]] = array

        return bands

    def _get_landsat(
        self,
        geometry: ee.Geometry,
        start_date: str,
        end_date: str,
        cloud_cover: float
    ) -> Dict[str, np.ndarray]:
        """Fetch Landsat 8/9 imagery"""
        collection = (ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
            .filterBounds(geometry)
            .filterDate(start_date, end_date)
            .filter(ee.Filter.lt('CLOUD_COVER', cloud_cover)))

        if collection.size().getInfo() == 0:
            raise DataLoadError("No Landsat images found for the specified parameters")

        # Get median composite
        image = collection.median()

        # Get required bands
        bands = {}
        band_list = ['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7']
        band_map = {
            'SR_B2': 'blue',
            'SR_B3': 'green',
            'SR_B4': 'red',
            'SR_B5': 'nir',
            'SR_B6': 'swir1',
            'SR_B7': 'swir2'
        }

        for band in band_list:
            array = np.array(
                image.select(band).reduceRegion(
                    reducer=ee.Reducer.toList(),
                    geometry=geometry,
                    scale=30
                ).getInfo().get(band)
            )
            bands[band_map[band]] = array

        return bands

    @staticmethod
    def geometry_from_geojson(geojson: Dict) -> ee.Geometry:
        """Convert GeoJSON to Earth Engine geometry

        Args:
            geojson: GeoJSON geometry object

        Returns:
            Earth Engine geometry
        """
        return ee.Geometry(geojson)

    @staticmethod
    def parse_date(date_str: str) -> datetime:
        """Parse date string to datetime object

        Args:
            date_str: Date string in YYYY-MM-DD format

        Returns:
            datetime object
        """
        return datetime.strptime(date_str, "%Y-%m-%d")
