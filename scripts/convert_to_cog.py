#!/usr/bin/env python3
"""
GeoTIFF to Cloud Optimized GeoTIFF (COG) Converter

This script converts regular GeoTIFF files to Cloud Optimized GeoTIFF (COG) format,
which is better suited for web applications and streaming.

Requirements:
- GDAL Python bindings (pip install gdal)
- Python 3.x

Usage:
python convert_to_cog.py input.tiff [output.tiff]

If output file is not specified, it will create a file with "_cog" suffix.
"""

import os
import sys
import subprocess
from pathlib import Path

def check_gdal_installed():
    """Check if GDAL is installed and available."""
    try:
        subprocess.run(['gdalinfo', '--version'], 
                      stdout=subprocess.PIPE, 
                      stderr=subprocess.PIPE, 
                      check=True)
        return True
    except (subprocess.SubprocessError, FileNotFoundError):
        print("Error: GDAL is not installed or not in PATH.")
        print("Please install GDAL first:")
        print("  Ubuntu/Debian: sudo apt-get install gdal-bin")
        print("  macOS: brew install gdal")
        print("  Windows: Install GDAL from https://trac.osgeo.org/osgeo4w/")
        return False

def convert_to_cog(input_file, output_file):
    """Convert a GeoTIFF file to Cloud Optimized GeoTIFF format."""
    print(f"Converting {input_file} to Cloud Optimized GeoTIFF...")
    
    # GDAL command to convert to COG
    cmd = [
        'gdal_translate',
        '-of', 'COG',
        '-co', 'COMPRESS=DEFLATE',
        '-co', 'PREDICTOR=2',
        '-co', 'TILED=YES',
        '-co', 'BLOCKXSIZE=512',
        '-co', 'BLOCKYSIZE=512',
        '-co', 'COPY_SRC_OVERVIEWS=YES',
        '-co', 'BIGTIFF=IF_SAFER',
        str(input_file),
        str(output_file)
    ]
    
    try:
        subprocess.run(cmd, check=True)
        print(f"Successfully converted to {output_file}")
        return True
    except subprocess.SubprocessError as e:
        print(f"Conversion failed: {e}")
        return False

def main():
    """Main function to handle command line arguments and run conversion."""
    # Check arguments
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <input-file> [output-file]")
        sys.exit(1)
    
    input_file = Path(sys.argv[1])
    
    # If output file is not specified, create one with _cog suffix
    if len(sys.argv) >= 3:
        output_file = Path(sys.argv[2])
    else:
        output_file = input_file.with_name(f"{input_file.stem}_cog{input_file.suffix}")
    
    # Check if input file exists
    if not input_file.exists():
        print(f"Error: Input file {input_file} does not exist.")
        sys.exit(1)
    
    # Check if GDAL is installed
    if not check_gdal_installed():
        sys.exit(1)
    
    # Convert the file
    success = convert_to_cog(input_file, output_file)
    
    if success:
        print("Conversion completed successfully!")
        print(f"Input file: {input_file}")
        print(f"Output file: {output_file}")
        sys.exit(0)
    else:
        print("Conversion failed.")
        sys.exit(1)

if __name__ == "__main__":
    main()
