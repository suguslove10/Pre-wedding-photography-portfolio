import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { contactInfo } from '../../data/mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

          {/* Brand Identity */}
          <div className="lg:col-span-5">
            <Link to="/" onClick={scrollToTop} className="inline-block mb-8">
              <span className="font-serif text-3xl tracking-[0.2em] uppercase italic gold-gradient">
                Prewed Bliss
              </span>
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] mt-2 font-light">
                Cinematic Love Stories
              </p>
            </Link>
            <p className="text-secondary text-sm font-light leading-relaxed max-w-md opacity-60 mb-10">
              We specialize in luxury pre-wedding experiences, capturing the silent,
              romantic dialogue between couples through a cinematic editorial lens.
            </p>
            <div className="flex gap-6">
              {[
                { icon: Instagram, link: contactInfo.social.instagram },
                { icon: Facebook, link: contactInfo.social.facebook },
                { icon: Youtube, link: contactInfo.social.youtube }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 hover:border-[#C5A059] hover:text-[#C5A059] group"
                >
                  <social.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#C5A059] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Stories', 'The Vision', 'Offerings', 'Connect'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Stories' ? '/portfolio' : item === 'The Vision' ? '/about' : item === 'Offerings' ? '/services' : '/contact'}
                    className="text-white/40 text-xs uppercase tracking-widest transition-all duration-300 hover:text-white flex items-center group"
                  >
                    {item} <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#C5A059] mb-8">The Studio</h4>
            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <MapPin className="w-4 h-4 text-[#C5A059] mt-0.5" />
                <div>
                  <p className="text-white/80 text-xs font-light tracking-wide leading-relaxed">
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 group">
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-white/80 text-xs font-light tracking-widest group-hover:text-white transition-colors">
                    {contactInfo.phone}
                  </span>
                </a>

                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 group">
                  <Mail className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-white/80 text-xs font-light tracking-widest group-hover:text-white transition-colors">
                    {contactInfo.email}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-light">
            © {new Date().getFullYear()} Prewed Bliss Artistry. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-[9px] text-white/30 uppercase tracking-[0.3em] hover:text-white transition-colors">Privacy Policy</Link>
            <button onClick={scrollToTop} className="text-[9px] text-white/30 uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors">Back to top ↑</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
