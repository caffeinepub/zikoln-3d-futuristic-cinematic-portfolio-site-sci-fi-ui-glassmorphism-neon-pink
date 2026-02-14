import { Heart } from 'lucide-react';

export default function FooterSection() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'portfolio-app';

  return (
    <footer className="relative py-12 px-4 border-t border-pink-400/20">
      {/* Scan Line Animation */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-[scan_3s_ease-in-out_infinite]" />

      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400 text-sm">
          © {currentYear} ZIKOLN — Built in the Future
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Built with <Heart className="inline w-3 h-3 text-pink-400 fill-pink-400" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
