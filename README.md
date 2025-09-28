```
                                  ██████╗ ██╗   ██╗ ██╗
                                 ██╔════╝ ██║   ██║ ██║ ██████╗
                                 ██║      ██║   ██║ ██║ ██╔════╝
                                 ██║      ╚██╗ ██╔╝ ██║ ██║
                                 ╚██████╗  ╚████╔╝  ██║ ╚██████╗
                                  ╚═════╝   ╚═══╝   ╚═╝ ╚═════╝
```

# CVIc - Coastal Vulnerability Index Compiler

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

> The first web-based end-to-end application dedicated to coastal vulnerability assessement

## 📋 Table of Contents

- [🌐 Live Application](#-live-application)
- [🚀 Installation](#-installation)
- [📖 Usage](#-usage)
- [✨ Features](#-features)
- [🔧 Technology Stack](#-technology-stack)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📚 Citation](#-citation)
- [📧 Contact](#-contact)

## 🌐 Live Application

🔗 **Live Application (v0.1.0)**: [https://alexandrosliaskos.github.io/CVIc/](https://alexandrosliaskos.github.io/CVIc/)

## 🚀 Installation

### Prerequisites

```bash
node >= 16.0.0
npm >= 8.0.0
```

### Quick Start

```bash
# Clone the repository
git clone https://github.com/alexandrosliaskos/CVIc.git
cd CVIc

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Firebase configuration

# Start development server
npm run dev
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview

# Deploy to Firebase Hosting
npm run deploy
```

## 📖 Usage

### Basic Workflow

1. **Import/Digitize Shoreline**: Upload existing vector data or digitize from satellite imagery
2. **Configure Segmentation**: Set segment length and spacing parameters
3. **Select CVI Variant**: Choose between CVI, RCVI, or ICVI
4. **Assign Values**: Interactive assignment of vulnerability scores (1-5 scale)
5. **View Results**: Analyze results with interactive visualizations
6. **Export Data**: Download as GeoJSON, Shapefile, or HTML report

### Supported Data Formats

| Format | Import | Export | Notes |
|--------|--------|--------|-------|
| Shapefile | ✅ | ❌ | Zipped .shp files |
| GeoTIFF | ✅ | ❌ | Satellite imagery |
| GeoJSON | ❌ | ✅ | Shoreline data |
| HTML | ❌ | ✅ | Report Export |

## ✨ Features

- **🗺️ Shoreline Management**: Upload existing shoreline data or digitize new shorelines from high-resolution satellite imagery
- **📐 Automated Segmentation**: Intelligent division of shorelines into analysis segments with customizable parameters
- **🎯 CVI Selection**: Choose from multiple Coastal Vulnerability Index variants:
  - **CVI** (Classical Coastal Vulnerability Index)
  - **ICVI** (Integrated Coastal Vulnerability Index)
- **⚡ Automated Formula Application**: Automatic CVI calculation based on selected index type with predefined formulas
- **📊 Interactive Value Assignment**: Assign vulnerability scores to shoreline segments through an intuitive interface
- **📈 Advanced Visualization**: View results on interactive maps with customizable symbology and statistical analysis
- **💾 Data Export**: Export results as GeoJSON, Shapefile, or comprehensive HTML reports
- **🔄 Real-time Processing**: Browser-based processing with no server dependencies

## 🔧 Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC
- **Styling**: Tailwind CSS + PostCSS

### Mapping & Geospatial
- **Mapping**: Leaflet + React-Leaflet
- **Geospatial Processing**: Turf.js
- **Raster Processing**: GeoTIFF.js, GeoRaster
- **Shapefile Processing**: Shapefile.js for Shapefiles

### Data & Storage
- **Client Storage**: IndexedDB (via idb)


### Development & Build
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "type-check": "tsc --noEmit",
    "deploy:github": "npm run build && gh-pages -d dist"
  }
}
```

## 🤝 Contributing

We welcome contributions from the developers and scientific community!

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new CVI calculation method
fix: resolve IndexedDB version conflict
docs: update API documentation
style: format code with prettier
refactor: improve geospatial processing
test: add unit tests for CVI calculations
```

### Local Development

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

### Production Build
npm run build

# Deploy to GitHub Pages
npm run deploy:github
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Citation

If you use CVIc in your research, please cite:

```bibtex
@software{cvic2025,
  title={CVIc: Coastal Vulnerability Index Compiler},
  author={Liaskos, Alexandros},
  year={2025},
  url={https://github.com/alexandrosliaskos/CVIc},
  note={EO-PERSIST Project}
}
```

## 📧 Contact

**Project Lead**: Alexandros Liaskos
**Email**: [alexliaskosga@gmail.com](mailto:alexliaskosga@gmail.com)
