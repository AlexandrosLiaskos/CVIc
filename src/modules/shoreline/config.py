from typing import Dict, List, Optional, Union
from datetime import datetime
from pydantic import BaseModel, Field

class AOIConfig(BaseModel):
    """Configuration for Area of Interest"""
    geometry: Dict  # GeoJSON geometry
    buffer: float = Field(default=500, description="Buffer distance in meters")

class WaterDetectionConfig(BaseModel):
    """Configuration for water detection process"""
    threshold_method: str = Field(default="otsu", description="Thresholding method")
    smooth_kernel: int = Field(default=3, description="Smoothing kernel size")
    min_area: float = Field(default=100, description="Minimum water body area in m²")

class VectorizationConfig(BaseModel):
    """Configuration for vectorization process"""
    simplify_tolerance: float = Field(default=10, description="Simplification tolerance")
    smooth_factor: float = Field(default=0.5, description="Line smoothing factor")

class DateRange(BaseModel):
    """Date range configuration"""
    start: datetime
    end: datetime = Field(default_factory=datetime.now)

class SatelliteConfig(BaseModel):
    """Satellite source configuration"""
    source: str = Field(..., description="Satellite source (sentinel1, sentinel2, landsat)")
    water_index: Optional[str] = Field(None, description="Water index for optical imagery")
    cloud_cover: float = Field(default=20, description="Maximum cloud cover percentage")
    date_range: DateRange

class OutputConfig(BaseModel):
    """Output configuration"""
    format: str = Field(default="geojson", description="Output format")
    crs: str = Field(default="EPSG:4326", description="Coordinate reference system")
    attributes: List[str] = Field(default_factory=lambda: ["length", "area"])

class ShorelineConfig(BaseModel):
    """Main configuration class for shoreline detection"""
    satellite: SatelliteConfig
    processing: Dict[str, Union[AOIConfig, WaterDetectionConfig, VectorizationConfig]]
    output: OutputConfig

    class Config:
        arbitrary_types_allowed = True
