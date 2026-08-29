import React, { useState } from 'react';
import AudioRecorder from './components/AudioRecorder';
import BeneficiaryDashboard from './components/BeneficiaryDashboard';
import './index.css';

function App() {
  const [profile, setProfile] = useState({});

  return (
    <div className="min-h-screen bg-gray-100 flex p-6 gap-6">
      {/* Left Pane: Voice Assistant */}
      <div className="w-1/3 flex flex-col justify-center">
        <AudioRecorder onProfileUpdate={setProfile} />
      </div>
      
      {/* Right Pane: Beneficiary Assessment Dashboard */}
      <div className="w-2/3">
        <BeneficiaryDashboard profile={profile} />
      </div>
    </div>
  );
}

export default App;
