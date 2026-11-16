import { useEffect, useState } from 'react';

const VISIT_ENDPOINT = 'https://evelpidou.nkua.cloud/api/visits/cvic';
const VISIT_STORAGE_KEY = 'cvic-visit-counted-v1';

/**
 * The total of recorded page visits, or null until the counter answers.
 * A browser session is counted once: its first request records the visit (POST),
 * later requests only read the total (GET). The counter uses no cookies and
 * stores only the total; when it cannot be reached the placeholder stays.
 */
const useVisitCount = (): number | null => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    let counted = false;
    try {
      counted = window.sessionStorage.getItem(VISIT_STORAGE_KEY) === 'yes';
    } catch {
      counted = false;
    }

    fetch(VISIT_ENDPOINT, {
      method: counted ? 'GET' : 'POST',
      cache: 'no-store',
      credentials: 'omit',
      headers: { Accept: 'application/json' },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((payload: { count?: unknown }) => {
        const total = Number(payload.count);
        if (!Number.isFinite(total) || total < 0) throw new Error('Invalid visit count');
        if (!counted) {
          try {
            window.sessionStorage.setItem(VISIT_STORAGE_KEY, 'yes');
          } catch {
            // The counter still works when browser storage is unavailable.
          }
        }
        if (active) setCount(total);
      })
      .catch(() => {
        // The placeholder stays when the counter cannot be reached.
      });

    return () => {
      active = false;
    };
  }, []);

  return count;
};

export const Footer = () => {
  const visitCount = useVisitCount();

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
        <p
          className="text-gray-500 text-xs"
          role="status"
          aria-live="polite"
          aria-describedby="cvic-visit-privacy"
        >
          Recorded page visits{' '}
          <span className="font-medium text-gray-600 tabular-nums">
            {visitCount === null ? '—' : visitCount.toLocaleString('en')}
          </span>
        </p>
        <span id="cvic-visit-privacy" className="sr-only">
          The counter does not use cookies or collect information that can identify individual visitors. Only the
          aggregate visit count is stored.
        </span>
      </div>
    </footer>
  );
};
