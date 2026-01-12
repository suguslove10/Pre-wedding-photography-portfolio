import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Stories', path: '/portfolio' },
    { name: 'The Vision', path: '/about' },
    { name: 'Offerings', path: '/services' },
    { name: 'Connect', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled
          ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/5'
          : 'bg-transparent py-8'
        }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group relative">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.15em] text-white group-hover:gold-gradient transition-all duration-500 uppercase">
                Prewed Bliss
              </span>
              <span className="text-[8px] uppercase tracking-[0.6em] text-[#C5A059] mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                Cinematic Artistry
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] font-medium tracking-[0.3em] uppercase transition-all duration-500 hover:text-[#C5A059] relative group ${isActive(link.path) ? 'text-[#C5A059]' : 'text-white/70'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-500 group-hover:w-full ${isActive(link.path) ? 'w-full' : ''}`} />
              </Link>
            ))}

            <Link
              to="/booking"
              className="text-[10px] uppercase tracking-[0.3em] px-8 py-3 border border-[#C5A059]/30 hover:bg-[#C5A059] hover:text-black transition-all duration-500"
            >
              Reserve Session
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#050505] z-[-1] transition-transform duration-700 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="h-full flex flex-col items-center justify-center gap-10 px-6 pt-20">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-2xl font-serif tracking-widest text-white transition-colors hover:text-[#C5A059] ${isActive(link.path) ? 'text-[#C5A059]' : ''
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/booking"
              className="mt-8 px-10 py-4 bg-[#C5A059] text-black text-xs font-semibold tracking-widest uppercase hover:bg-white transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reserve Session
            </Link>

            {/* Mobile Footer Info */}
            <div className="mt-auto pb-12 text-center">
              <p className="text-[10px] tracking-[0.4em] text-muted uppercase">Fine Art Photography</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
