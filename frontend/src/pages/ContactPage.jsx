import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook, Youtube } from 'lucide-react';
import { contactInfo } from '../data/mock';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Message Sent!',
      description: 'We\'ll get back to you within 24 hours.',
    });

    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#FDF8F3] pt-24">
      <Toaster />
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-4">Get in Touch</p>
          <h1
            className="text-4xl md:text-6xl text-[#2D2D2D] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to book? We'd love to hear from you.
            Reach out and let's start planning your perfect shoot.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-6 pb-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 shadow-sm">
              <h2
                className="text-2xl text-[#2D2D2D] mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                      Your Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className="w-full border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                      Phone
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                      Subject *
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help?"
                      className="w-full border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your vision, preferred dates, locations, or any questions..."
                    rows={6}
                    className="w-full border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#D4AF37] text-white font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-[#B8962E] disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Info Cards */}
              <div className="bg-white p-8 shadow-sm">
                <h3
                  className="text-xl text-[#2D2D2D] mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F8E8E8] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#2D2D2D] mb-1">Studio Address</h4>
                      <p className="text-gray-600 text-sm">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F8E8E8] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#2D2D2D] mb-1">Phone</h4>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-gray-600 text-sm hover:text-[#D4AF37] transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F8E8E8] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#2D2D2D] mb-1">Email</h4>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-gray-600 text-sm hover:text-[#D4AF37] transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F8E8E8] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#2D2D2D] mb-1">Working Hours</h4>
                      <p className="text-gray-600 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 text-sm">Sun: By Appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social & WhatsApp */}
              <div className="bg-white p-8 shadow-sm">
                <h3
                  className="text-xl text-[#2D2D2D] mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Connect With Us
                </h3>

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-medium tracking-wide text-sm transition-all duration-300 hover:bg-[#20BD5A] mb-6"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <a
                    href={contactInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#F8E8E8] flex items-center justify-center transition-all duration-300 hover:bg-[#D4AF37] hover:text-white text-[#2D2D2D]"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={contactInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#F8E8E8] flex items-center justify-center transition-all duration-300 hover:bg-[#D4AF37] hover:text-white text-[#2D2D2D]"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={contactInfo.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#F8E8E8] flex items-center justify-center transition-all duration-300 hover:bg-[#D4AF37] hover:text-white text-[#2D2D2D]"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white p-2 shadow-sm">
                <iframe
                  src={contactInfo.mapEmbed}
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Studio Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
