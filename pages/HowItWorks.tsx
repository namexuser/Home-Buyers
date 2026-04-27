
import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Eye, FileCheck, Landmark } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "Quick Contact & Evaluation",
      desc: "Fill out our 2-minute form or call/WhatsApp 24/7. We'll research your property and schedule a free, no-pressure site visit. No cleaning or repairs needed.",
      icon: <PhoneCall className="w-12 h-12 text-blue-600" />
    },
    {
      title: "No-Obligation Cash Offer",
      desc: "Receive your fair all-cash offer within 48 hours of our visit. We provide a transparent breakdown so you know exactly how we calculated it.",
      icon: <Eye className="w-12 h-12 text-green-600" />
    },
    {
      title: "Flexible Closing Process",
      desc: "Choose your own closing date—from as little as 21 days to several months out. We handle all paperwork through a trusted local Gaborone conveyancer.",
      icon: <FileCheck className="w-12 h-12 text-blue-600" />
    },
    {
      title: "Get Paid Fast",
      desc: "Get paid via bank transfer or cheque immediately upon closing. You walk away with the full amount — no deductions, no fees, no commissions.",
      icon: <Landmark className="w-12 h-12 text-green-600" />
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-6">How It Works</h1>
          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            Selling your Gaborone property doesn't have to be complicated. Our 4-step process is designed for speed, fairness, and complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex items-start space-x-6">
              <div className={`shrink-0 p-4 rounded-2xl ${idx % 2 === 0 ? 'bg-green-50' : 'bg-blue-50'}`}>
                {step.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-950 mb-4">{idx + 1}. {step.title}</h3>
                <p className="text-gray-700 leading-relaxed font-medium">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-900 text-white p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-3xl font-black mb-4">Ready for your cash offer?</h2>
            <p className="text-blue-100 text-lg font-medium">
              It only takes 2 minutes to get started. No strings attached, no pressure, just a fair solution for your Gaborone property.
            </p>
          </div>
          <Link to="/sell" className="bg-green-500 text-white px-10 py-5 rounded-full font-black text-xl hover:bg-green-600 transition shadow-xl whitespace-nowrap">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
