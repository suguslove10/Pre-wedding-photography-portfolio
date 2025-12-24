import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSection = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-4">Testimonials</p>
          <h2
            className="text-3xl md:text-5xl text-[#2D2D2D]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Words from Our Couples
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#FDF8F3] p-8 md:p-12 text-center">
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-[#D4AF37]/30 mx-auto mb-6" />

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>

            {/* Testimonial Text */}
            <p
              className="text-lg md:text-xl text-[#2D2D2D] leading-relaxed mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              "{currentTestimonial.text}"
            </p>

            {/* Author */}
            <div className="flex flex-col items-center">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-16 h-16 rounded-full object-cover mb-4"
              />
              <h4 className="font-medium text-[#2D2D2D]">{currentTestimonial.name}</h4>
              <p className="text-sm text-gray-500">{currentTestimonial.date}</p>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all hover:shadow-lg hover:bg-[#D4AF37] hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all hover:shadow-lg hover:bg-[#D4AF37] hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#D4AF37] w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
