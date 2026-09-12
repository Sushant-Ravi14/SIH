import React, { useState, useId } from 'react';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Award, 
  ShieldCheck, 
  Printer
} from 'lucide-react';

export default function EnrollmentModal({ course, profile, onClose }) {
  const [selectedCenter, setSelectedCenter] = useState(course?.local_centers?.[0]?.name || "District Kaushal Kendra");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const genId = useId().replace(/:/g, '');
  const regId = `PMAJAY-${genId.slice(0, 6).toUpperCase() || '654321'}`;

  if (!course) return null;

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

        {!isSubmitted ? (
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700 shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                  NSQF Level {course.level} • {course.sector || 'Skill Pack'}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  {course.nsqf_pack_name}
                </h3>
              </div>
            </div>

            {/* Scheme benefits banner */}
            <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] mb-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider">PM-AJAY Direct Benefits</div>
                <div className="text-xs font-bold text-emerald-900 mt-0.5">₹1,500/mo DBT Stipend + Free Tool Kit Included</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 text-xs font-bold shadow-xs">
                100% Free
              </span>
            </div>

            {/* Beneficiary Details Summary */}
            <div className="bg-[#f8faf9] rounded-2xl p-4 border border-slate-200/80 mb-4">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 mb-2 tracking-wider">
                Beneficiary Snapshot
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500">Education:</span>
                  <div className="font-bold text-slate-800">{profile.education_level || '10th Pass'}</div>
                </div>
                <div>
                  <span className="text-slate-500">Trade/Craft:</span>
                  <div className="font-bold text-slate-800">{profile.traditional_trade || 'General'}</div>
                </div>
                <div>
                  <span className="text-slate-500">Preference:</span>
                  <div className="font-bold text-slate-800">{profile.preference || 'Wage Employment'}</div>
                </div>
              </div>
            </div>

            {/* Select Nearest Training Center */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                Select Nearest PM-AJAY / PMKK Training Hub:
              </label>
              <div className="space-y-2">
                {(Array.isArray(course.local_centers) && typeof course.local_centers[0] === 'object'
                  ? course.local_centers 
                  : (course.local_centers || ["District PM-AJAY Kaushal Hub", "MSME Skill Center"]).map((c, i) => ({
                      name: typeof c === 'string' ? c : c.name,
                      distance: `${(i + 1) * 3.4} km`,
                      phone: "+91 98765 43210"
                    }))
                ).map((center, idx) => (
                  <label
                    key={idx}
                    onClick={() => setSelectedCenter(center.name)}
                    className={`flex items-start justify-between p-3.5 rounded-2xl border cursor-pointer transition ${
                      selectedCenter === center.name
                        ? 'bg-emerald-50/70 border-emerald-300 text-slate-900 ring-2 ring-emerald-300'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start space-x-2.5">
                      <input
                        type="radio"
                        name="training_center"
                        checked={selectedCenter === center.name}
                        onChange={() => setSelectedCenter(center.name)}
                        className="mt-1 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{center.name}</div>
                        <div className="text-[11px] text-slate-500 flex items-center space-x-2 mt-0.5">
                          <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-orange-600" /> {center.distance || '4.5 km away'}</span>
                          <span className="flex items-center"><Phone className="w-3 h-3 mr-1 text-slate-400" /> {center.phone || '+91 98765 43210'}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                      Open Seats
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Aadhaar & DBT Linking Assurance */}
            <div className="p-3 bg-[#f8faf9] rounded-2xl border border-slate-200 flex items-center justify-between text-xs mb-5">
              <div className="flex items-center space-x-2 text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Aadhaar e-KYC & DBT Bank Account Linked</span>
              </div>
              <span className="text-emerald-700 font-bold flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Verified
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsSubmitted(true)}
                className="clay-btn clay-btn-saffron px-6 py-2.5 text-xs font-bold cursor-pointer"
              >
                Confirm & Generate Slip
              </button>
            </div>
          </div>
        ) : (
          /* Enrollment Success Receipt */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900">
              Enrollment Confirmed!
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Your provisional enrollment under PM-AJAY has been generated.
            </p>

            {/* Printable Receipt Card */}
            <div className="mt-5 p-5 rounded-3xl bg-[#f8faf9] border border-slate-200 text-left relative">
              <div className="absolute top-0 right-0 px-3.5 py-1 bg-emerald-200 text-emerald-900 font-mono text-[11px] font-bold rounded-bl-2xl">
                ID: {regId}
              </div>

              <div className="text-xs uppercase font-bold text-orange-700 tracking-wider mb-2">
                PM-AJAY Beneficiary Acknowledgement Slip
              </div>

              <div className="space-y-2 text-xs text-slate-700 mt-3 border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Course / NSQF Pack:</span>
                  <span className="font-bold text-slate-900">{course.nsqf_pack_name} (Level {course.level})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Training Hub:</span>
                  <span className="font-bold text-slate-900 text-right max-w-xs">{selectedCenter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly DBT Stipend:</span>
                  <span className="font-bold text-emerald-700">₹1,500/month (Direct DBT)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Batch Commences:</span>
                  <span className="font-bold text-slate-900">1st of Next Month</span>
                </div>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-dashed border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Bring original Aadhaar & Bank Passbook to the training center.</span>
                <span className="text-orange-700 font-bold">Free Tool Kit Entitled</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-3">
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 transition cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Slip</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
