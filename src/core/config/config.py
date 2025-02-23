"""Core configuration module for CVIc project"""

import os
from pathlib import Path
from typing import Dict, Optional
from dataclasses import dataclass
import json

@dataclass
class CVIcConfig:
    """Global configuration for CVIc project"""
    app_name: str = "CVIc"
    version: str = "0.1.0"
    log_dir: Path = Path.home() / '.cvic' / 'logs'
    data_dir: Path = Path.home() / '.cvic' / 'data'
    config_dir: Path = Path.home() / '.cvic' / 'config'

    def __post_init__(self):
        """Create necessary directories"""
        self.log_dir.mkdir(parents=True, exist_ok=True)
        self.data_dir.mkdir(parents=True, exist_ok=True)
        self.config_dir.mkdir(parents=True, exist_ok=True)

class ConfigManager:
    """Configuration manager for CVIc project"""

    def __init__(self, config_path: Optional[str] = None):
        """Initialize configuration manager

        Args:
            config_path: Optional path to configuration file
        """
        self.config = CVIcConfig()
        self._load_config(config_path)

    def _load_config(self, config_path: Optional[str] = None):
        """Load configuration from file"""
        if config_path and os.path.exists(config_path):
            with open(config_path, 'r') as f:
                config_data = json.load(f)
                for key, value in config_data.items():
                    if hasattr(self.config, key):
                        setattr(self.config, key, value)

    def save_config(self, config_path: str):
        """Save current configuration to file"""
        with open(config_path, 'w') as f:
            json.dump({
                'app_name': self.config.app_name,
                'version': self.config.version,
                'log_dir': str(self.config.log_dir),
                'data_dir': str(self.config.data_dir),
                'config_dir': str(self.config.config_dir)
            }, f, indent=4)

    def get_module_config(self, module_name: str) -> Dict:
        """Get configuration for specific module

        Args:
            module_name: Name of the module

        Returns:
            Module-specific configuration
        """
        config_file = self.config.config_dir / f"{module_name}.json"
        if config_file.exists():
            with open(config_file, 'r') as f:
                return json.load(f)
        return {}

    def save_module_config(self, module_name: str, config: Dict):
        """Save module-specific configuration

        Args:
            module_name: Name of the module
            config: Configuration to save
        """
        config_file = self.config.config_dir / f"{module_name}.json"
        with open(config_file, 'w') as f:
            json.dump(config, f, indent=4)

# Global configuration instance
config_manager = ConfigManager()
