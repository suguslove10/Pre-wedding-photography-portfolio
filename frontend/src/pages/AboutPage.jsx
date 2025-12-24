import React from 'react';
import { Camera, Award, Heart, Users } from 'lucide-react';
import { photographerInfo } from '../data/mock';

const AboutPage = () => {
  const statIcons = {
    'Years Experience': Camera,
    'Weddings Captured': Heart,
    'Happy Couples': Users,
    'Awards Won': Award,
  };

  return (
    <div className="bg-[#FDF8F3] pt-24">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-4">About Us</p>
          <h1
            className="text-4xl md:text-6xl text-[#2D2D2D] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Meet the Artist
          </h1>
        </div>
      </section>

      {/* About Content */}
      <section className="px-6 pb-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={photographerInfo.image}
                  alt={photographerInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#D4AF37]/10 -z-10" />
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-[#F8E8E8] -z-10" />
            </div>

            {/* Content */}
            <div>
              <h2
                className="text-3xl md:text-4xl text-[#2D2D2D] mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {photographerInfo.name}
              </h2>
              <p className="text-[#D4AF37] uppercase tracking-wider text-sm mb-6">
                {photographerInfo.title}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                {photographerInfo.bio}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                My approach combines a documentary style with artistic direction,
                ensuring that every image feels both natural and beautifully composed.
                I believe in building genuine connections with my couples, allowing their
                true personalities to shine through in every photograph.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {photographerInfo.experience.map((stat) => {
                  const Icon = statIcons[stat.label] || Camera;
                  return (
                    <div key={stat.label} className="text-center">
                      <Icon className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
                      <p
                        className="text-2xl text-[#2D2D2D] font-semibold"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-4">Our Gear</p>
              <h2
                className="text-3xl md:text-4xl text-[#2D2D2D]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Professional Equipment
              </h2>
              <p className="text-gray-600 mt-4">
                We invest in the best equipment to deliver stunning results for every shoot.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photographerInfo.equipment.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-[#FDF8F3] transition-all duration-300 hover:bg-[#F8E8E8]"
                >
                  <Camera className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                  <span className="text-[#2D2D2D] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-[#2D2D2D] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-4">Our Philosophy</p>
          <h2
            className="text-3xl md:text-4xl mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Capturing Authentic Moments
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            "Every couple has a unique story to tell, and my mission is to capture those
            precious moments that reflect your genuine love and connection. I don't just
            take photographs—I create timeless art that you'll treasure for generations."
          </p>
          <p
            className="text-[#D4AF37] text-xl italic"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            — {photographerInfo.name}
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
