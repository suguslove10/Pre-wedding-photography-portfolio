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
    <div className="bg-[#050505] text-white pt-32 pb-24 min-h-screen">
      {/* Editorial Header */}
      <section className="py-20 px-6 border-b border-white/5">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="flex justify-center mb-6">
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059]">The Gallery</span>
          </div>
          <h1 className="heading-primary mb-8 font-serif uppercase tracking-widest">
            Visual <span className="italic gold-gradient">Poetry.</span>
          </h1>
          <p className="text-secondary text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed opacity-60">
            A curated selection of our most poignant stories. Each frame is a testament
            to the silent language of love and connection.
          </p>
        </div>
      </section>

      {/* Filter Menu - Minimalist */}
      <section className="sticky top-[80px] z-40 bg-[#050505]/80 backdrop-blur-md py-6 px-6">
        <div className="container mx-auto overflow-x-auto">
          <div className="flex justify-center items-center gap-2 md:gap-8 min-w-max">
            <Filter className="w-3 h-3 text-[#C5A059] mr-2" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-[10px] uppercase tracking-[0.3em] transition-all duration-500 hover:text-[#C5A059] relative py-2 ${activeCategory === category
                    ? 'text-[#C5A059]'
                    : 'text-white/40'
                  }`}
              >
                {category}
                {activeCategory === category && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A059]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid - Masonry-ish feel */}
      {filteredItems.length > 0 && (
        <section className="px-6 py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              {filteredItems.map((item, index) => {
                // High-end alternating grid logic
                const colSpan = (index % 5 === 0) ? 'md:col-span-12' : (index % 5 === 1 || index % 5 === 4) ? 'md:col-span-7' : 'md:col-span-5';
                const aspectRatio = (index % 5 === 0) ? 'aspect-[21/9]' : (index % 5 === 1 || index % 5 === 4) ? 'aspect-[4/3]' : 'aspect-[4/5]';

                return (
                  <div
                    key={item.id}
                    className={`${colSpan} group relative overflow-hidden cursor-none text-reveal glass-card ${aspectRatio}`}
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

                    <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] mb-4">{item.category}</span>
                      <h3 className="text-3xl font-serif mb-2 italic">{item.title}</h3>
                      <p className="text-xs uppercase tracking-widest text-white/60 font-light">{item.location}</p>
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
        <section className="px-6 py-32 bg-[#080808] border-t border-white/5">
          <div className="container mx-auto">
            <div className="flex items-center gap-6 mb-16">
              <div className="h-[1px] flex-1 bg-white/10" />
              <h2 className="heading-secondary italic">Cinematic Art</h2>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all duration-500">
                      <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center transition-all bg-black/40 backdrop-blur-sm group-hover:scale-110 group-hover:border-[#C5A059]">
                        <Play className="w-5 h-5 text-white ml-1 fill-white" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-serif mb-2 tracking-wide group-hover:text-[#C5A059] transition-colors">{video.title}</h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-light">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox / Gallery View */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[100vw] w-full h-[100vh] p-0 bg-black/95 border-none shadow-none rounded-none focus:outline-none">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-8 right-8 z-[110] text-white/50 hover:text-white transition-colors"
            >
              <X className="w-8 h-8 font-light" />
            </button>

            {filteredItems.length > 0 && (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-20">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={filteredItems[currentImageIndex]?.image}
                    alt={filteredItems[currentImageIndex]?.title}
                    className="max-w-full max-h-[80vh] object-contain shadow-2xl"
                  />

                  <button
                    onClick={prevImage}
                    className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/20 hover:text-[#C5A059] transition-all p-4"
                  >
                    <ChevronLeft className="w-10 h-10" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/20 hover:text-[#C5A059] transition-all p-4"
                  >
                    <ChevronRight className="w-10 h-10" />
                  </button>
                </div>

                <div className="mt-8 text-center animate-fadeInUp">
                  <h3 className="text-2xl font-serif mb-2 italic">
                    {filteredItems[currentImageIndex]?.title}
                  </h3>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059]">{filteredItems[currentImageIndex]?.category}</span>
                    <span className="w-4 h-[1px] bg-white/20" />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">{filteredItems[currentImageIndex]?.location}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-6xl w-full p-0 bg-black/90 border border-white/5 backdrop-blur-xl aspect-video rounded-none">
          <div className="relative w-full h-full">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute -top-12 right-0 text-white/50 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            {selectedVideo && (
              <div className="w-full h-full bg-[#050505] flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#C5A059]/10 flex items-center justify-center mb-8 border border-[#C5A059]/30">
                  <Play className="w-8 h-8 text-[#C5A059] fill-[#C5A059]" />
                </div>
                <h2 className="text-3xl font-serif mb-4 italic tracking-wider">{selectedVideo.title}</h2>
                <p className="text-xs uppercase tracking-[0.5em] text-muted">Feature Film Preview Incoming</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioPage;
