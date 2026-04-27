
import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { CONTACT_PHONE, CONTACT_PHONE_SECONDARY, CONTACT_EMAIL, SERVICE_AREAS } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-4 italic tracking-tight">Let's Chat Today</h1>
          <p className="text-2xl text-gray-700 font-bold">We're available 24/7 for urgent property inquiries across Gaborone.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black text-blue-950 mb-8 italic">Contact Details</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="bg-green-50 p-4 rounded-2xl border border-green-100 shadow-sm">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-blue-950 uppercase tracking-wider">Phone & SMS</h4>
                    <p className="text-xl text-gray-700 font-bold">{CONTACT_PHONE}</p>
                    <p className="text-xl text-gray-700 font-bold">{CONTACT_PHONE_SECONDARY}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-green-50 p-4 rounded-2xl border border-green-100 shadow-sm">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-blue-950 uppercase tracking-wider">WhatsApp</h4>
                    <p className="text-xl text-gray-700 font-bold">{CONTACT_PHONE}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-green-50 p-4 rounded-2xl border border-green-100 shadow-sm">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-blue-950 uppercase tracking-wider">Email</h4>
                    <p className="text-xl text-gray-700 font-bold">{CONTACT_EMAIL}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="bg-gray-100 p-4 rounded-2xl border border-gray-200 shadow-sm">
                    <MapPin className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-blue-950 uppercase tracking-wider">Office Location</h4>
                    <p className="text-xl text-gray-700 font-bold">Gaborone CBD, Botswana</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <h2 className="text-2xl font-black mb-6 italic uppercase tracking-widest">We Are Always Ready</h2>
              <div className="flex items-center space-x-6">
                <Clock className="w-12 h-12 text-green-400 shrink-0" />
                <div>
                  <p className="text-xl font-black text-green-400">24/7 Availability</p>
                  <p className="text-blue-100 font-bold">Leave a message or call anytime. We respond to urgent Gaborone inquiries immediately.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas Section with Landmark Image */}
          <div className="bg-gray-50 rounded-[3rem] p-10 md:p-14 border border-gray-200 shadow-inner">
            <h2 className="text-3xl font-black text-blue-950 mb-8 italic">Areas We Serve</h2>
            <div className="grid grid-cols-2 gap-6 mb-12">
              {SERVICE_AREAS.map(area => (
                <div key={area} className="flex items-center space-x-3 text-gray-800 font-black tracking-tight">
                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                   <span>{area}</span>
                </div>
              ))}
            </div>
            
            <div className="h-80 bg-gray-200 rounded-[2.5rem] flex items-center justify-center text-gray-400 font-medium italic overflow-hidden shadow-2xl relative group">
               {/* Updated Gaborone Aerial View */}
               <img 
                  src="https://www.dropbox.com/scl/fi/dhpssbdw6qv08pyue35kd/Gaborone-Aerial-View.png?rlkey=1a2cmhk2wuepi9ko7u8dcqvu6&st=k28bfrga&raw=1" 
                  alt="Aerial view of Gaborone" 
                  className="w-full h-full object-cover brightness-[0.8] grayscale-[0.3] group-hover:scale-110 transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-blue-900/20 flex items-center justify-center">
                 <div className="bg-white/95 backdrop-blur-sm px-8 py-3 rounded-full text-blue-950 font-black border-2 border-blue-900 shadow-xl text-lg italic flex items-center gap-2">
                   <MapPin className="w-5 h-5 text-red-600" />
                   Gaborone, Botswana
                 </div>
               </div>
            </div>
            <p className="mt-8 text-center text-gray-600 font-black italic uppercase tracking-widest text-sm">
              Focused Exclusively on the Gaborone Market
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
