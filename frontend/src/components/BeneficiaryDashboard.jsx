import React, { useEffect, useState } from 'react';

export default function BeneficiaryDashboard({ profile }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      fetchRecommendations();
    }
  }, [profile]);

  const fetchRecommendations = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/recommendations?profile_json=${encodeURIComponent(JSON.stringify(profile))}`);
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data);
      }
    } catch (err) {
      console.error("Failed to fetch recommendations", err);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-gray-50 rounded-xl border border-gray-200 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Beneficiary Assessment Profile</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <ProfileCard title="Education" value={profile.education_level} />
        <ProfileCard title="Traditional Trade" value={profile.traditional_trade} />
        <ProfileCard title="Current Livelihood" value={profile.current_livelihood} />
        <ProfileCard title="Mobility (km)" value={profile.mobility_km} />
        <ProfileCard title="Preference" value={profile.preference} />
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Recommended NSQF Packs</h3>
      {recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="p-4 bg-white rounded-lg shadow-sm border border-green-200">
              <h4 className="font-bold text-green-700">{rec.nsqf_pack_name} (Level {rec.level})</h4>
              <p className="text-sm text-gray-600 mt-1">{rec.skill_gap_analysis}</p>
              <div className="mt-2 text-xs font-medium text-gray-500">
                Centers: {rec.local_centers.join(", ")}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 italic">No recommendations yet. Please provide more profile details.</div>
      )}
    </div>
  );
}

function ProfileCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="text-xs text-gray-500 uppercase tracking-wide">{title}</div>
      <div className={`font-semibold mt-1 ${value ? 'text-gray-800' : 'text-gray-300'}`}>
        {value || 'Not provided'}
      </div>
    </div>
  );
}
