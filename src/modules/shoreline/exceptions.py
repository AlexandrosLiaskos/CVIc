class ShorelineError(Exception):
    """Base exception for shoreline module"""
    pass

class ValidationError(ShorelineError):
    """Configuration/input validation errors"""
    pass

class ProcessingError(ShorelineError):
    """Runtime processing errors"""
    pass

class ExportError(ShorelineError):
    """Data export errors"""
    pass

class DataLoadError(ShorelineError):
    """Data loading errors"""
    pass

class GEEAuthenticationError(ShorelineError):
    """Google Earth Engine authentication errors.

    This exception is raised when there are issues with:
    - GEE initialization
    - Authentication failures
    - Invalid or expired credentials
    - Network errors during authentication
    """
    pass

class MapInitializationError(ShorelineError):
    """Map initialization and rendering errors.

    This exception is raised when there are issues with:
    - Folium map creation and configuration
    - Web view initialization
    - JavaScript bridge setup
    - Map tile loading
    - WebChannel communication errors
    - Map rendering and display problems
    - Temporary file handling for map HTML
    """
    pass
