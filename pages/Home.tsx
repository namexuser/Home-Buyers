
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, ShieldCheck as ShieldCheckIcon, BookOpen } from 'lucide-react';
import { CORE_MESSAGES } from '../constants';

const ShieldCheck = ({ className }: { className?: string }) => <ShieldCheckIcon className={className} />;

const PulaIcon = ({ className }: { className?: string }) => (
  <div className={`flex items-center justify-center font-black ${className}`}>
    P
  </div>
);

const HomeContent: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Gaborone Aerial View */}
          <img 
            src="https://www.dropbox.com/scl/fi/mrr28ms7s9a148fwqkjeb/GC-skyline.webp?rlkey=42sfj1fc81qvshr7zmx2qm0s4&st=fosdaxam&raw=1" 
            alt="Aerial view of Gaborone" 
            className="w-full h-full object-cover brightness-[0.45] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight italic">
              Sell Your Property Fast.
            </h1>
            <p className="text-2xl text-white/90 mb-10 leading-relaxed font-bold">
              We buy houses, multifamilies, plots, and flats across Gaborone. No repairs needed, no agent commissions. Get a fair cash offer today.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/sell" className="bg-green-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-green-700 transition flex items-center justify-center shadow-2xl shadow-green-900/40">
                Get My Offer <ArrowRight className="ml-2 w-6 h-6" />
              </Link>
              <Link to="/how-it-works" className="bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition text-center">
                See How It Works
              </Link>
            </div>
            
            <div className="mt-16 flex flex-wrap items-center gap-8">
              <div className="flex items-center space-x-3 text-white">
                <div className="bg-green-500/20 p-1.5 rounded-full border border-green-500/50">
                  <CheckCircle2 className="text-green-400 w-5 h-5" />
                </div>
                <span className="font-bold text-lg">No Commissions</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <div className="bg-green-500/20 p-1.5 rounded-full border border-green-500/50">
                  <CheckCircle2 className="text-green-400 w-5 h-5" />
                </div>
                <span className="font-bold text-lg">As-Is Sale</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <div className="bg-green-500/20 p-1.5 rounded-full border border-green-500/50">
                  <CheckCircle2 className="text-green-400 w-5 h-5" />
                </div>
                <span className="font-bold text-lg">Pick Closing Date</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="bg-blue-950 py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-10">
             <div className="flex items-center space-x-4">
               <ShieldCheck className="w-12 h-12 text-blue-400" />
               <span className="text-white text-xl font-black tracking-tight uppercase">Local Gaborone Buyers</span>
             </div>
             <div className="flex items-center space-x-4">
               <Clock className="w-12 h-12 text-green-400" />
               <span className="text-white text-xl font-black tracking-tight uppercase">21-Day Fast Closing</span>
             </div>
             <div className="flex items-center space-x-4">
               <PulaIcon className="w-12 h-12 text-blue-400 text-4xl" />
               <span className="text-white text-xl font-black tracking-tight uppercase">Paid in Cash</span>
             </div>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-blue-600 font-black tracking-[0.2em] uppercase text-sm mb-4">Trusted Property Solutions</h2>
            <h3 className="text-4xl md:text-6xl font-black text-blue-950 max-w-5xl mx-auto leading-tight italic">
              We buy any Gaborone property, in any condition.
            </h3>
            <p className="mt-8 text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-bold">
              Within Gaborone, we provide fast cash relief for motivated sellers. 
              No hidden fees, no bank delays—just cash on your terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {CORE_MESSAGES.map((msg, idx) => {
              const isBlueIcon = msg.title === "Fast, Fair Cash Offers" || msg.title === "Zero Fees or Hassles";
              return (
                <div key={idx} className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2 group">
                  <div className={`mb-8 p-5 bg-white rounded-2xl shadow-sm inline-block transition-colors ${isBlueIcon ? 'group-hover:bg-green-600' : 'group-hover:bg-blue-600'}`}>
                    <div className="group-hover:text-white transition-colors">
                      {msg.icon}
                    </div>
                  </div>
                  <h4 className="text-2xl font-black mb-4 text-blue-950 italic">{msg.title}</h4>
                  <p className="text-gray-700 font-bold leading-relaxed">{msg.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Situations Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          {/* Abstract Texture Background to avoid wrong architecture */}
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                {/* Updated Image: Aerial View of Gaborone Neighborhoods */}
                <img 
                  src="https://www.dropbox.com/scl/fi/goplbnzrix18f144cpdkd/Gaborone-Botswana-Aerial-2-edited.jpg?rlkey=ux06hixf6rqj29pfk9lfiocli&st=pryi50i5&raw=1" 
                  alt="Aerial view of Gaborone neighborhoods" 
                  className="rounded-[3rem] shadow-2xl h-[500px] w-full object-cover border-4 border-white/10"
                />
                <div className="absolute -bottom-10 -right-10 bg-green-600 p-8 rounded-[2rem] shadow-2xl hidden md:block border-4 border-slate-900">
                  <p className="text-3xl font-black italic">AS-IS SALE</p>
                  <p className="font-bold text-green-100 tracking-wider">NO REPAIRS NEEDED</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black mb-8 italic leading-tight">Local Solutions for Every Situation</h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed font-bold">
                We specialize in solving complex property situations. Whether you've inherited a property, are facing financial hurdles, or just need to liquidate assets in Gaborone fast—we help you move on with cash in your pocket.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Inherited Properties",
                  "Job Relocation",
                  "Financial Distress",
                  "Problematic Tenants",
                  "Divorce Split",
                  "Empty Vacant Plots"
                ].map((item) => (
                  <li key={item} className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl border border-white/10">
                    <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                    <span className="font-black text-lg tracking-tight uppercase">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12">
                <Link to="/sell" className="inline-block bg-white text-blue-950 px-12 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 transition shadow-2xl">
                  Get Your Cash Offer Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-24 bg-green-600">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-10 italic tracking-tighter leading-tight">
            Stop Stressing. Start Selling for Cash Today.
          </h2>
          <p className="text-2xl text-green-50 mb-12 font-black tracking-wide uppercase">
            No agents. No fees. Just a fair Gaborone cash deal.
          </p>
          <Link to="/sell" className="bg-white text-green-700 px-16 py-7 rounded-full font-black text-3xl hover:bg-gray-100 transition shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1 inline-block">
            Contact Us Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
