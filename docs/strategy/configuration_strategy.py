config = {
    "satellite": {
        "source": "sentinel2",  # sentinel1, sentinel2, landsat
        "water_index": "MNDWI", # NDWI, AWEI, etc for optical
        "cloud_cover": 20,      # max cloud coverage percentage
        "date_range": {
            "start": "2024-01-01",
            "end": "2024-02-22"
        }
    },
    "processing": {
        "aoi": {
            "geometry": {...},   # GeoJSON geometry
            "buffer": 500        # meters
        },
        "water_detection": {
            "threshold_method": "otsu",
            "smooth_kernel": 3,
            "min_area": 100     # minimum water body area
        },
        "vectorization": {
            "simplify_tolerance": 10,
            "smooth_factor": 0.5
        }
    },
    "output": {
        "format": "geojson",    # shapefile, geojson, raster
        "crs": "EPSG:4326",
        "attributes": ["length", "area"]
    }
}
