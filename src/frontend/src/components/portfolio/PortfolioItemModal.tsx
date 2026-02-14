import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Project } from '../../backend';

interface PortfolioItemModalProps {
  project: Project;
  onClose: () => void;
}

export default function PortfolioItemModal({ project, onClose }: PortfolioItemModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Category is a string enum
  const categoryDisplay = (project.category as string).replace(/([A-Z])/g, ' $1').trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-gradient-to-br from-gray-900/95 to-black/95 rounded-3xl border border-cyan-400/30 shadow-[0_0_60px_rgba(0,255,255,0.3)] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 border border-cyan-400/50 text-cyan-400 hover:text-cyan-300 transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="mb-6">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto max-h-[60vh] object-contain rounded-xl"
            />
          </div>

          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {project.title}
          </h2>

          <p className="text-gray-300 text-lg mb-6 leading-relaxed">{project.description}</p>

          <div className="flex items-center gap-4">
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-medium">
              {categoryDisplay}
            </span>
            {project.isFeatured && (
              <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-sm font-medium">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
