# CVIc - Coastal Vulnerability Index Compiler

CVIc is a web application designed to help coastal managers, researchers, and policy makers assess shoreline vulnerability to coastal hazards such as erosion, flooding, and sea-level rise.

## Features

- User authentication and authorization
- Shoreline data management
- Coastal Vulnerability Index (CVI) calculation
- Analysis results management and export
- Modern, responsive user interface

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase Authentication
- Supabase Database
- React Router

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project
- Supabase project

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd cvic
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your Firebase and Supabase credentials.

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
cvic/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API and business logic services
│   ├── utils/         # Utility functions
│   ├── constants/     # Application constants
│   ├── types/         # TypeScript type definitions
│   ├── lib/           # Third-party library configurations
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
├── index.html         # HTML template
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── README.md          # Project documentation
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
