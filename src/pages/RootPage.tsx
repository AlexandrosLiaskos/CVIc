// ---- File: src/pages/RootPage.tsx ----
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ChevronRightIcon, CubeTransparentIcon, CommandLineIcon, MapIcon, CircleStackIcon, FingerPrintIcon, PaintBrushIcon, BeakerIcon, CpuChipIcon } from '@heroicons/react/24/outline'; // Added more icons

export default function RootPage() {
  const { user, loading } = useAuth();
  const workflowSteps = [
    { text: "Upload shoreline Shapefile.", icon: <CpuChipIcon className="h-6 w-6 text-primary-600" /> },
    { text: "Segment shoreline by specified resolution.", icon: <CubeTransparentIcon className="h-6 w-6 text-primary-600" /> },
    { text: "Select vulnerability parameters & assign weights.", icon: <BeakerIcon className="h-6 w-6 text-primary-600" /> },
    { text: "Assign values to segments via interactive map & table.", icon: <MapIcon className="h-6 w-6 text-primary-600" /> },
    { text: "Select CVI calculation formula.", icon: <CommandLineIcon className="h-6 w-6 text-primary-600" /> },
    { text: "Visualize results & export as GeoJSON.", icon: <CircleStackIcon className="h-6 w-6 text-primary-600" /> },
  ];

  const techStack = [
    { name: "React", purpose: "UI Framework", icon: <CubeTransparentIcon className="h-4 w-4 text-cyan-700" /> },
    { name: "TypeScript", purpose: "Language / Type Safety", icon: <CommandLineIcon className="h-4 w-4 text-blue-700" /> },
    { name: "Vite", purpose: "Build Tool / Dev Server", icon: <CpuChipIcon className="h-4 w-4 text-purple-700" /> },
    { name: "React Router", purpose: "Client-Side Routing", icon: <MapIcon className="h-4 w-4 text-orange-700" /> },
    { name: "Leaflet", purpose: "Interactive Maps Core", icon: <MapIcon className="h-4 w-4 text-green-700" /> },
    { name: "React Leaflet", purpose: "React Integration for Leaflet", icon: <MapIcon className="h-4 w-4 text-green-600" /> },
    { name: "Leaflet Draw", purpose: "Map Drawing/Selection Tools", icon: <PaintBrushIcon className="h-4 w-4 text-green-800" /> },
    { name: "Turf.js", purpose: "Geospatial Analysis", icon: <BeakerIcon className="h-4 w-4 text-lime-700" /> },
    { name: "TailwindCSS", purpose: "Utility-First CSS Styling", icon: <PaintBrushIcon className="h-4 w-4 text-sky-700" /> },
    { name: "IndexedDB (idb)", purpose: "Client-Side Data Storage", icon: <CircleStackIcon className="h-4 w-4 text-gray-700" /> },
    { name: "shpjs", purpose: "Shapefile Parsing", icon: <CpuChipIcon className="h-4 w-4 text-red-700" /> },
    { name: "Firebase Auth", purpose: "User Authentication", icon: <FingerPrintIcon className="h-4 w-4 text-yellow-700" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Headline */}
        <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-900 tracking-tight">
            CVIc: Coastal Vulnerability Index Compiler
            </h1>
            <p className="mt-3 text-lg text-gray-600">
            Web Platform for Automating Coastal Vulnerability Index Calculation
            </p>
        </div>

        {/* Call to Action Section */}
        {/* Added mb-16 here for spacing before the next section */}
        <section className="text-center mt-10 mb-16">
          {user ? (
            <Link
              to="/shoreline"
              className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-6 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Start New Analysis
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-6 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Sign In to Begin
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </Link>
          )}
        </section>

        {/* Workflow Section - Updated Styling */}
        {/* This section already has mb-16, so the space below it is handled */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center"> {/* Increased bottom margin */}
            Workflow Overview
          </h2>
          {/* Use a grid layout for compactness on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed gap */}
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-200 transition duration-200 ease-in-out"> {/* Added hover effect */}
                {/* Icon container */}
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center ring-2 ring-primary-200"> {/* Adjusted size/styling */}
                   {step.icon}
                 </div>
                {/* Text content */}
                <div className="flex-1 pt-1"> {/* Added container div for potential future additions */}
                    <p className="text-gray-700 font-medium"> {/* Slightly bolder text */}
                        <span className="font-bold text-primary-700 mr-1">{index + 1}.</span> {/* Added step number */}
                         {step.text}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Technology Stack
          </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                 <div className="flex-shrink-0 p-1.5 bg-gray-100 rounded-md">
                   {tech.icon}
                 </div>
                 <div>
                   <p className="text-sm font-semibold text-gray-900">{tech.name}</p>
                   <p className="text-xs text-gray-500">{tech.purpose}</p>
                 </div>
              </div>
            ))}
           </div>
        </section>
      </div>
    </div>
  );
}