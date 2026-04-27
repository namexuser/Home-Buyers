
import React from 'react';
import { Home, Zap, ShieldCheck, Clock, MapPin, Wallet } from 'lucide-react';

export const BUSINESS_NAME = "Home Buyers";
export const LOCATION = "Gaborone, Botswana";
export const CONTACT_PHONE = "+267 74 688 666";
export const CONTACT_WHATSAPP = "+267 74 688 666";
export const CONTACT_PHONE_SECONDARY = "+267 75 724 018";
export const CONTACT_EMAIL = "info@homebuyers.co.bw";
export const DOMAIN_SUGGESTION = "homebuyers.co.bw";

export const SERVICE_AREAS = [
  "The Village",
  "Maruapula",
  "Broadhurst",
  "Phakalane",
  "Gaborone North",
  "Kgale",
  "CBD",
  "Phases 1, 2, 4",
  "Blocks 6, 7, 8",
  "Extensions 9, 11, 12, 2"
];

export const CORE_MESSAGES = [
  {
    title: "Fast, Fair Cash Offers",
    desc: "Get a no-obligation all-cash offer within 48 hours – honest and based on true Gaborone market value. Fast cash payment.",
    icon: <Zap className="w-8 h-8 text-blue-600" />
  },
  {
    title: "Sell As-Is, Any Condition",
    desc: "We buy houses, multifamilies, flats, plots, or commercial buildings in any state. No repairs, cleaning, or renovations needed.",
    icon: <Home className="w-8 h-8 text-green-600" />
  },
  {
    title: "Zero Fees or Hassles",
    desc: "No agent commissions, legal fees, or hidden surprises. A 100% free service ensuring you keep more cash.",
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />
  },
  {
    title: "Quick, Flexible Closings",
    desc: "Close in as little as 21 days or on your timeline. No bank financing delays, just a seamless transition.",
    icon: <Clock className="w-8 h-8 text-green-600" />
  }
];
