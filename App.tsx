
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
// Added MapPin to the imports to resolve the reference error in the Footer
import { Phone, Mail, MessageSquare, Menu, X, Instagram, Facebook, MapPin } from 'lucide-react';
import HomeContent from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import SellYourProperty from './pages/SellYourProperty';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import SellersGuide from './pages/SellersGuide';
import EvaluatorApp from './pages/evaluator/EvaluatorApp';
import { BUSINESS_NAME, CONTACT_PHONE, SERVICE_AREAS } from './constants';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Sell Your Property', path: '/sell' },
    { name: 'Seller\'s Guide', path: '/guide' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HB</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-blue-900">{BUSINESS_NAME}</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-blue-600 ${
                  location.pathname === link.path ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/sell" className="bg-green-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-green-700 transition shadow-lg shadow-green-200">
              Get Offer
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-gray-700 hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/sell"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-blue-600 text-white py-3 rounded-xl font-bold"
          >
            Get My Cash Offer
          </Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold">HB</span>
            </div>
            <span className="text-xl font-bold tracking-tight">{BUSINESS_NAME}</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Gaborone's trusted cash property buyers. We offer fast, fair, and stress-free solutions for homeowners and property sellers across Gaborone.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="text-slate-400 hover:text-white"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-white"><MessageSquare className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-lg">Gaborone Service Areas</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm text-slate-400">
            {SERVICE_AREAS.map(area => <li key={area}>{area}</li>)}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
            <li><Link to="/guide" className="hover:text-white">Seller's Guide</Link></li>
            <li><Link to="/sell" className="hover:text-white">Sell Your Property</Link></li>
            <li><Link to="/faq" className="hover:text-white">Common Questions</Link></li>
            <li><Link to="/about" className="hover:text-white">Our Story</Link></li>
            <li><Link to="/evaluator" className="hover:text-white">Evaluator Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Contact Us</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-green-400" />
              <span>{CONTACT_PHONE}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>info@homebuyers.co.bw</span>
            </li>
            <li className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>Gaborone CBD, Botswana</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
        <p className="mb-2">&copy; {new Date().getFullYear()} {BUSINESS_NAME}. All Rights Reserved.</p>
        <p className="max-w-2xl mx-auto">
          Disclaimer: We are professional cash property buyers, not licensed real estate agents. 
          All transactions are conducted ethically and compliant with the Botswana Deeds Registry and local laws.
        </p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/sell" element={<SellYourProperty />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/guide" element={<SellersGuide />} />
            <Route path="/evaluator/*" element={<EvaluatorApp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
