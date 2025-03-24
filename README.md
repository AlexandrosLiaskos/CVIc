# CVIC - Coastal Vulnerability Index Calculator

A web application for calculating coastal vulnerability indices based on various parameters and shoreline segments.

## Live Demo

Visit the live application at [https://alexlukens82991.github.io/cvic/](https://alexlukens82991.github.io/cvic/)

## Development

1. Clone the repository:
```bash
git clone https://github.com/alexlukens82991/cvic.git
cd cvic
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

To deploy manually:

1. Build the application:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

## Features

- Interactive map for shoreline segmentation
- Parameter selection and weighting
- Vulnerability index calculation
- Data persistence using IndexedDB
- Responsive design for desktop and mobile use

## Technology Stack

- React with TypeScript
- Vite for build tooling
- Leaflet for mapping
- TailwindCSS for styling
- IndexedDB for data storage
- GitHub Pages for hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[MIT License](LICENSE)
