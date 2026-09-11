import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Loader2 } from 'lucide-react';

export default function VoiceInput({ label, value, onChangeText, fieldName, placeholder, multiline }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const speakPrompt = (e) => {
    e.preventDefault();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Please enter your ${label}.`);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRecording = (e) => {
    e.preventDefault();
    setIsRecording(true);
  };

  const stopRecording = (e) => {
    e.preventDefault();
    setIsRecording(false);
    setIsProcessing(true);
    
    // Simulate network/transcription delay
    setTimeout(() => {
      mockTranscribeAudio();
    }, 1500);
  };

  const mockTranscribeAudio = () => {
    const mockResponses = {
      phone: '9876543210',
      otp: '1234',
      name: 'Rituraj Jha',
      age: '24',
      gender: 'Male',
      disability: 'None',
      primary_skill: 'Tailoring',
      field_of_interest: 'Fashion Design',
      description: 'I want to learn how to design modern clothes and start my own boutique.'
    };
    
    const text = mockResponses[fieldName.toLowerCase()] || 'Sample voice input';
    onChangeText(text);
    setIsProcessing(false);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-900 mb-2">{label}</label>
      <div className="flex items-start gap-3">
        {multiline ? (
          <textarea
            className="flex-1 w-full border border-gray-300 p-3 min-h-[120px] focus:outline-none focus:border-black focus:ring-1 focus:ring-black rounded-none resize-y"
            value={value}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder={placeholder || `Enter ${label}`}
          />
        ) : (
          <input
            type="text"
            className="flex-1 w-full border border-gray-300 p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black rounded-none"
            value={value}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder={placeholder || `Enter ${label}`}
          />
        )}
        
        <div className="flex gap-2 shrink-0">
          <button
            onClick={speakPrompt}
            className="w-12 h-12 flex items-center justify-center border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors"
            title="Read out loud"
          >
            <Volume2 className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            className={`w-12 h-12 flex items-center justify-center border transition-colors ${
              isRecording 
                ? 'border-red-500 bg-red-50 hover:bg-red-100 text-red-600' 
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
            title={isRecording ? "Stop recording" : "Start recording"}
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isRecording ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
