import React, { useId } from 'react';
import { X, Printer, Award, CheckCircle, ShieldCheck } from 'lucide-react';
import mainLogo from '../assets/2-logo.png';
import pmajayLogo from '../assets/PM-AJAY.png';

export default function BeneficiaryReportModal({ profile, onClose }) {
  const generatedId = useId().replace(/:/g, '');
  const cardId = `PMAJAY-BEN-${generatedId.slice(0, 6).toUpperCase() || '784192'}`;
  
  if (!profile) return null;

  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 relative">
        {/* Subtle Tricolor Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-white to-emerald-600 rounded-t-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with dual logos */}
        <div className="text-center pb-4 border-b border-slate-100">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-200 shadow-2xs flex items-center justify-center">
              <img src={mainLogo} alt="Main Logo" className="w-full h-full object-contain" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-200 shadow-2xs flex items-center justify-center">
              <img src={pmajayLogo} alt="PM-AJAY Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <h2 className="text-base font-extrabold text-slate-900">
            PRADHAN MANTRI ANUSUCHIT JAATI ABHYUDAY YOJANA (PM-AJAY)
          </h2>
          <p className="text-xs text-slate-500">
            Ministry of Social Justice and Empowerment, Government of India
          </p>
          <div className="inline-block mt-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold border border-emerald-200">
            Beneficiary Skill Profiling & Recommendation Dossier
          </div>
        </div>

        {/* Profile Card */}
        <div className="mt-4 p-5 rounded-3xl bg-[#f8faf9] border border-slate-200/80 space-y-3.5">
          <div className="flex justify-between items-center text-xs pb-2.5 border-b border-slate-200">
            <span className="text-slate-500 font-mono">Dossier ID: <strong className="text-slate-800">{cardId}</strong></span>
            <span className="text-slate-500">Date: <strong className="text-slate-800">{dateStr}</strong></span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
            <div>
              <span className="text-slate-500">Qualification:</span>
              <div className="font-bold text-slate-900 mt-0.5">{profile.education_level || '10th Grade'}</div>
            </div>
            <div>
              <span className="text-slate-500">Traditional Skill / Trade:</span>
              <div className="font-bold text-slate-900 mt-0.5">{profile.traditional_trade || 'Tailoring'}</div>
            </div>
            <div>
              <span className="text-slate-500">Current Occupation:</span>
              <div className="font-bold text-slate-900 mt-0.5">{profile.current_livelihood || 'Garment Helper'}</div>
            </div>
            <div>
              <span className="text-slate-500">Mobility:</span>
              <div className="font-bold text-slate-900 mt-0.5">{profile.mobility_km ? `${profile.mobility_km} km` : '10 km'}</div>
            </div>
            <div>
              <span className="text-slate-500">Preference:</span>
              <div className="font-bold text-emerald-800 mt-0.5">{profile.preference || 'Wage Employment'}</div>
            </div>
            <div>
              <span className="text-slate-500">DBT Bank Status:</span>
              <div className="font-bold text-emerald-800 mt-0.5 flex items-center">
                <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Active Aadhaar Linked
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700">
            <div className="font-bold text-orange-700 mb-1 flex items-center">
              <Award className="w-4 h-4 mr-1 text-orange-600" /> Entitlements & Subsidies Under PM-AJAY:
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
              <li>Free NSQF Level 3/4 Certified Training with attendance-linked ₹1,500/month DBT stipend.</li>
              <li>Free specialized tool kit upon successful completion of assessment.</li>
              <li>50% project capital subsidy (up to ₹50,000) for individual self-employment setups.</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="clay-btn clay-btn-saffron flex items-center space-x-1.5 px-6 py-2 text-xs font-bold transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>
    </div>
  );
}
