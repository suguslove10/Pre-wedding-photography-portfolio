import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Film, ArrowRight, Play, Heart } from 'lucide-react';
import { heroSlides, portfolioItems, testimonials } from '../data/mock';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import { useReveal } from '../hooks/useReveal';
import '../styles/theme.css';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useReveal();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const featuredPortfolio = portfolioItems.slice(0, 5);

  return (
    <div className="bg-[#050505] text-white">
      {/* Cinematic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-[10000ms] ease-linear"
              style={{ transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)' }}
            />
          </div>
        ))}

        <div className="relative z-20 text-center px-6 max-w-5xl">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-[1px] bg-gold-gradient self-center mr-4" />
            <span className="text-xs uppercase tracking-[0.5em] text-[#C5A059] font-light">
              Fine Art Photography
            </span>
            <div className="w-12 h-[1px] bg-gold-gradient self-center ml-4" />
          </div>

          <h1 className="heading-primary mb-8 tracking-tighter">
            Where <span className="italic font-serif gold-gradient">Love</span> <br />
            Meets <span className="font-serif">Artistry.</span>
          </h1>

          <p className="text-secondary text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            {heroSlides[currentSlide].subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/booking" className="btn-gold-solid group">
              Start Your Story <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/portfolio" className="btn-luxury">
              Explore Gallery
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-40">
          <span className="text-[10px] uppercase tracking-[0.3em] mb-4">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Philosophy Section - Minimalist & Elegant */}
      <section className="section-luxury px-6 relative overflow-hidden">
        <div className="absolute top-0 right-[-10%] opacity-5 pointer-events-none">
          <Heart className="w-96 h-96 text-[#C5A059]" />
        </div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-img-container aspect-[4/5] relative">
            <img
              src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg"
              alt="Artistic couple"
              className="reveal-img w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 border border-[#C5A059]/30 translate-x-4 translate-y-4 -z-10" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#C5A059] mb-6 font-medium">Philosophy</p>
            <h2 className="heading-secondary mb-8 text-white leading-tight">
              Capturing the <span className="italic">soul</span> <br />
              rather than just the <span className="gold-gradient">scene.</span>
            </h2>
            <p className="text-secondary text-lg font-light leading-loose mb-10">
              Our approach is contemporary yet timeless. We believe that pre-wedding photography is an immersive experience - a journey of celebrating your connection through cinematic lens work and artistic composition.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
              <div>
                <Camera className="text-[#C5A059] mb-4 w-5 h-5" />
                <h4 className="text-sm uppercase tracking-widest mb-2 font-medium">Bespoke Capture</h4>
                <p className="text-muted text-sm font-light">Tailored sessions that reflect your unique personality.</p>
              </div>
              <div>
                <Film className="text-[#C5A059] mb-4 w-5 h-5" />
                <h4 className="text-sm uppercase tracking-widest mb-2 font-medium">Cinematography</h4>
                <p className="text-muted text-sm font-light">Short luxury films curated with cinematic precision.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works - Editorial Grid */}
      <section className="section-luxury bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.4em] text-[#C5A059] mb-4">The Portfolio</p>
              <h2 className="heading-secondary">Latest Stories</h2>
            </div>
            <Link to="/portfolio" className="group flex items-center text-xs uppercase tracking-[0.4em] text-secondary hover:text-white transition-colors">
              View Collection <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Feature Large */}
            <div className="md:col-span-12 group relative overflow-hidden aspect-[16/9] text-reveal">
              <img src={featuredPortfolio[0].image} alt="" className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                <p className="text-[#C5A059] text-xs uppercase tracking-[0.3em] mb-4">Featured Story</p>
                <h3 className="text-4xl font-serif mb-2">{featuredPortfolio[0].title}</h3>
                <p className="text-secondary opacity-60 font-light">{featuredPortfolio[0].location}</p>
              </div>
            </div>

            {/* Secondary Grid */}
            <div className="md:col-span-7 group relative overflow-hidden aspect-[4/3] text-reveal">
              <img src={featuredPortfolio[1].image} alt="" className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-2xl font-serif mb-2">{featuredPortfolio[1].title}</h4>
                  <div className="w-8 h-[1px] bg-[#C5A059] mx-auto" />
                </div>
              </div>
            </div>

            <div className="md:col-span-5 group relative overflow-hidden aspect-[4/5] text-reveal">
              <img src={featuredPortfolio[2].image} alt="" className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center p-6">
                  <h3 className="text-2xl font-serif mb-2">{featuredPortfolio[2].title}</h3>
                  <p className="text-xs uppercase tracking-widest text-[#C5A059]">{featuredPortfolio[2].category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 px-6 bg-accent border-y border-white/5">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-10 card-glass text-reveal">
            <span className="text-6xl font-serif text-[#C5A059]/20 font-light mb-8 block italic">01.</span>
            <h3 className="text-xl font-serif mb-4">Discovery</h3>
            <p className="text-secondary font-light text-sm opacity-70">We meet to understand your vision, style, and the essence of your love story.</p>
          </div>
          <div className="p-10 card-glass text-reveal">
            <span className="text-6xl font-serif text-[#C5A059]/20 font-light mb-8 block italic">02.</span>
            <h3 className="text-xl font-serif mb-4">The Session</h3>
            <p className="text-secondary font-light text-sm opacity-70">A relaxed, curated day where we guide you naturally to capture authentic moments.</p>
          </div>
          <div className="p-10 card-glass text-reveal">
            <span className="text-6xl font-serif text-[#C5A059]/20 font-light mb-8 block italic">03.</span>
            <h3 className="text-xl font-serif mb-4">Curation</h3>
            <p className="text-secondary font-light text-sm opacity-70">Meticulous post-production to ensure every image is a fine art masterpiece.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Call to Action - Dramatic Finale */}
      <section className="relative py-48 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1378723/pexels-photo-1378723.jpeg"
            alt="Endless love"
            className="w-full h-full object-cover brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-[#C5A059] text-xs uppercase tracking-[0.5em] mb-8 font-light">The Beginning</p>
          <h2 className="heading-secondary text-5xl md:text-7xl mb-12">
            Let's immortalize <br /> <span className="italic font-serif gold-gradient">your moment.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link to="/booking" className="btn-gold-solid hover:shadow-[0_0_30px_rgba(197,160,89,0.4)]">
              Reserve Your Date
            </Link>
            <Link to="/contact" className="text-xs uppercase tracking-[0.4em] font-medium hover:text-[#C5A059] transition-colors group">
              Speak With Us <ArrowRight className="inline ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Footer Preview */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="flex justify-center gap-8 mb-8 opacity-40">
          {['Instagram', 'Facebook', 'Pinterest', 'Vimeo'].map((platform) => (
            <a key={platform} href="#" className="text-[10px] uppercase tracking-widest hover:text-[#C5A059] transition-colors">{platform}</a>
          ))}
        </div>
        <p className="text-[10px] text-muted tracking-[0.2em] font-light">© 2024 PREWED BLISS. DEFINING CINEMATIC EXCELLENCE.</p>
      </footer>
    </div>
  );
};

export default HomePage;
