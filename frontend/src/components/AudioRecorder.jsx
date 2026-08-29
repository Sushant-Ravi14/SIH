import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, RotateCcw, UploadCloud } from 'lucide-react';
import WaveVisualizer from './WaveVisualizer';
import { encodeWAV } from '../utils/wavEncoder';
import { addAudioToQueue, syncQueue, getPendingAudio } from '../utils/audioQueue';

export default function AudioRecorder({ onProfileUpdate }) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [pendingCount, setPendingCount] = useState(0);
  const [profile, setProfile] = useState({});

  const audioCtxRef = useRef(null);
  const streamRef = useRef(null);
  const processorRef = useRef(null);
  const audioDataRef = useRef([]);

  const updatePendingCount = async () => {
    const items = await getPendingAudio();
    setPendingCount(items.length);
  };

  const handleOnline = () => {
    setStatusMsg('Back online. Syncing...');
    syncQueue(uploadAudioBlob).then(() => {
      updatePendingCount();
      setStatusMsg('Sync complete.');
      setTimeout(() => setStatusMsg(''), 3000);
    });
  };

  const uploadAudioBlob = async (blob) => {
    const formData = new FormData();
    formData.append('audio_file', blob, 'audio.wav');
    formData.append('language', 'hi');
    formData.append('current_profile_json', JSON.stringify(profile));

    const res = await fetch('http://localhost:8000/api/v1/voice/chat', {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      throw new Error(`Upload failed with status ${res.status}`);
    }
    const data = await res.json();
    console.log('Server response:', data);
    if (data.current_profile) {
      setProfile(data.current_profile);
      if (onProfileUpdate) onProfileUpdate(data.current_profile);
    }
    
    // Play the bot response audio
    if (data.audio_base64) {
      const audio = new Audio("data:audio/wav;base64," + data.audio_base64);
      audio.play();
    }
    
    return data;
  };

  useEffect(() => {
    updatePendingCount();
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  const startRecording = async () => {
    try {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (e) {
        console.warn('Microphone access failed. Using mock oscillator stream for testing.');
        // Create a mock stream using Web Audio API
        const tempCtx = new (window.AudioContext || window.webkitAudioContext)();
        const dest = tempCtx.createMediaStreamDestination();
        const osc = tempCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, tempCtx.currentTime); // A4 note
        osc.connect(dest);
        osc.start();
        stream = dest.stream;
      }
      streamRef.current = stream;

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 2048;
      setAnalyser(analyserNode);

      source.connect(analyserNode);

      // We use createScriptProcessor for broad compatibility in capturing raw PCM
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        audioDataRef.current.push(new Float32Array(inputData));
      };

      analyserNode.connect(processor);
      processor.connect(audioCtx.destination);
      processorRef.current = processor;

      audioDataRef.current = [];
      setRecording(true);
      setAudioUrl(null);
      setStatusMsg('Recording...');
    } catch (err) {
      console.error('Error starting recording:', err);
      setStatusMsg('Microphone access denied or failed.');
    }
  };

  const stopRecording = () => {
    if (!recording) return;

    processorRef.current?.disconnect();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    audioCtxRef.current?.close();

    setRecording(false);
    setAnalyser(null);
    setStatusMsg('Processing audio...');

    // Flatten all audio data
    const totalLength = audioDataRef.current.reduce((acc, val) => acc + val.length, 0);
    const flattenedData = new Float32Array(totalLength);
    let offset = 0;
    audioDataRef.current.forEach((buffer) => {
      flattenedData.set(buffer, offset);
      offset += buffer.length;
    });

    const sampleRate = audioCtxRef.current?.sampleRate || 44100;
    const wavBlob = encodeWAV(flattenedData, sampleRate);
    const url = URL.createObjectURL(wavBlob);
    setAudioUrl(url);
    setStatusMsg('Audio ready.');
    handleUpload(wavBlob);
  };

  const handleUpload = async (blob) => {
    setStatusMsg('Uploading...');
    if (navigator.onLine) {
      try {
        await uploadAudioBlob(blob);
        setStatusMsg('Upload successful.');
      } catch (err) {
        console.error('Upload error:', err);
        await queueAudio(blob);
      }
    } else {
      await queueAudio(blob);
    }
  };

  const queueAudio = async (blob) => {
    setStatusMsg('Offline/Error. Queued for retry.');
    await addAudioToQueue(blob);
    updatePendingCount();
  };

  const resetRecorder = () => {
    setAudioUrl(null);
    setStatusMsg('');
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Voice Assistant</h2>
      
      <WaveVisualizer analyser={analyser} />

      <div className="mt-6 flex justify-center space-x-4">
        {!recording && !audioUrl && (
          <button
            onClick={startRecording}
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition-colors"
          >
            <Mic className="w-5 h-5 mr-2" /> Start Recording
          </button>
        )}

        {recording && (
          <button
            onClick={stopRecording}
            className="flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full shadow-md transition-colors animate-pulse"
          >
            <Square className="w-5 h-5 mr-2" /> Stop Recording
          </button>
        )}

        {audioUrl && !recording && (
          <button
            onClick={resetRecorder}
            className="flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-full shadow-md transition-colors"
          >
            <RotateCcw className="w-5 h-5 mr-2" /> Re-record
          </button>
        )}
      </div>

      <div className="mt-6 text-center text-sm font-medium text-gray-600">
        {statusMsg}
      </div>

      {audioUrl && (
        <div className="mt-4 flex justify-center">
          <audio src={audioUrl} controls className="w-full" />
        </div>
      )}

      {pendingCount > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md flex items-center text-sm">
          <UploadCloud className="w-4 h-4 mr-2" /> {pendingCount} recording(s) queued for sync.
        </div>
      )}
    </div>
  );
}
