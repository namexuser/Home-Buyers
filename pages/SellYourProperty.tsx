
import React, { useState } from 'react';
import { PropertyType, PropertyCondition, LeadForm } from '../types';
import { CheckCircle2, Info, Camera, Loader2, MessageCircle } from 'lucide-react';
import { BUSINESS_NAME, CONTACT_WHATSAPP } from '../constants';

const SellYourProperty: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<LeadForm>({
    name: '',
    phone: '',
    email: '',
    propertyAddress: '',
    propertyType: PropertyType.House,
    condition: PropertyCondition.Good,
    situation: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // We map the snake_case input names back to our camelCase state if necessary
    // But since we aren't using EmailJS templates anymore, we can just use the state keys directly or map them.
    // For consistency with previous code, let's keep the mapping if the input names are snake_case.
    
    let stateName = name;
    if (name === 'from_name') stateName = 'name';
    if (name === 'from_email') stateName = 'email';
    if (name === 'property_address') stateName = 'propertyAddress';
    if (name === 'property_type') stateName = 'propertyType';

    setFormData(prev => ({
      ...prev,
      [stateName]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Format the message for WhatsApp
    const message = `*NEW PROPERTY OFFER REQUEST* 🏠\n\n` +
      `*👤 Seller Details:*\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n\n` +
      `*📍 Property Info:*\n` +
      `Address: ${formData.propertyAddress}\n` +
      `Type: ${formData.propertyType}\n` +
      `Condition: ${formData.condition}\n\n` +
      `*📝 Situation:*\n${formData.situation || 'N/A'}\n\n` +
      `-----------------------------\n` +
      `📸 *I will attach photos of the property in this chat now.*`;

    // 2. Create WhatsApp URL
    // Remove non-digits from phone number for the API link
    const cleanPhone = CONTACT_WHATSAPP.replace(/\D/g, ''); 
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    // 3. Open WhatsApp in new tab
    // We use a small timeout to simulate processing feel
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="py-24 text-center px-4 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-2xl w-full bg-white p-12 rounded-[3rem] border border-green-100 shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="flex justify-center mb-8">
            <div className="bg-green-100 p-6 rounded-full">
              <MessageCircle className="w-20 h-20 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-green-950 mb-6 italic tracking-tight">Opening WhatsApp...</h1>
          <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">
            We have prepared your message. Please click the <b>send button</b> in WhatsApp to complete your request.
          </p>
          
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-10 text-blue-900 font-bold text-lg">
             <Camera className="w-6 h-6 inline mr-2 mb-1" /> 
             Don't forget to attach your photos in the chat!
          </div>

          <p className="text-gray-500 mb-8 font-medium">Did WhatsApp not open?</p>
          
          <button 
            onClick={() => {
              const cleanPhone = CONTACT_WHATSAPP.replace(/\D/g, ''); 
              // Re-construct basic message if needed, or just link to chat
              window.open(`https://wa.me/${cleanPhone}`, '_blank');
            }}
            className="w-full bg-green-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-green-700 transition shadow-xl mb-4"
          >
            Click to Open WhatsApp
          </button>
          
          <button 
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                email: '',
                propertyAddress: '',
                propertyType: PropertyType.House,
                condition: PropertyCondition.Good,
                situation: ''
              });
            }}
            className="text-gray-400 font-bold hover:text-gray-600 underline"
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-blue-950 mb-6 italic tracking-tighter">Get Your Offer</h1>
          <p className="text-2xl text-gray-700 font-extrabold max-w-3xl mx-auto">Free, no-obligation cash offer for your Gaborone property in 48 hours.</p>
        </div>

        {/* High-Contrast Form */}
        <div className="bg-slate-950 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden border border-slate-900">
          <div className="bg-blue-600 p-10 flex items-center space-x-6">
             <div className="bg-white/20 p-3 rounded-2xl border border-white/30 shrink-0">
                <Info className="w-8 h-8 text-white" />
             </div>
             <p className="text-white font-black text-xl leading-snug">Privacy Guaranteed. We are local {BUSINESS_NAME}, not agents.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 md:p-20 space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <h3 className="text-2xl font-black text-white border-b-4 border-blue-600 w-fit pb-2 italic mb-10">1. Contact Details</h3>
                <div>
                  <label className="block text-sm font-black text-white mb-3 uppercase tracking-[0.2em]">Full Name</label>
                  <input 
                    required 
                    type="text"
                    name="from_name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 px-6 py-5 rounded-2xl border-2 border-slate-800 focus:ring-4 focus:ring-blue-600 focus:border-transparent outline-none transition text-white font-black text-xl placeholder:text-gray-600" 
                    placeholder="Your Name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-white mb-3 uppercase tracking-[0.2em]">Phone / WhatsApp</label>
                  <input 
                    required 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 px-6 py-5 rounded-2xl border-2 border-slate-800 focus:ring-4 focus:ring-blue-600 focus:border-transparent outline-none transition text-white font-black text-xl placeholder:text-gray-600" 
                    placeholder="+267 71 000 000" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-white mb-3 uppercase tracking-[0.2em]">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    name="from_email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 px-6 py-5 rounded-2xl border-2 border-slate-800 focus:ring-4 focus:ring-blue-600 focus:border-transparent outline-none transition text-white font-black text-xl placeholder:text-gray-600" 
                    placeholder="name@email.com" 
                  />
                </div>
              </div>

              {/* Property Info */}
              <div className="space-y-8">
                <h3 className="text-2xl font-black text-white border-b-4 border-green-600 w-fit pb-2 italic mb-10">2. Property Info</h3>
                <div>
                  <label className="block text-sm font-black text-white mb-3 uppercase tracking-[0.2em]">Gaborone Street / Plot #</label>
                  <input 
                    required 
                    type="text" 
                    name="property_address"
                    value={formData.propertyAddress}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 px-6 py-5 rounded-2xl border-2 border-slate-800 focus:ring-4 focus:ring-blue-600 focus:border-transparent outline-none transition text-white font-black text-xl placeholder:text-gray-600" 
                    placeholder="e.g. Plot 442, Broadhurst" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-white mb-3 uppercase tracking-[0.2em]">Property Type</label>
                  <select 
                    name="property_type"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 px-6 py-5 rounded-2xl border-2 border-slate-800 focus:ring-4 focus:ring-blue-600 outline-none text-white font-black text-xl appearance-none cursor-pointer"
                  >
                    {Object.values(PropertyType).map(type => <option key={type} value={type} className="bg-slate-950">{type}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black text-white mb-3 uppercase tracking-[0.2em]">Condition</label>
                  <select 
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 px-6 py-5 rounded-2xl border-2 border-slate-800 focus:ring-4 focus:ring-blue-600 outline-none text-white font-black text-xl appearance-none cursor-pointer"
                  >
                    {Object.values(PropertyCondition).map(cond => <option key={cond} value={cond} className="bg-slate-950">{cond}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Photos Instructions (Replaced File Upload) */}
            <div className="pt-6">
              <h3 className="text-2xl font-black text-white border-b-4 border-yellow-500 w-fit pb-2 italic mb-10">3. Photos</h3>
              <div className="w-full border-4 border-dashed border-slate-700 bg-slate-900/50 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
                <div className="bg-green-600 p-4 rounded-full mb-6 shadow-lg shadow-green-900/50">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-bold text-2xl mb-3">Send Photos via WhatsApp</p>
                <p className="text-gray-400 font-medium text-lg max-w-lg">
                  To ensure the highest quality and speed, please attach your property photos <b>directly in the WhatsApp chat</b> after clicking the submit button below.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <label className="block text-sm font-black text-white mb-4 uppercase tracking-[0.2em]">Tell us about the situation (Relocating, inherited, etc.)</label>
              <textarea 
                name="situation"
                value={formData.situation}
                onChange={handleInputChange}
                className="w-full bg-slate-900 px-6 py-6 rounded-2xl border-2 border-slate-800 focus:ring-4 focus:ring-blue-600 focus:border-transparent outline-none transition h-48 text-white font-black text-xl placeholder:text-gray-600" 
                placeholder="Briefly describe why you are selling..."
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-10 border-t border-slate-800">
              <div className="flex items-center space-x-3 text-gray-400 font-black italic">
                <CheckCircle2 className="w-6 h-6 text-blue-500" />
                <span>Fast Evaluation Guaranteed</span>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto bg-green-600 text-white px-10 py-6 rounded-2xl font-black text-2xl hover:bg-green-700 transition flex items-center justify-center shadow-2xl shadow-green-950/50 hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-3 w-7 h-7" /> Opening WhatsApp...
                  </>
                ) : (
                  <>
                    <MessageCircle className="mr-3 w-7 h-7" /> Send via WhatsApp
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        <p className="mt-16 text-center text-gray-500 font-black uppercase tracking-widest text-sm">
          {BUSINESS_NAME} • Trusted Local Property Solutions
        </p>
      </div>
    </div>
  );
};

export default SellYourProperty;
