
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, CheckCircle2, Mail, Loader2, ArrowRight } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { send } from '@emailjs/browser';
import { BUSINESS_NAME } from '../constants';

// --- CONFIGURATION ---
const EMAILJS_SERVICE_ID = 'service_jj5dvrs';
const EMAILJS_TEMPLATE_ID = 'template_nj8v0zu';
const EMAILJS_PUBLIC_KEY = 'hQGcm7ZPkADBksHoW';

const SellersGuide: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const generatePDF = () => {
    // Create landscape A4 PDF (297mm x 210mm)
    const doc = new jsPDF({ orientation: 'landscape', format: 'a4', unit: 'mm' });
    
    // --- STYLING CONSTANTS ---
    const colors = {
      bluePrimary: [30, 58, 138],   // #1e3a8a (Deep Blue)
      blueLight: [219, 234, 254],     // #dbeafe (Light Blue Box)
      blueMedium: [147, 197, 253],    // #93c5fd (Medium Blue)
      textDark: [15, 23, 42],         // #0f172a (Slate 900)
      white: [255, 255, 255],
      greyLight: [241, 245, 249]      // #f1f5f9
    };
    
    const pWidth = 297;
    const pHeight = 210;
    const margin = 15;

    // Helper to add new page
    const addNewPage = () => doc.addPage();

    // Helper to set color
    const setFill = (c: number[]) => doc.setFillColor(c[0], c[1], c[2]);
    const setText = (c: number[]) => doc.setTextColor(c[0], c[1], c[2]);

    // --- PAGE 1: COVER ---
    setFill(colors.bluePrimary);
    doc.rect(0, 0, pWidth * 0.6, pHeight, 'F'); // Left blue panel
    
    setText(colors.white);
    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');
    doc.text("The Gaborone Seller's", 20, 80);
    doc.text("Guide", 20, 95);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text("Discover the Secret to a Fast, Stress-Free Property Sale in", 20, 115);
    doc.text("Gaborone", 20, 122);

    doc.text("Early 2026", 20, 180);

    // Right side placeholder (Grey/White)
    setFill(colors.greyLight);
    doc.rect(pWidth * 0.6, 0, pWidth * 0.4, pHeight, 'F'); 

    // --- PAGE 2: DISCLAIMER ---
    addNewPage();
    setText(colors.bluePrimary);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text("Important Disclaimer", margin, 30);

    // Box 1
    setFill(colors.blueLight);
    doc.rect(margin, 50, 125, 100, 'F');
    setText(colors.bluePrimary);
    doc.setFontSize(16);
    doc.text("General Information Only", margin + 10, 65);
    setText(colors.textDark);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const disc1 = "This document provides general information only and is not legal, tax, financial, or professional advice. Laws and rates are current as of early 2026 but subject to change.";
    doc.text(doc.splitTextToSize(disc1, 105), margin + 10, 80);

    // Box 2
    setFill(colors.blueLight);
    doc.rect(155, 50, 125, 100, 'F');
    setText(colors.bluePrimary);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text("Consult Qualified Professionals", 165, 65);
    setText(colors.textDark);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const disc2 = "Consult a qualified conveyancer, attorney, real estate agent, and tax advisor (via BURS at burs.org.bw) for your specific transaction.";
    doc.text(doc.splitTextToSize(disc2, 105), 165, 80);

    // --- PAGE 3: CONTENTS ---
    addNewPage();
    setText(colors.bluePrimary);
    doc.setFontSize(40);
    doc.setFont('helvetica', 'bold');
    doc.text("Contents", margin, 100);

    const contents = [
      { id: "01", title: "Overview of Selling", desc: "Understanding the property sale process and legal requirements in Gaborone." },
      { id: "02", title: "Cash vs Traditional", desc: "Comparing cash sales advantages with traditional financed property transactions." },
      { id: "03", title: "Fast Sale Process", desc: "Steps for achieving 21 day closings and understanding realistic timelines." },
      { id: "04", title: "Taxes and Incentives", desc: "Capital gains tax exemptions, transfer duty rates, and SEZ incentives." }
    ];

    let cY = 30;
    contents.forEach(item => {
      setText(colors.bluePrimary);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`${item.id}. ${item.title}`, 100, cY);
      setText(colors.textDark);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(doc.splitTextToSize(item.desc, 170), 100, cY + 7);
      cY += 35;
    });

    // --- PAGE 4: PART 1 TITLE ---
    addNewPage();
    setText(colors.bluePrimary);
    doc.setFontSize(30);
    doc.setFont('helvetica', 'bold');
    doc.text("Part 1: Property Sale Process", margin, 100);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text("Legal Framework and Requirements in Gaborone", margin, 115);

    // --- PAGE 5: OVERVIEW ---
    addNewPage();
    setText(colors.bluePrimary);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("Overview of Selling Property in Gaborone", margin, 25);

    const steps = [
      "1. Verifying title: Deeds Registry search for encumbrances.",
      "2. Obtaining clearances: Rates clearance, BURS compliance.",
      "3. Marketing and securing a buyer: Advertising, negotiating.",
      "4. Signing a formal Agreement of Sale: Deed of sale.",
      "5. Appointing a conveyancer: Seller chooses conveyancer.",
      "6. Buyer paying purchase price: Price + transfer duty.",
      "7. Registration at Deeds Registry: Transfer completion."
    ];
    let sY = 45;
    steps.forEach((step) => {
        setFill(colors.blueLight);
        doc.rect(margin, sY - 6, 260, 14, 'F');
        setText(colors.textDark);
        doc.setFontSize(12);
        doc.text(step, margin + 5, sY + 3);
        sY += 20;
    });

    // --- PAGE 6: CASH VS TRADITIONAL ---
    addNewPage();
    setText(colors.bluePrimary);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("Cash Sales vs. Traditional Sales", margin, 25);

    // Left Col (Traditional)
    doc.setFontSize(14);
    doc.text("Traditional Sales", margin, 45);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    setText(colors.textDark);
    const tradPoints = [
      "• Buyer secures mortgage approval",
      "• Bond registration delays",
      "• High risk of deal collapse",
      "• Timeline: 2-6+ months",
      "• Seller pays agent commission (~7.5%)",
      "• Conveyancing fees apply"
    ];
    let tY = 60;
    tradPoints.forEach(p => { doc.text(p, margin, tY); tY+=12; });

    // Right Col (Cash)
    setText(colors.bluePrimary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text("Cash Sales", 150, 45);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    setText(colors.textDark);
    const cashPoints = [
      "• No financing delays",
      "• No bond registration",
      "• Faster and more certain",
      "• Can close in 21 days",
      "• 'As-is' sales common",
      "• Seller avoids agent commission"
    ];
    tY = 60;
    cashPoints.forEach(p => { doc.text(p, 150, tY); tY+=12; });

    // --- PAGE 7: ADVANTAGES ---
    addNewPage();
    setText(colors.bluePrimary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text("Advantages of Cash Sales in Gaborone", margin, 25);

    const advs = [
        {t: "Speed and Certainty", d: "Cash sales eliminate financing delays and provide transaction certainty without mortgage approval contingencies."},
        {t: "Reduced Stress", d: "Fewer contingencies mean lower stress from complications, with simpler documentation and faster closing."},
        {t: "Flexible Terms", d: "Higher acceptance of 'as-is' terms, allowing quick sales without extensive repairs."}
    ];

    let advX = margin;
    advs.forEach(a => {
        setFill(colors.blueLight);
        doc.rect(advX, 40, 85, 120, 'F');
        setText(colors.bluePrimary);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(a.t, advX + 5, 60);
        setText(colors.textDark);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(doc.splitTextToSize(a.d, 75), advX + 5, 80);
        advX += 90;
    });

    // --- PAGE 8: CLOSING IN 21 DAYS ---
    addNewPage();
    setText(colors.bluePrimary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text("Closing in 21 Days: Realism Check", margin, 25);
    doc.setFontSize(14);
    doc.text("Achievable in cash sales with:", margin, 38);
    
    // 3 boxes
    const c21 = [
        "Pre-cleared title, rates, and BURS compliance",
        "Efficient conveyancer and motivated buyer",
        "Quick agreement signing and deposit into trust"
    ];
    let cX = margin;
    c21.forEach((c, i) => {
        setFill(colors.blueLight);
        doc.rect(cX, 45, 85, 30, 'F');
        setText(colors.bluePrimary);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text((i+1).toString(), cX + 5, 65);
        setText(colors.textDark);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(doc.splitTextToSize(c, 70), cX + 15, 55);
        cX += 90;
    });

    // Reality box
    setFill(colors.blueLight);
    doc.rect(margin, 90, 265, 40, 'F');
    setText(colors.bluePrimary);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("Practical Reality", margin + 5, 105);
    setText(colors.textDark);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text("Practical minimum often 21 days due to registry lodgment. Urgent cases may use interim possession.", margin + 5, 115);

    // --- PAGE 9: FEES ---
    addNewPage();
    setText(colors.bluePrimary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text("Fees and Commissions", margin, 25);

    const fees = [
        {t: "Real Estate Agent", d: "Seller-paid; negotiable or avoidable in direct sales."},
        {t: "Conveyancing Fees", d: "Scaled per regulations (Deeds Registry Fees)."},
        {t: "Deeds Registry", d: "Lodgment and registration costs."},
        {t: "Taxes", d: "Seller: CGT. Buyer: Transfer Duty."}
    ];

    let fX = margin;
    fees.forEach(f => {
        setFill(colors.blueLight);
        doc.rect(fX, 40, 60, 100, 'F');
        setText(colors.bluePrimary);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(doc.splitTextToSize(f.t, 50), fX + 5, 55);
        setText(colors.textDark);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(doc.splitTextToSize(f.d, 50), fX + 5, 85);
        fX += 67;
    });

    // --- PAGE 10: AS-IS ---
    addNewPage();
    setText(colors.bluePrimary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text("Selling 'As-Is' in Gaborone", margin, 25);

    const asis = [
        {t: "Disclosure", d: "Seller must disclose known defects to avoid misrepresentation."},
        {t: "Buyer Risks", d: "Buyer assumes risks after due diligence."},
        {t: "Explicit Clause", d: "Include 'as-is' clause in Agreement of Sale."},
        {t: "Benefits", d: "Speed and price benefits for both parties."}
    ];
    fX = margin;
    asis.forEach(f => {
        setFill(colors.blueLight);
        doc.rect(fX, 40, 60, 100, 'F');
        setText(colors.bluePrimary);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(doc.splitTextToSize(f.t, 50), fX + 5, 55);
        setText(colors.textDark);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(doc.splitTextToSize(f.d, 50), fX + 5, 85);
        fX += 67;
    });

    // --- PAGE 11: STEPS ---
    addNewPage();
    setText(colors.bluePrimary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text("Steps for a Fast Cash Sale", margin, 25);

    const stepList = [
        "1. Verify title & clearances",
        "2. Professional valuation (optional)",
        "3. Find cash buyer",
        "4. Negotiate & sign Agreement",
        "5. Appoint conveyancer",
        "6. Buyer pays into trust",
        "7. Conveyancer lodges transfer",
        "8. Registration completes"
    ];

    let stY = 45;
    stepList.forEach(s => {
       setFill(colors.blueLight);
       doc.circle(margin + 5, stY - 2, 2, 'F');
       setText(colors.textDark);
       doc.setFontSize(14);
       doc.text(s, margin + 15, stY);
       stY += 15;
    });
    
    // Pitfalls box
    setFill(colors.blueLight);
    doc.rect(margin, 170, 260, 25, 'F');
    setText(colors.bluePrimary);
    doc.setFontSize(12);
    doc.text("Pitfalls to Avoid: Undisclosed encumbrances, tax non-compliance.", margin + 5, 185);

    // --- PAGE 12: CGT ---
    addNewPage();
    setText(colors.bluePrimary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text("Capital Gains Tax (CGT)", margin, 25);
    
    const cgt = [
        {t: "PPR Exemption", d: "Gain on main home often exempt."},
        {t: "Rollover Relief", d: "Reinvest in residential property within 24 months."},
        {t: "No Gain = No Tax", d: "If there is no capital gain, no CGT arises."},
        {t: "Calculation", d: "Gain = Price - (Cost + Improvements + Expenses)."}
    ];
    fX = margin;
    cgt.forEach(f => {
        setFill(colors.blueLight);
        doc.rect(fX, 40, 60, 100, 'F');
        setText(colors.bluePrimary);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(doc.splitTextToSize(f.t, 50), fX + 5, 55);
        setText(colors.textDark);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(doc.splitTextToSize(f.d, 50), fX + 5, 85);
        fX += 67;
    });

    // --- PAGE 13: TRANSFER DUTY ---
    addNewPage();
    setText(colors.bluePrimary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text("Transfer Duty (Buyer-Paid) - 2026 Rates", margin, 25);

    // Table Header
    setFill(colors.bluePrimary);
    doc.rect(margin, 40, 260, 12, 'F');
    setText(colors.white);
    doc.setFontSize(12);
    doc.text("Category", margin + 5, 48);
    doc.text("Rate Structure", 100, 48);
    doc.text("Details", 200, 48);

    // Rows
    const rows = [
        {c: "Citizens", r: "5% > BWP 1.5m", d: "Exempt on first BWP 1.5 million"},
        {c: "Non-citizens", r: "10% up to 2m, 15% > 2m", d: "Progressive rates"},
        {c: "SEZ", r: "Full Waiver", d: "For licensed SEZ entities"}
    ];
    
    let rY = 52;
    setText(colors.textDark);
    doc.setFont('helvetica', 'normal');
    rows.forEach((r, i) => {
        if (i%2===0) { setFill(colors.greyLight); doc.rect(margin, rY, 260, 12, 'F'); }
        doc.text(r.c, margin + 5, rY + 8);
        doc.text(r.r, 100, rY + 8);
        doc.text(r.d, 200, rY + 8);
        rY += 12;
    });

    // --- PAGE 14: SEZ ---
    addNewPage();
    setText(colors.bluePrimary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text("Special Economic Zones (SEZ) Incentives", margin, 25);

    const sez = [
        {t: "Corporate Tax", d: "5% for first 10 years; 10% thereafter."},
        {t: "Transfer Duty", d: "Full waiver on acquiring land for SEZ business."},
        {t: "Property Tax", d: "Exemption for first 5 years."}
    ];
    fX = margin;
    sez.forEach(f => {
        setFill(colors.blueLight);
        doc.rect(fX, 40, 80, 80, 'F');
        setText(colors.bluePrimary);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(doc.splitTextToSize(f.t, 70), fX + 5, 55);
        setText(colors.textDark);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(doc.splitTextToSize(f.d, 70), fX + 5, 75);
        fX += 90;
    });

    // --- PAGE 15: THANK YOU ---
    addNewPage();
    setFill(colors.blueMedium); 
    doc.rect(0, 0, pWidth, pHeight, 'F');
    
    setText(colors.white);
    doc.setFontSize(40);
    doc.setFont('helvetica', 'bold');
    doc.text("Thank You", pWidth/2, pHeight/2 - 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text("For specific transaction advice, consult qualified professionals.", pWidth/2, pHeight/2 + 10, { align: 'center' });
    doc.text("BURS at burs.org.bw", pWidth/2, pHeight/2 + 20, { align: 'center' });

    doc.save('The-Gaborone-Sellers-Guide-2026.pdf');
  };

  const handleDownloadRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send the email with the lead's address
      await send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: 'Guide Downloader',
          from_email: email,
          message: `User downloaded the Seller's Guide. Email: ${email}`,
          phone: 'N/A (Guide Download)',
          property_address: 'N/A (Guide Download)',
          property_type: 'N/A',
          condition: 'N/A',
          situation: 'Downloaded PDF Guide'
        },
        EMAILJS_PUBLIC_KEY
      );
      console.log(`Lead Captured: ${email}`);
    } catch (error) {
      console.error("EmailJS Error:", error);
    }

    generatePDF();
    setIsSubmitting(false);
    setIsDownloaded(true);
  };

  return (
    <div className="py-20 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column: Promotion */}
            <div className="bg-blue-900 p-10 md:p-16 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <div className="mb-8 bg-blue-800/50 p-4 rounded-2xl w-fit">
                  <BookOpen className="w-12 h-12 text-green-400" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-6 italic leading-tight tracking-tighter">
                  The Gaborone Seller's Guide
                </h1>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed font-bold">
                  Discover the secret to a fast, stress-free property sale in Gaborone. Our expert guide covers everything you need to know about selling for cash.
                </p>
                <ul className="space-y-4">
                  {[
                    "Cash vs Traditional Sales",
                    "Closing in 21 Days",
                    "No Fees or Commissions",
                    "Selling 'As-Is' in Gaborone"
                  ].map(item => (
                    <li key={item} className="flex items-center space-x-3 text-sm font-extrabold uppercase tracking-wide">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Dark Mode Form for High Contrast */}
            <div className="p-10 md:p-16 bg-slate-950 flex flex-col justify-center">
              {!isDownloaded ? (
                <>
                  <h2 className="text-3xl font-black text-white mb-4 italic leading-tight">Free Download</h2>
                  <p className="text-gray-300 mb-10 font-bold text-lg">
                    Enter your email to receive your copy of the guide instantly.
                  </p>
                  
                  <form onSubmit={handleDownloadRequest} className="space-y-8">
                    <div>
                      <label className="block text-sm font-black text-blue-400 mb-3 uppercase tracking-widest">
                        <Mail className="w-4 h-4 inline mr-2" /> Email Address
                      </label>
                      <input 
                        required 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full bg-slate-900 px-6 py-5 rounded-2xl border border-slate-800 focus:ring-4 focus:ring-blue-600 outline-none transition text-white font-black text-xl placeholder:text-gray-600" 
                      />
                    </div>
                    <button 
                      disabled={isSubmitting}
                      type="submit" 
                      className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-700 transition shadow-2xl flex items-center justify-center disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin mr-3 w-7 h-7" /> Preparing...
                        </>
                      ) : (
                        <>
                          Download PDF Guide <Download className="ml-3 w-7 h-7" />
                        </>
                      )}
                    </button>
                    <p className="text-xs text-center text-gray-500 font-extrabold italic">
                      By downloading, you agree to receive property tips from {BUSINESS_NAME}. You can unsubscribe at any time.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center animate-in fade-in zoom-in duration-500">
                  <div className="mb-8 flex justify-center">
                    <div className="bg-green-600/20 p-8 rounded-full">
                      <CheckCircle2 className="w-16 h-16 text-green-500" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-black text-white mb-4 italic leading-tight">Guide Downloaded!</h2>
                  <p className="text-gray-300 mb-10 leading-relaxed font-bold text-lg">
                    Excellent! Your guide is ready. If it didn't download automatically, use the link below.
                  </p>
                  <div className="space-y-4">
                    <button 
                      onClick={generatePDF}
                      className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition border border-slate-800"
                    >
                      Click to Download Again
                    </button>
                    <Link 
                      to="/sell" 
                      className="w-full bg-green-600 text-white py-6 rounded-2xl font-black text-2xl hover:bg-green-700 transition shadow-2xl flex items-center justify-center"
                    >
                      Get Your Free Offer <ArrowRight className="ml-3 w-8 h-8" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bonus Tip Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 font-black italic text-lg">
            Selling a property in Gaborone?
            <Link to="/contact" className="ml-2 text-blue-600 font-black hover:underline underline-offset-8 decoration-4">Chat with a local expert now.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellersGuide;
