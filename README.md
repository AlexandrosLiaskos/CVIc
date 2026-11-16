```
                                  ██████╗ ██╗   ██╗ ██╗
                                 ██╔════╝ ██║   ██║ ██║ ██████╗
                                 ██║      ██║   ██║ ██║ ██╔════╝
                                 ██║      ╚██╗ ██╔╝ ██║ ██║
                                 ╚██████╗  ╚████╔╝  ██║ ╚██████╗
                                  ╚═════╝   ╚═══╝   ╚═╝ ╚═════╝
```

# CVIc - Coastal Vulnerability Index Compiler

[![Checks](https://github.com/AlexandrosLiaskos/CVIc/actions/workflows/checks.yml/badge.svg?branch=master)](https://github.com/AlexandrosLiaskos/CVIc/actions/workflows/checks.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![DOI](https://img.shields.io/badge/DOI-10.1016%2Fj.envsoft.2025.106705-blue.svg)](https://doi.org/10.1016/j.envsoft.2025.106705)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

> The first web-based end-to-end application dedicated to coastal vulnerability assessment

## Table of Contents

- [Live Application](#live-application)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [How to cite](#how-to-cite)
- [Contact](#contact)

## Live Application

**Live Application (v0.1.0)**: [https://alexandrosliaskos.github.io/CVIc/](https://alexandrosliaskos.github.io/CVIc/)

## Installation

### Prerequisites

```bash
node >= 18.18.0
npm >= 8.0.0
```

The build tool (Vite 5), the linter (typescript-eslint 7) and the test runner (Vitest 3) do not run on
Node.js 16. The automatic checks and the deployment use the current LTS version of Node.js.

### Quick Start

```bash
# Clone the repository
git clone https://github.com/alexandrosliaskos/CVIc.git
cd CVIc

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server serves the application at <http://localhost:3000/CVIc/>.

### Build for Production

```bash
# Build the production bundle into dist/
npm run build

# Preview production build locally
npm run preview
```

## Usage

### Basic Workflow

1. **Import/Digitize Shoreline**: Upload existing vector data or digitize from satellite imagery
2. **Configure Segmentation**: Set the segment length (resolution, in metres)
3. **Select CVI Variant**: Choose between CVI and ICVI
4. **Assign Values**: Interactive assignment of vulnerability scores (1-5 scale)
5. **View Results**: Analyze results with interactive visualizations
6. **Export Data**: Download as GeoJSON or HTML report

### Supported Data Formats

| Format | Import | Export | Notes |
|--------|--------|--------|-------|
| Shapefile | Yes | No | Zipped .shp files |
| GeoTIFF | Yes | No | Satellite imagery |
| GeoJSON | No | Yes | Shoreline data |
| HTML | No | Yes | Report Export |

## Features

- **Shoreline Management**: Upload existing shoreline data or digitize new shorelines from high-resolution satellite imagery
- **Automated Segmentation**: Intelligent division of shorelines into analysis segments with customizable parameters
- **CVI Selection**: Choose from multiple Coastal Vulnerability Index variants:
  - **CVI** (Classical Coastal Vulnerability Index)
  - **ICVI** (Integrated Coastal Vulnerability Index)
- **Automated Formula Application**: Automatic CVI calculation based on selected index type with predefined formulas
- **Interactive Value Assignment**: Assign vulnerability scores to shoreline segments through an intuitive interface
- **Advanced Visualization**: View results on interactive maps with customizable symbology and statistical analysis
- **Data Export**: Export results as GeoJSON or comprehensive HTML reports
- **Real-time Processing**: Browser-based processing with no server dependencies

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC
- **Styling**: Tailwind CSS + PostCSS

### Mapping & Geospatial
- **Mapping**: Leaflet + Leaflet.draw
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
    "build:static": "vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "clean": "rm -rf dist node_modules/.vite",
    "serve": "npx http-server ./dist -o -p 8080"
  }
}
```

## Development

The checks need [Node.js](https://nodejs.org/) 18.18 or later and npm.

```bash
npm ci
npm run lint
npm run type-check
npm test
npm run build
```

`npm ci` installs the exact package versions of `package-lock.json`. `npm run lint` checks the code with
ESLint and accepts no warning. `npm run type-check` compiles the TypeScript code in strict mode without
writing files. `npm test` runs the unit tests with Vitest. `npm run build` writes the production bundle to
`dist/`. The workflow [Checks](.github/workflows/checks.yml) runs the same five commands on every push and
every pull request.

The unit tests cover the calculation code: the CVI and ICVI formulas, the classification of the index
values, the ranking tables of the parameters, and the division of a shoreline into segments. The file of
each test stands beside the file that it tests and ends in `.test.ts`. A test that is marked `it.fails`
records a known defect; its comment describes the defect.

A push to the branch `master` builds the application and publishes it on GitHub Pages through the workflow
[Deploy static content to Pages](.github/workflows/deploy.yml).

## Contributing

We welcome contributions from the developers and scientific community! [CONTRIBUTING.md](CONTRIBUTING.md)
describes how to set up the project, run the checks and propose a change, and
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) gives the code of conduct.

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

The commands are in the section [Development](#development).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## How to cite

If you use CVIc in your research, please cite the article that describes it:

> Liaskos, A., Petropoulos, G. P., Evelpidou, N., & Detsikas, S. E. (2025). CVIc: A web platform for
> automated Coastal Vulnerability Index-based assessment. *Environmental Modelling & Software*, 194, 106705.
> <https://doi.org/10.1016/j.envsoft.2025.106705>

```bibtex
@article{liaskos2025cvic,
  title={CVIc: A web platform for automated Coastal Vulnerability Index-based assessment},
  author={Liaskos, Alexandros and Petropoulos, George P. and Evelpidou, Niki and Detsikas, Spyridon E.},
  journal={Environmental Modelling \& Software},
  volume={194},
  pages={106705},
  year={2025},
  doi={10.1016/j.envsoft.2025.106705}
}
```

The file [CITATION.cff](CITATION.cff) holds the same reference in the Citation File Format, with the
article as the preferred citation. GitHub reads it for the button "Cite this repository".

To refer to the software itself:

```bibtex
@software{cvic2025,
  title={CVIc: Coastal Vulnerability Index Compiler},
  author={Liaskos, Alexandros},
  year={2025},
  url={https://github.com/alexandrosliaskos/CVIc},
  note={EO-PERSIST Project}
}
```

## Contact

**Project Lead**: Alexandros Liaskos
**Email**: [alexliaskosga@gmail.com](mailto:alexliaskosga@gmail.com)
