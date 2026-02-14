import { useState } from 'react';
import { useGetProjectsByCategory } from '../../hooks/useQueries';
import { placeholderProjects } from '../../content/placeholderContent';
import GlassPanel from '../visual/GlassPanel';
import PortfolioItemModal from '../portfolio/PortfolioItemModal';
import type { Project } from '../../backend';

const categories = ['All', 'Social Media', 'Posters', 'Thumbnails', 'Logos', 'Print', 'Packaging'];

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categoryQuery = selectedCategory === 'All' ? null : selectedCategory;
  const { data: backendProjects, isLoading } = useGetProjectsByCategory(categoryQuery);

  const projects = backendProjects && backendProjects.length > 0 ? backendProjects : placeholderProjects;

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => {
          // Category is a string enum, so we can compare directly
          const categoryValue = p.category as string;
          return categoryValue.toLowerCase() === selectedCategory.toLowerCase().replace(/\s+/g, '');
        });

  return (
    <section id="portfolio" className="py-32 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Portfolio
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,255,255,0.5)]'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {isLoading ? (
          <div className="text-center text-cyan-400 text-xl">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={Number(project.id)}
                className="group relative cursor-pointer"
                onClick={() => setSelectedProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute inset-0 border-2 border-cyan-400/0 group-hover:border-cyan-400/100 rounded-2xl transition-all duration-300 shadow-[0_0_0_rgba(0,255,255,0)] group-hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProject && (
        <PortfolioItemModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
