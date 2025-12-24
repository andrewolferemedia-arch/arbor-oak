import React, { useState, useEffect } from 'react';
import { Send, Phone, Mail, MapPin, Calendar, Lock } from 'lucide-react';
import { SERVICES } from '../constants';

interface ContactProps {
  initialService?: string;
}

const Contact: React.FC<ContactProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    sqft: '',
    serviceType: '',
    preferredDate: '',
    accessCode: '',
    notes: ''
  });

  // Populate service type if passed from another component
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, serviceType: initialService }));
    } else if (!formData.serviceType) {
      setFormData(prev => ({ ...prev, serviceType: SERVICES[0].title }));
    }
  }, [initialService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct email body
    const subject = `Booking Request: ${formData.serviceType} - ${formData.address}`;
    const body = `
Name: ${formData.name}
Phone: ${formData.phone}
Service: ${formData.serviceType}

Property Address: ${formData.address}
Approx Sq Ft: ${formData.sqft}

Preferred Date: ${formData.preferredDate}
Access Code: ${formData.accessCode}

Notes:
${formData.notes}
    `;

    // Open email client
    window.location.href = `mailto:bookings@arboroakrealestatemedia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // UI Feedback
    alert("Opening your email client to send request...");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="py-20 bg-brand-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Info Side */}
          <div className="bg-brand-dark text-white p-12 md:w-1/3 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-serif mb-6">Book a Shoot</h2>
              <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                <strong className="text-white">Agents:</strong> We value your time. Please provide property access details and sq. ft. so we can operate independently if you cannot be present.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-brand-accent mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-xs uppercase text-gray-500">Email</h4>
                    <p className="text-sm">bookings@arboroak.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-brand-accent mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-xs uppercase text-gray-500">Phone</h4>
                    <p className="text-sm">(555) 123-4567</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <MapPin className="text-brand-accent mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-xs uppercase text-gray-500">Service Area</h4>
                    <p className="text-sm">Chicago South Suburbs,<br/>Will County & NW Indiana</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 md:mt-0">
               <div className="h-1 w-12 bg-brand-accent mb-4"></div>
               <p className="text-xs italic text-gray-400">
                 *24-hour cancellation policy applies.
               </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:p-12 md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Agent Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-brand-primary outline-none transition-all"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Phone</label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-brand-primary outline-none transition-all"
                    placeholder="(555) 555-5555"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 2: Property Info */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Property Address</label>
                <input
                  required
                  name="address"
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-brand-primary outline-none transition-all"
                  placeholder="123 Main St, City, Zip"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              {/* Row 3: Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Approx Sq. Ft.</label>
                  <input
                    required
                    name="sqft"
                    type="number"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-brand-primary outline-none transition-all"
                    placeholder="e.g. 2500"
                    value={formData.sqft}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Service Package</label>
                  <select
                    name="serviceType"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-brand-primary outline-none transition-all"
                    value={formData.serviceType}
                    onChange={handleChange}
                  >
                    {/* Map standard services */}
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    {/* Add Retainer/Custom Options */}
                    <option value="Retainer: The Consistency ($650/mo)">Retainer: The Consistency ($650/mo)</option>
                    <option value="Retainer: The Growth ($1,500/mo)">Retainer: The Growth ($1,500/mo)</option>
                    <option value="Retainer: The Monopoly (Custom)">Retainer: The Monopoly (Custom)</option>
                    <option value="Agent Branding / Headshots">Agent Branding / Headshots</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Logistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                       <Calendar size={14} /> Preferred Date
                    </label>
                    <input
                      required
                      name="preferredDate"
                      type="date"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-brand-primary outline-none transition-all"
                      value={formData.preferredDate}
                      onChange={handleChange}
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                       <Lock size={14} /> Access / Lockbox (Optional)
                    </label>
                    <input
                      name="accessCode"
                      type="text"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-brand-primary outline-none transition-all"
                      placeholder="CBS Code / Sentri"
                      value={formData.accessCode}
                      onChange={handleChange}
                    />
                 </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Additional Notes / Gate Codes</label>
                <textarea
                  name="notes"
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-brand-primary outline-none transition-all"
                  placeholder="Is the home vacant or occupied? Are there pets?"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary text-white font-bold py-4 rounded hover:bg-brand-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                SUBMIT REQUEST <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;