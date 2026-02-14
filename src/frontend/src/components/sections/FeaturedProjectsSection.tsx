import { useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useGetFeaturedSliderItems } from '../../hooks/useQueries';
import { placeholderFeaturedItems } from '../../content/placeholderContent';

export default function FeaturedProjectsSection() {
  const { data: backendFeatured } = useGetFeaturedSliderItems();
  const featured = backendFeatured && backendFeatured.length > 0 ? backendFeatured : placeholderFeaturedItems;

  return (
    <section className="py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        <Carousel
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {featured.map((item, index) => (
              <CarouselItem key={Number(item.id)} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="group relative">
                  <div className="relative overflow-hidden rounded-3xl aspect-[16/10] bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 shadow-[0_0_40px_rgba(0,255,255,0.2)] group-hover:shadow-[0_0_60px_rgba(0,255,255,0.4)] transition-all duration-500">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/20" />
          <CarouselNext className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/20" />
        </Carousel>
      </div>
    </section>
  );
}
