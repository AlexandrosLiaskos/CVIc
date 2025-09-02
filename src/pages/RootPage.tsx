// ---- File: src/pages/RootPage.tsx ----
import { Link } from 'react-router-dom';
import { ChevronRightIcon, MapIcon, ChartBarIcon, ShieldCheckIcon, ClockIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function RootPage() {
  console.log('RootPage component rendering');

  const workflowSteps = [
    {
      title: "Upload Shoreline",
      description: "Upload shoreline data or digitize on uploaded satellite imagery",
      icon: <GlobeAltIcon className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Select Index",
      description: "Select vulnerability index",
      icon: <ChartBarIcon className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Assign Values",
      description: "Assign values interactively on the map",
      icon: <MapIcon className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Export Results ",
      description: "Export results and report",
      icon: <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
    },
  ];

  const benefits = [
    {
      title: "Real-Time Processing",
      description: "Implement your own calculations",
      icon: <ClockIcon className="h-8 w-8 text-blue-600" />
    },
    {
      title: "End-to-End Workflow",
      description: "From shoreline to CVI results",
      icon: <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Free and Open Source",
      description: "Transparency and collaboration",
      icon: <ChartBarIcon className="h-8 w-8 text-blue-600" />
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Hero Section */}
        <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Coastal Vulnerability Index Compiler
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">

            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            First web application specialized for the automation of Coastal Vulnerability Assessment
            </p>
        </div>

        {/* Call to Action Section */}
        <section className="text-center mb-20">
          <Link
            to="/shoreline-selection"
            className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Start New Analysis
            <ChevronRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </section>

        {/* How It Works Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                   {step.icon}
                 </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {index + 1}. {step.title}
                    </h3>
                    <p className="text-gray-600">
                         {step.description}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why CVIc Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose CVIc?
          </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                 <div className="flex justify-center mb-4">
                   {benefit.icon}
                 </div>
                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                 <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
           </div>
        </section>
      </div>


    </div>
  );
}
