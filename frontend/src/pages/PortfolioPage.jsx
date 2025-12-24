import React, { useState } from 'react';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioItems, videoItems } from '../data/mock';
import { Dialog, DialogContent } from '../components/ui/dialog';

const categories = ['All', 'Pre-Wedding', 'Engagement', 'Couple Shoots', 'Videos'];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

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
    <div className="bg-[#FDF8F3] pt-24">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-4">Our Work</p>
          <h1
            className="text-4xl md:text-6xl text-[#2D2D2D] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Portfolio
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of beautiful pre-wedding moments, engagement sessions,
            and cinematic love stories.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 pb-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#2D2D2D] text-white'
                    : 'bg-white text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {filteredItems.length > 0 && (
        <section className="px-6 pb-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden cursor-pointer aspect-[4/5]"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs uppercase tracking-wider text-[#D4AF37] mb-1">
                      {item.category}
                    </p>
                    <h3
                      className="text-lg"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-80">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Section */}
      {showVideos && (
        <section className="px-6 pb-24">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-3xl text-[#2D2D2D]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Cinematic Films
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videoItems.map((video) => (
                <div
                  key={video.id}
                  className="group relative overflow-hidden cursor-pointer aspect-video"
                  onClick={() => openVideoModal(video)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-6 h-6 text-[#2D2D2D] ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3
                      className="text-lg"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {video.title}
                    </h3>
                    <p className="text-sm opacity-80">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-white/20"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {filteredItems.length > 0 && (
              <>
                <img
                  src={filteredItems[currentImageIndex]?.image}
                  alt={filteredItems[currentImageIndex]?.title}
                  className="max-w-full max-h-full object-contain"
                />

                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-white/20"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-white/20"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
                  <h3
                    className="text-xl"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {filteredItems[currentImageIndex]?.title}
                  </h3>
                  <p className="text-sm opacity-70">
                    {filteredItems[currentImageIndex]?.location}
                  </p>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black border-none">
          <div className="relative aspect-video">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute -top-10 right-0 z-50 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-white/20"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            {selectedVideo && (
              <div className="w-full h-full flex items-center justify-center bg-black text-white">
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="opacity-70">Video Player Placeholder</p>
                  <p
                    className="text-xl mt-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {selectedVideo.title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioPage;
