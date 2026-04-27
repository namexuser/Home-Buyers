
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQItem } from '../types';
import { CONTACT_PHONE, CONTACT_WHATSAPP } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const cleanPhone = CONTACT_PHONE.replace(/\D/g, '');
  const cleanWhatsapp = CONTACT_WHATSAPP.replace(/\D/g, '');

  const faqs: FAQItem[] = [
    {
      question: "Are you real estate agents?",
      answer: "No, we are not real estate agents. We are professional cash property buyers. We do not list your house on the open market or charge commissions. We buy the property directly from you using our own cash funds."
    },
    {
      question: "What happens after I accept the offer?",
      answer: "Once you accept our offer, we move straight into the legal phase. We work with a local Gaborone conveyancer to handle the transfer of the deed at the Deeds Registry. You choose the closing date, we sign the necessary documents, and the funds are transferred to you. It's a simple, streamlined process with no bank financing hurdles."
    },
    {
      question: "Can you handle properties with existing liens or legal issues?",
      answer: "Yes, we have significant experience handling complex situations. Whether your property has outstanding bank loans, property tax liens, or is tied up in a probate/inheritance case, we can work through it. Our team partners with local Gaborone attorneys to resolve these issues during the closing process, often using the sale proceeds to clear the debt so you walk away with the balance."
    },
    {
      question: "How do you determine the offer price?",
      answer: "We look at the location of the property in Gaborone, what repairs are needed, the current condition, and values of comparable properties recently sold nearby. We take all of this into account to come up with a fair price that works for us and you."
    },
    {
      question: "Are there any fees or commissions to work with you?",
      answer: "There are ZERO fees or commissions when you sell your property to us. We even handle the costs associated with the legal paperwork through local Gaborone conveyancers. You walk away with the full amount agreed upon."
    },
    {
      question: "How fast can you close?",
      answer: "We can close in as little as 21 days, or on whatever timeline works best for you. Since we pay cash and don't need bank financing approval, we can move much faster than a traditional buyer."
    },
    {
      question: "What if my property is in poor condition or has tenants?",
      answer: "We buy houses 'as-is'. You don't need to do any repairs, cleaning, or even remove unwanted items. If you have tenants (even problematic ones), we will still buy the property and handle the management ourselves."
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-blue-950 mb-4 italic leading-tight">Common Questions</h1>
          <p className="text-xl text-gray-700 font-medium">Everything you need to know about selling your property to us.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all bg-white">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
              >
                <span className="text-lg font-bold text-blue-950">{faq.question}</span>
                {openIndex === idx ? <Minus className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-gray-400" />}
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-gray-100 pt-4 font-medium">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-gray-50 p-12 rounded-3xl border border-gray-200">
          <h2 className="text-2xl font-bold text-blue-950 mb-4">Have more questions?</h2>
          <p className="text-gray-700 mb-8 font-medium">We're here to help. Reach out to us via phone, WhatsApp, or email.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`tel:${cleanPhone}`} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">Call Us Now</a>
            <a href={`https://wa.me/${cleanWhatsapp}`} className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg">WhatsApp Us</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
