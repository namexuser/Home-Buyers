
import React from 'react';
import { MapPin, Shield, Heart } from 'lucide-react';
import { BUSINESS_NAME } from '../constants';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-950 py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900 rounded-full -mr-48 -mt-48 blur-3xl opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-8 italic leading-tight tracking-tighter">Your Gaborone Cash Buying Experts</h1>
          <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-bold">
            We are a local Gaborone team dedicated to providing ethical, transparent, and fast property solutions for our community.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black text-blue-950 mb-8 italic tracking-tight">Our Story</h2>
              <div className="space-y-8 text-gray-800 text-xl leading-relaxed font-bold">
                <p>
                  {BUSINESS_NAME} was founded to help Gaborone residents who need to sell their property fast. We noticed that the traditional real estate market in Botswana often leaves motivated sellers frustrated by long bank delays and high agent fees.
                </p>
                <p>
                  We are locals who understand the heartbeat of Gaborone—from the vibrant communities to the growing developments in Gaborone. We specialize in buying homes, multifamilies, flats, and plots directly.
                </p>
                <p>
                  Our commitment is to fairness and integrity. We follow all Botswana real estate laws and work with trusted local conveyancers to ensure you get paid quickly and safely.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
               <div className="grid grid-cols-2 gap-6">
                 {/* Left Image: Gaborone Aerial View */}
                 <img 
                    src="https://www.dropbox.com/scl/fi/4xl35zd04w5l1vpg8ozqe/Gaborone-Botswana-Aerial-5-edited.jpg?rlkey=np7tznl9uitdkq6rtyokpflfl&st=o7zxt7rr&raw=1" 
                    alt="Aerial view of Gaborone" 
                    className="rounded-[2.5rem] shadow-2xl h-[400px] w-full object-cover border-4 border-gray-50" 
                 />
                 
                 {/* Right Image: Updated Screenshot */}
                 <img 
                    src="https://www.dropbox.com/scl/fi/519wxsqj35copogememc0/Screenshot-2026-02-10-054105-edited.png?rlkey=n772hkum1nua8cgy0luap7lwu&st=uwj3xkpq&raw=1" 
                    alt="Happy clients dealing with property" 
                    className="rounded-[2.5rem] shadow-2xl mt-12 h-[400px] w-full object-cover border-4 border-gray-50" 
                 />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-32 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-blue-950 mb-20 italic">Why Sellers Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="p-12 bg-white rounded-[3rem] shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform">
              <div className="mb-8 flex justify-center">
                <div className="bg-green-50 p-6 rounded-3xl">
                  <MapPin className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-4 text-blue-950 uppercase">Gaborone Experts</h3>
              <p className="text-gray-700 font-bold text-lg leading-relaxed">We live and work in Gaborone. We understand the value of every neighborhood and provide offers based on real local data.</p>
            </div>
            <div className="p-12 bg-white rounded-[3rem] shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform">
              <div className="mb-8 flex justify-center">
                <div className="bg-green-50 p-6 rounded-3xl">
                  <Shield className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-4 text-blue-950 uppercase">Ethical & Transparent</h3>
              <p className="text-gray-700 font-bold text-lg leading-relaxed">No hidden fees, no fine print. We walk you through every step of the Botswana property transfer process.</p>
            </div>
            <div className="p-12 bg-white rounded-[3rem] shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform">
              <div className="mb-8 flex justify-center">
                <div className="bg-green-50 p-6 rounded-3xl">
                  <Heart className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-4 text-blue-950 uppercase">Stress-Free Exit</h3>
              <p className="text-gray-700 font-bold text-lg leading-relaxed">You don't even need to clean. We buy as-is and work around your timeline for a seamless transition.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
