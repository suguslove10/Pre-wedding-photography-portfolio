import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { packages } from '../data/mock';

const ServicesPage = () => {
  return (
    <div className="bg-[#FDF8F3] pt-24">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-4">Our Services</p>
          <h1
            className="text-4xl md:text-6xl text-[#2D2D2D] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Packages & Pricing
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect package for your pre-wedding photography and cinematography needs.
            Each package is designed to capture your love story beautifully.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="px-6 pb-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white p-8 transition-all duration-300 hover:shadow-xl ${
                  pkg.popular ? 'ring-2 ring-[#D4AF37]' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#D4AF37] text-white text-xs uppercase tracking-wider flex items-center gap-1">
                    <Star className="w-3 h-3" /> Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3
                    className="text-2xl text-[#2D2D2D] mb-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {pkg.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{pkg.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-semibold text-[#2D2D2D]">
                      ${pkg.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/booking"
                  className={`block w-full py-3 text-center font-medium tracking-wide uppercase text-sm transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-[#D4AF37] text-white hover:bg-[#B8962E]'
                      : 'bg-[#2D2D2D] text-white hover:bg-[#1A1A1A]'
                  }`}
                >
                  Select Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-4">What We Offer</p>
            <h2
              className="text-3xl md:text-5xl text-[#2D2D2D]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Included in Every Package
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Pre-Shoot Consultation',
                desc: 'Discuss your vision, locations, and styling',
              },
              {
                title: 'Professional Editing',
                desc: 'Color correction, retouching, and enhancement',
              },
              {
                title: 'Online Gallery',
                desc: 'Private gallery to share with family and friends',
              },
              {
                title: 'Print-Ready Files',
                desc: 'High-resolution images ready for printing',
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F8E8E8] flex items-center justify-center">
                  <Check className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3
                  className="text-lg text-[#2D2D2D] mb-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Packages CTA */}
      <section className="py-24 px-6 bg-[#2D2D2D] text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2
            className="text-3xl md:text-4xl mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Need a Custom Package?
          </h2>
          <p className="text-gray-300 mb-8">
            We understand that every couple is unique. Contact us to create a personalized
            package that perfectly fits your needs and budget.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3.5 bg-[#D4AF37] text-white font-medium tracking-wider uppercase text-sm transition-all duration-300 hover:bg-[#B8962E]"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
