import React, { useState } from 'react';
import { format, isSameDay, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isBefore, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight, MapPin, Clock, User, Mail, Phone, FileText, CalendarDays, Check } from 'lucide-react';
import { packages, timeSlots, bookedDates } from '../data/mock';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';

const BookingPage = () => {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    venue: '',
    specialRequests: '',
  });

  const today = startOfDay(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayOfMonth = getDay(startOfMonth(currentMonth));

  const isDateBooked = (date) => {
    return bookedDates.some((bookedDate) => isSameDay(date, bookedDate));
  };

  const isDateDisabled = (date) => {
    return isBefore(date, today) || isDateBooked(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !selectedPackage) {
      toast({
        title: 'Missing Information',
        description: 'Please select a date, time, and package to proceed.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    // Mock booking submission
    const booking = {
      ...formData,
      date: selectedDate,
      time: selectedTime,
      package: selectedPackage,
      confirmationNumber: `AR${Date.now().toString().slice(-6)}`,
    };

    setBookingDetails(booking);
    setBookingConfirmed(true);

    toast({
      title: 'Booking Confirmed!',
      description: 'You will receive a confirmation email shortly.',
    });
  };

  if (bookingConfirmed && bookingDetails) {
    return (
      <div className="bg-[#FDF8F3] pt-24 min-h-screen">
        <Toaster />
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-2xl text-center">
            <div className="bg-white p-12 shadow-lg">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h1
                className="text-3xl md:text-4xl text-[#2D2D2D] mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Booking Confirmed!
              </h1>
              <p className="text-gray-600 mb-8">
                Thank you for booking with us. We're excited to capture your special moments!
              </p>

              <div className="bg-[#FDF8F3] p-6 text-left mb-8">
                <h3 className="font-semibold text-[#2D2D2D] mb-4">Booking Details</h3>
                <div className="space-y-3 text-sm">
                  <p><span className="text-gray-500">Confirmation #:</span> <span className="font-medium">{bookingDetails.confirmationNumber}</span></p>
                  <p><span className="text-gray-500">Name:</span> {bookingDetails.name}</p>
                  <p><span className="text-gray-500">Date:</span> {format(bookingDetails.date, 'MMMM d, yyyy')}</p>
                  <p><span className="text-gray-500">Time:</span> {bookingDetails.time}</p>
                  <p><span className="text-gray-500">Package:</span> {bookingDetails.package}</p>
                  {bookingDetails.venue && (
                    <p><span className="text-gray-500">Venue:</span> {bookingDetails.venue}</p>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                A confirmation email has been sent to {bookingDetails.email}
              </p>

              <button
                onClick={() => {
                  setBookingConfirmed(false);
                  setBookingDetails(null);
                  setSelectedDate(null);
                  setSelectedTime('');
                  setSelectedPackage('');
                  setFormData({ name: '', email: '', phone: '', venue: '', specialRequests: '' });
                }}
                className="px-8 py-3 bg-[#2D2D2D] text-white font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-[#1A1A1A]"
              >
                Book Another Session
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#FDF8F3] pt-24">
      <Toaster />
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-4">Book Your Session</p>
          <h1
            className="text-4xl md:text-6xl text-[#2D2D2D] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Schedule Your Shoot
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select your preferred date, time, and package to begin creating your beautiful memories.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="px-6 pb-24">
        <div className="container mx-auto">
          <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calendar Section */}
              <div className="bg-white p-8 shadow-sm">
                <h2
                  className="text-2xl text-[#2D2D2D] mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Select Date
                </h2>

                {/* Calendar Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[#F8E8E8]"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#2D2D2D]" />
                  </button>
                  <h3 className="font-medium text-[#2D2D2D]">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[#F8E8E8]"
                  >
                    <ChevronRight className="w-5 h-5 text-[#2D2D2D]" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-xs text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                    <div key={`empty-${index}`} />
                  ))}
                  {daysInMonth.map((day) => {
                    const disabled = isDateDisabled(day);
                    const selected = selectedDate && isSameDay(day, selectedDate);
                    const booked = isDateBooked(day);

                    return (
                      <button
                        key={day.toISOString()}
                        type="button"
                        disabled={disabled}
                        onClick={() => !disabled && setSelectedDate(day)}
                        className={`aspect-square flex items-center justify-center text-sm transition-all duration-200 ${
                          disabled
                            ? 'text-gray-300 cursor-not-allowed'
                            : selected
                            ? 'bg-[#D4AF37] text-white'
                            : 'text-[#2D2D2D] hover:bg-[#F8E8E8]'
                        } ${booked ? 'line-through' : ''}`}
                      >
                        {format(day, 'd')}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6 mt-6 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#D4AF37]" />
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 line-through flex items-center justify-center text-gray-400">x</div>
                    <span>Booked</span>
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="mt-8">
                    <h3 className="font-medium text-[#2D2D2D] mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      Select Time for {format(selectedDate, 'MMMM d')}
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-3 text-sm transition-all duration-200 ${
                            selectedTime === time
                              ? 'bg-[#D4AF37] text-white'
                              : 'bg-[#FDF8F3] text-[#2D2D2D] hover:bg-[#F8E8E8]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="bg-white p-8 shadow-sm">
                <h2
                  className="text-2xl text-[#2D2D2D] mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Your Details
                </h2>

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#D4AF37]" /> Full Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#D4AF37]" /> Email Address *
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

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#D4AF37]" /> Phone Number *
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                      required
                    />
                  </div>

                  {/* Package Selection */}
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-[#D4AF37]" /> Select Package *
                    </label>
                    <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                      <SelectTrigger className="w-full border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                        <SelectValue placeholder="Choose a package" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.name}>
                            {pkg.name} - ${pkg.price.toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Venue */}
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#D4AF37]" /> Preferred Venue
                    </label>
                    <Input
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      placeholder="Beach, Garden, City, etc."
                      className="w-full border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#D4AF37]" /> Special Requests
                    </label>
                    <Textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Any specific ideas or requirements..."
                      rows={4}
                      className="w-full border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#D4AF37] text-white font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-[#B8962E]"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
