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
          ? 'bg-black/95 backdrop-blur-xl py-5 border-b border-white/10 shadow-2xl'
          : 'bg-transparent py-10'
        }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group relative">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.2em] text-white group-hover:gold-gradient transition-all duration-500 uppercase font-medium">
                Prewed Bliss
              </span>
              <span className="text-[11px] uppercase tracking-[0.6em] text-[#D4AF37] mt-1.5 opacity-100 group-hover:gold-gradient transition-opacity font-bold">
                Cinematic Artistry
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-14">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[13px] font-bold tracking-[0.3em] uppercase transition-all duration-500 hover:text-[#D4AF37] relative group ${isActive(link.path) ? 'text-[#D4AF37]' : 'text-[#FFFFFF]'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-3 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-500 group-hover:w-full ${isActive(link.path) ? 'w-full' : ''}`} />
              </Link>
            ))}

            <Link
              to="/booking"
              className="text-[12px] font-bold uppercase tracking-[0.4em] px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
            >
              Reserve
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#050505] z-[-1] transition-transform duration-700 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="h-full flex flex-col items-center justify-center gap-12 px-6 pt-24">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-3xl font-serif tracking-widest text-[#FFFFFF] transition-colors hover:text-[#D4AF37] ${isActive(link.path) ? 'text-[#D4AF37]' : ''
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/booking"
              className="mt-12 px-14 py-5 bg-[#D4AF37] text-black text-sm font-black tracking-widest uppercase hover:bg-white transition-all shadow-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reserve Session
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
