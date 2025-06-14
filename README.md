```
  ______      ___    ____      
 / ____/     | |  \  / /| |     
| |       __ | | \ \/ / | |  ___
| |      / / | |  \  /  | | / __|
| |___  | |  | |   \/   | || (__ 
 \____| |_|  |_|        |_| \___|

```

**Coastal Vulnerability Index Calculator**

A professional web-based application for comprehensive coastal vulnerability assessment and analysis.

---

## 🌊 Overview

**CVIc** (Coastal Vulnerability Index Calculator) is a sophisticated, browser-based tool designed for the scientific community to calculate and analyze coastal vulnerability indices. Developed as part of the [EO-PERSIST](https://eo-persist.eu/) project, CVIc provides researchers, coastal managers, and environmental scientists with a comprehensive platform for coastal vulnerability assessment.

## ✨ Features

- **🗺️ Shoreline Management**: Upload existing shoreline data or digitize new shorelines from high-resolution satellite imagery
- **📐 Automated Segmentation**: Intelligent division of shorelines into analysis segments with customizable parameters
- **🎯 CVI Selection**: Choose from multiple Coastal Vulnerability Index variants:
  - **CVI** (Classical Coastal Vulnerability Index)
  - **RCVI** (Relative Coastal Vulnerability Index)  
  - **ICVI** (Integrated Coastal Vulnerability Index)
- **⚡ Automated Formula Application**: Automatic CVI calculation based on selected index type with predefined formulas
- **📊 Interactive Value Assignment**: Assign vulnerability scores to shoreline segments through an intuitive interface
- **📈 Advanced Visualization**: View results on interactive maps with customizable symbology and statistical analysis
- **💾 Data Export**: Export results as GeoJSON, Shapefile, or comprehensive HTML reports
- **🔄 Real-time Processing**: Browser-based processing with no server dependencies

## 🔧 Technology Stack

- **Frontend Framework**: React 18 + TypeScript + Vite
- **Mapping Libraries**: Leaflet, React-Leaflet
- **Geospatial Processing**: Turf.js, Proj4, GeoTIFF
- **Data Storage**: IndexedDB (client-side persistence)
- **Authentication**: Firebase Authentication
- **UI Components**: Material-UI, Heroicons
- **Visualization**: Custom charting components
- **File Processing**: ShpJS, DOM-to-Image

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser with IndexedDB support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alexandrosliaskos/CVIc.git
   cd CVIc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## � Scientific Workflow

### 1. Shoreline Source Selection
Choose between uploading existing shoreline vector data or creating new shorelines through satellite image digitization.

### 2. Shoreline Processing
- Upload and validate shoreline geometry
- Digitize shorelines from satellite imagery using interactive tools
- Automatic coordinate system detection and transformation

### 3. Automated Segmentation
- Configure segmentation parameters (length, spacing)
- Generate analysis segments with unique identifiers
- Quality control and manual adjustment capabilities

### 4. CVI Variant Selection
Select the appropriate Coastal Vulnerability Index variant:
- **CVI**: Traditional approach using geometric mean
- **RCVI**: Relative assessment with normalized scoring
- **ICVI**: Integrated approach incorporating additional parameters

### 5. Automated Formula Application
Based on the selected CVI variant, the application automatically applies the corresponding mathematical formulation without manual parameter weighting.

### 6. Value Assignment
- Interactive assignment of vulnerability scores (1-5 scale)
- Batch processing capabilities for large datasets
- Real-time validation and quality checks

### 7. Results Analysis
- Statistical analysis and visualization
- Export capabilities for further analysis
- Integration-ready outputs for GIS workflows

## 🧮 CVI Calculation Methods

The application implements scientifically validated formulas for each CVI variant:

### Classical CVI (Gornitz et al., 1994)
```
CVI = √(V₁ × V₂ × V₃ × V₄ × V₅ × V₆)
```

### Relative CVI (RCVI)
```
RCVI = CVI_i / CVI_max × 100
```

### Integrated CVI (ICVI)
```
ICVI = Weighted geometric mean with normalized parameters
```

Where V₁, V₂, ..., V₆ represent standardized vulnerability parameters (1-5 scale).

## 💾 Data Management

- **Client-side Storage**: All data stored locally using IndexedDB
- **Automatic Persistence**: Progress saved at each workflow step
- **Cross-session Continuity**: Resume work across browser sessions
- **Privacy-first**: No data transmitted to external servers during analysis

## 🔬 Scientific Applications

CVIc has been designed to support:
- **Coastal vulnerability assessments** for climate change adaptation
- **Risk mapping** for coastal management planning
- **Research studies** requiring standardized CVI calculations
- **Educational purposes** in coastal engineering and management courses
- **Policy support** for coastal zone management decisions

## 🌐 EO-PERSIST Project

CVIc is developed as part of the [EO-PERSIST](https://eo-persist.eu/) project, which aims to establish a cloud-based platform for managing and exploiting Earth Observation data for coastal applications.

### Related Tools (In Development)
- **SatShor**: Automated satellite-derived shoreline extraction
- **CVARs**: Coastal vulnerability parameter sourcing from EO data
- **CompCVA**: Computational framework for coastal vulnerability assessment

## 🤝 Contributing

We welcome contributions from the scientific community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code style and standards
- Scientific validation requirements
- Documentation standards
- Testing procedures
- Peer review process

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/scientific-enhancement`)
3. Commit your changes (`git commit -m 'Add new CVI variant'`)
4. Push to the branch (`git push origin feature/scientific-enhancement`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Project Lead**: Alexandros Liaskos  
**Email**: [alexliaskosga@gmail.com](mailto:alexliaskosga@gmail.com)  
**Project Website**: [https://eo-persist.eu/](https://eo-persist.eu/)

## 📚 Citation

If you use CVIc in your research, please cite:

```bibtex
@software{cvic2025,
  title={CVIc: Coastal Vulnerability Index Calculator},
  author={Liaskos, Alexandros},
  year={2025},
  url={https://github.com/alexandrosliaskos/CVIc},
  note={EO-PERSIST Project}
}
```

## 🙏 Acknowledgments

- EO-PERSIST project consortium
- European Space Agency (ESA) for satellite data access
- Open-source geospatial community
- Scientific reviewers and beta testers

---

**Made with 🌊 for the coastal science community**
