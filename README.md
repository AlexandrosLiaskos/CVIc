# CVIc: Coastal Vulnerability Index Compiler

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Web Platform for Automating Coastal Vulnerability Index Calculation**

CVIc is a web-based tool designed to streamline the process of calculating a Coastal Vulnerability Index (CVI). It guides users through uploading shoreline data, segmenting it, assigning vulnerability parameters and values, selecting a calculation formula, and visualizing the results on an interactive map.

---

**Live Demo:** [https://cvic-456409.web.app/](CVIc)

*(Note: Firebase Authentication is required for full access. You can sign in with a Google account.)*

---

## Screenshots

![image](https://github.com/user-attachments/assets/ba14f94d-b0cb-4e07-bef7-0d0839ea1ec6)

![image](https://github.com/user-attachments/assets/ffda84d4-ae0a-4908-ad90-12e564a73147)

## Key Features & Workflow

The application follows a structured workflow:

1.  **Upload Shoreline:** Upload shoreline data as a zipped Shapefile (`.zip` containing `.shp`, `.shx`, `.dbf`).
2.  **Segment Shoreline:** Divide the uploaded shoreline into smaller segments based on a user-defined resolution (e.g., 100 meters).
3.  **Review Segments:** Examine the generated segments in a table and on an interactive map.
4.  **Select Parameters:** Choose the relevant vulnerability parameters (e.g., Geomorphology, Coastal Slope, Sea Level Change) and assign weights that sum to 100%.
5.  **Assign Values:** Assign specific values and corresponding vulnerability scores (1-5) to shoreline segments using an interactive map (click, draw polygon) and table interface.
6.  **Calculate CVI:** Select a CVI calculation formula (e.g., Geometric Mean, Arithmetic Mean) and compute the index for all segments with complete data.
7.  **View Results:** Visualize the calculated CVI scores on the map, colored by vulnerability category, view summary statistics, and export the final results as a GeoJSON file.

## Technology Stack

CVIc is built using modern web technologies:

*   **Frontend Framework:** React with TypeScript
*   **Build Tool:** Vite
*   **Routing:** React Router
*   **Mapping:**
    *   Leaflet (Core library)
    *   React Leaflet (React integration)
    *   Leaflet Draw (Drawing/selection tools)
*   **Geospatial Analysis:** Turf.js
*   **Styling:** TailwindCSS
*   **Client-Side Storage:** IndexedDB (via `idb` library)
*   **Shapefile Processing:** shpjs
*   **Authentication:** Firebase Authentication (Google Sign-In)
*   **Deployment:** GitHub Pages / Firebase Hosting

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   Node.js (LTS version recommended, e.g., v18 or v20)
*   npm, yarn, or pnpm package manager

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AlexandrosLiaskos/CVIc.git
    cd CVIc
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

### Environment Variables

The application uses Firebase for authentication. You need to set up a Firebase project and configure environment variables.

1.  Create a `.env` file in the root of the project.
2.  Add the following variables, replacing the placeholder values with your actual Firebase project credentials:

    ```dotenv
    # .env

    # Firebase Configuration (Get these from your Firebase project settings)
    VITE_FIREBASE_API_KEY=YOUR_API_KEY
    VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
    VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
    VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
    VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
    VITE_FIREBASE_APP_ID=YOUR_APP_ID
    ```

    **Important:**
    *   Prefix environment variables with `VITE_` to expose them to the client-side bundle handled by Vite.
    *   The `.env` file is included in `.gitignore` and should **never** be committed to version control.

### Running Locally

Start the development server:

```bash
npm run dev
# or
# yarn dev
# or
# pnpm dev
```

This will typically start the application on `http://localhost:3000`.

### Building for Production

Create an optimized production build:

```bash
npm run build
# or
# yarn build
# or
# pnpm build
```

The output files will be generated in the `dist` directory.

### Type Checking

Run the TypeScript compiler to check for type errors without emitting files:

```bash
npm run type-check
# or
# yarn type-check
# or
# pnpm type-check
```

## Deployment

The project is configured for deployment using two methods:

1.  **GitHub Pages:**
    *   The `deploy` script in `package.json` uses `gh-pages` to build and deploy the `dist` folder to the `gh-pages` branch.
    *   Run: `npm run deploy`

2.  **Firebase Hosting:**
    *   The `firebase.json` file configures Firebase Hosting.
    *   Requires Firebase CLI (`npm install -g firebase-tools`).
    *   Login: `firebase login`
    *   Deploy: `firebase deploy --only hosting` (after running `npm run build`)

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

*   Inspired by traditional CVI methodologies.
*   Built with the help of many excellent open-source libraries.
