import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Camera, Film } from 'lucide-react';
import { heroSlides, portfolioItems, testimonials } from '../data/mock';
import TestimonialsSection from '../components/sections/TestimonialsSection';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const featuredPortfolio = portfolioItems.slice(0, 4);

  return (
    <div className="bg-[#FDF8F3]">
      {/* Hero Section with Slideshow */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 animate-fadeIn opacity-90">
            Pre-Wedding Photography & Cinematography
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl mb-6 max-w-4xl leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl opacity-90">
            {heroSlides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/portfolio"
              className="px-8 py-3.5 border-2 border-white text-white font-medium tracking-wider uppercase text-sm transition-all duration-300 hover:bg-white hover:text-[#2D2D2D]"
            >
              View Portfolio
            </Link>
            <Link
              to="/booking"
              className="px-8 py-3.5 bg-[#D4AF37] text-white font-medium tracking-wider uppercase text-sm transition-all duration-300 hover:bg-[#B8962E]"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white/30"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white/30"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-4">Welcome</p>
          <h2
            className="text-3xl md:text-5xl text-[#2D2D2D] mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Creating Timeless Love Stories
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Every love story is unique, and we believe your pre-wedding memories should be too.
            With an artistic eye and a passion for storytelling, we capture the genuine emotions,
            tender moments, and beautiful connections that make your relationship special.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <Camera className="w-6 h-6 text-[#D4AF37]" />
              <span className="text-[#2D2D2D] font-medium">Photography</span>
            </div>
            <div className="flex items-center gap-3">
              <Film className="w-6 h-6 text-[#D4AF37]" />
              <span className="text-[#2D2D2D] font-medium">Cinematography</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Portfolio Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-4">Our Work</p>
            <h2
              className="text-3xl md:text-5xl text-[#2D2D2D]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Featured Portfolio
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPortfolio.map((item, index) => (
              <Link
                key={item.id}
                to="/portfolio"
                className={`group relative overflow-hidden ${
                  index === 0 ? 'md:row-span-2' : ''
                }`}
                style={{ aspectRatio: index === 0 ? '3/4' : '4/3' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs uppercase tracking-wider text-[#D4AF37] mb-2">
                    {item.category}
                  </p>
                  <h3
                    className="text-xl md:text-2xl"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-80 mt-1">{item.location}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-block px-8 py-3.5 border-2 border-[#2D2D2D] text-[#2D2D2D] font-medium tracking-wider uppercase text-sm transition-all duration-300 hover:bg-[#2D2D2D] hover:text-white"
            >
              View All Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 px-6 bg-[#F8E8E8]/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-4">Our Services</p>
            <h2
              className="text-3xl md:text-5xl text-[#2D2D2D] mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              What We Offer
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From intimate engagement sessions to full-day pre-wedding coverage,
              we have packages designed to capture every special moment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Pre-Wedding Shoots',
                desc: 'Romantic sessions at stunning locations of your choice',
                icon: '01',
              },
              {
                title: 'Cinematography',
                desc: 'Cinematic films that tell your unique love story',
                icon: '02',
              },
              {
                title: 'Photo Albums',
                desc: 'Beautifully crafted albums to treasure forever',
                icon: '03',
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white p-8 text-center group hover:shadow-xl transition-shadow duration-300"
              >
                <span
                  className="text-5xl font-light text-[#D4AF37]/30 mb-4 block"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {service.icon}
                </span>
                <h3
                  className="text-xl text-[#2D2D2D] mb-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-block px-8 py-3.5 bg-[#2D2D2D] text-white font-medium tracking-wider uppercase text-sm transition-all duration-300 hover:bg-[#1A1A1A]"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Call to Action */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1378723/pexels-photo-1378723.jpeg"
            alt="Couple at sunset"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h2
            className="text-3xl md:text-5xl mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
            Let's discuss your vision and create pre-wedding memories that you'll cherish forever.
          </p>
          <Link
            to="/booking"
            className="inline-block px-10 py-4 bg-[#D4AF37] text-white font-medium tracking-wider uppercase text-sm transition-all duration-300 hover:bg-[#B8962E]"
          >
            Book Your Session
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
