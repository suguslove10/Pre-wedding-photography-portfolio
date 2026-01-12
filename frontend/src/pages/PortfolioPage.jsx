import React, { useState } from 'react';
import { X, Play, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { portfolioItems, videoItems } from '../data/mock';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { useReveal } from '../hooks/useReveal';
import '../styles/theme.css';

const categories = ['All', 'Pre-Wedding', 'Engagement', 'Couple Shoots', 'Videos'];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  useReveal();

  const filteredItems =
    activeCategory === 'All'
      ? portfolioItems
      : activeCategory === 'Videos'
        ? []
        : portfolioItems.filter((item) => item.category === activeCategory);

  const showVideos = activeCategory === 'All' || activeCategory === 'Videos';

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setVideoModalOpen(true);
  };

  return (
    <div className="bg-[#050505] text-[#FFFFFF] pt-32 pb-24 min-h-screen">
      {/* Editorial Header */}
      <section className="py-24 px-6 border-b border-white/10">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="flex justify-center mb-8">
            <span className="text-xs uppercase tracking-[0.5em] text-[#D4AF37] font-bold">The Gallery</span>
          </div>
          <h1 className="heading-primary mb-10 font-serif uppercase tracking-widest text-white">
            Visual <span className="italic gold-gradient">Poetry.</span>
          </h1>
          <p className="text-[#F2F2F2] text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            A curated selection of our most poignant stories. Each frame is a testament
            to the silent language of love and connection. Captured with precision and artistry.
          </p>
        </div>
      </section>

      {/* Filter Menu - Optimized for Readability */}
      <section className="sticky top-[80px] z-40 bg-[#050505]/95 backdrop-blur-xl py-8 px-6 border-b border-white/5">
        <div className="container mx-auto overflow-x-auto">
          <div className="flex justify-center items-center gap-4 md:gap-12 min-w-max">
            <Filter className="w-4 h-4 text-[#D4AF37] mr-2" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-xs uppercase tracking-[0.3em] font-semibold transition-all duration-500 relative py-3 px-2 ${activeCategory === category
                    ? 'text-[#D4AF37]'
                    : 'text-[#FFFFFF] opacity-60 hover:opacity-100'
                  }`}
              >
                {category}
                {activeCategory === category && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      {filteredItems.length > 0 && (
        <section className="px-6 py-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {filteredItems.map((item, index) => {
                const colSpan = (index % 5 === 0) ? 'md:col-span-12' : (index % 5 === 1 || index % 5 === 4) ? 'md:col-span-7' : 'md:col-span-5';
                const aspectRatio = (index % 5 === 0) ? 'aspect-[21/9]' : (index % 5 === 1 || index % 5 === 4) ? 'aspect-[4/3]' : 'aspect-[4/5]';

                return (
                  <div
                    key={item.id}
                    className={`${colSpan} group relative overflow-hidden cursor-pointer text-reveal glass-card ${aspectRatio}`}
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                    <div className="absolute inset-0 p-12 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-4 font-bold">{item.category}</span>
                      <h3 className="text-4xl font-serif mb-3 italic text-white">{item.title}</h3>
                      <p className="text-sm uppercase tracking-widest text-[#FFFFFF] font-medium">{item.location}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Cinematic Film Section */}
      {showVideos && videoItems.length > 0 && (
        <section className="px-6 py-32 bg-[#080808] border-t border-white/10">
          <div className="container mx-auto">
            <div className="flex items-center gap-8 mb-20">
              <div className="h-[1px] flex-1 bg-white/10" />
              <h2 className="heading-secondary italic text-white uppercase tracking-widest">Cinematic Art</h2>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {videoItems.map((video) => (
                <div
                  key={video.id}
                  className="group relative overflow-hidden cursor-pointer"
                  onClick={() => openVideoModal(video)}
                >
                  <div className="aspect-video overflow-hidden relative glass-card">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/30 transition-all duration-500">
                      <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center transition-all bg-black/60 backdrop-blur-sm group-hover:scale-110 group-hover:border-[#D4AF37]">
                        <Play className="w-6 h-6 text-white ml-1 fill-white" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-2xl font-serif mb-3 tracking-wide text-white group-hover:text-[#D4AF37] transition-colors">{video.title}</h3>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#D1D1D1] font-medium">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox / Gallery View */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[100vw] w-full h-[100vh] p-0 bg-black/98 border-none shadow-none rounded-none focus:outline-none">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-10 right-10 z-[110] text-white hover:text-[#D4AF37] transition-colors"
            >
              <X className="w-10 h-10 font-bold" />
            </button>

            {filteredItems.length > 0 && (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-20">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={filteredItems[currentImageIndex]?.image}
                    alt={filteredItems[currentImageIndex]?.title}
                    className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                  />

                  <button
                    onClick={prevImage}
                    className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#D4AF37] transition-all p-4 bg-black/20 rounded-full"
                  >
                    <ChevronLeft className="w-12 h-12" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#D4AF37] transition-all p-4 bg-black/20 rounded-full"
                  >
                    <ChevronRight className="w-12 h-12" />
                  </button>
                </div>

                <div className="mt-10 text-center">
                  <h3 className="text-3xl font-serif mb-4 italic text-white uppercase tracking-wider">
                    {filteredItems[currentImageIndex]?.title}
                  </h3>
                  <div className="flex items-center justify-center gap-6">
                    <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-bold">{filteredItems[currentImageIndex]?.category}</span>
                    <span className="w-8 h-[1px] bg-white/40" />
                    <span className="text-xs uppercase tracking-[0.4em] text-white/90 font-medium">{filteredItems[currentImageIndex]?.location}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-6xl w-full p-0 bg-black/95 border border-white/10 backdrop-blur-2xl aspect-video rounded-none shadow-2xl">
          <div className="relative w-full h-full">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute -top-16 right-0 text-white hover:text-[#D4AF37]"
            >
              <X className="w-8 h-8 font-bold" />
            </button>
            {selectedVideo && (
              <div className="w-full h-full bg-[#050505] flex flex-col items-center justify-center p-12">
                <div className="w-24 h-24 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-10 border border-[#D4AF37]/40">
                  <Play className="w-10 h-10 text-[#D4AF37] fill-[#D4AF37]" />
                </div>
                <h2 className="text-4xl font-serif mb-6 italic tracking-widest text-white">{selectedVideo.title}</h2>
                <p className="text-sm uppercase tracking-[0.6em] text-[#D1D1D1] font-medium">Feature Film Preview Incoming</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioPage;
