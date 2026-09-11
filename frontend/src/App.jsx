import React, { useState } from 'react';
import Login from './components/Login';
import Registration from './components/Registration';
import './index.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('LOGIN'); // LOGIN, REGISTRATION, SUCCESS
  const [phone, setPhone] = useState('');

  const handleLoginSuccess = (verifiedPhone) => {
    setPhone(verifiedPhone);
    setCurrentScreen('REGISTRATION');
  };

  const handleRegistrationSuccess = () => {
    setCurrentScreen('SUCCESS');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans py-10 px-4 sm:px-6 lg:px-8">
      
      {currentScreen === 'LOGIN' && (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}

      {currentScreen === 'REGISTRATION' && (
        <Registration phone={phone} onRegistrationSuccess={handleRegistrationSuccess} />
      )}

      {currentScreen === 'SUCCESS' && (
        <div className="max-w-xl mx-auto mt-20 p-12 text-center bg-white border border-gray-200 shadow-sm">
          <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
          <h2 className="text-4xl heading-editorial mb-4">Registration Complete</h2>
          <p className="text-gray-600 mb-8">
            Thank you for registering. Your profile has been successfully submitted and stored.
          </p>
          <button 
            onClick={() => setCurrentScreen('LOGIN')}
            className="border border-black bg-transparent text-black font-semibold py-3 px-8 hover:bg-gray-100 transition-colors uppercase tracking-wider text-sm"
          >
            Return to Login
          </button>
        </div>
      )}
      
    </div>
  );
}

export default App;
