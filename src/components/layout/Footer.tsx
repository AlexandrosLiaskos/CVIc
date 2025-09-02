export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 px-6 py-3">
      <div className="max-w-6xl mx-auto text-center space-y-2">
        <p className="text-gray-600 text-sm">
          Coastal Vulnerability Index Compiler - Developed by <span className="font-medium">Alexandros Liaskos</span>
        </p>
        <p className="text-gray-500 text-xs">
          Made within the{' '}
          <a
            href="https://eo-persist.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            HORIZON EUROPE's EO-PERSIST project
          </a>
          {' • '}
          <a
            href="https://github.com/AlexandrosLiaskos/CVIc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            GitHub
          </a>
          {' • MIT Licensed • © 2025'}
        </p>
      </div>
    </footer>
  );
};
