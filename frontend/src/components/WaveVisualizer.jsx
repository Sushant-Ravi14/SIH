import React, { useRef, useEffect } from 'react';

export default function WaveVisualizer({ analyser, isRecording, isPlaying }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasCtx = canvas.getContext('2d');
    let animationId;
    let phase = 0;

    const render = () => {
      animationId = requestAnimationFrame(render);
      const width = canvas.width;
      const height = canvas.height;

      // Soft natural off-white background
      canvasCtx.fillStyle = '#f8faf9';
      canvasCtx.fillRect(0, 0, width, height);

      // Subtle horizontal baseline
      canvasCtx.strokeStyle = '#e2e8f0';
      canvasCtx.lineWidth = 1;
      canvasCtx.beginPath();
      canvasCtx.moveTo(0, height / 2);
      canvasCtx.lineTo(width, height / 2);
      canvasCtx.stroke();

      if (analyser && isRecording) {
        // Active audio analyser visualizer
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        const barCount = 36;
        const barWidth = (width / barCount) * 0.65;
        const gap = (width - barWidth * barCount) / (barCount + 1);

        for (let i = 0; i < barCount; i++) {
          const sampleIndex = Math.floor((i / barCount) * (bufferLength / 3));
          const value = dataArray[sampleIndex] || 0;
          const percent = Math.min(1, Math.max(0.08, value / 255));
          const barHeight = percent * (height * 0.75);

          const x = gap + i * (barWidth + gap);
          const y = (height - barHeight) / 2;

          // Gradient for active bars (Saffron to Emerald)
          const barGrad = canvasCtx.createLinearGradient(0, y, 0, y + barHeight);
          barGrad.addColorStop(0, '#ea580c'); // Saffron
          barGrad.addColorStop(0.5, '#f97316'); // Warm Orange
          barGrad.addColorStop(1, '#16a34a'); // Emerald Green

          canvasCtx.fillStyle = barGrad;
          canvasCtx.beginPath();
          canvasCtx.roundRect(x, y, barWidth, barHeight, 4);
          canvasCtx.fill();
        }
      } else if (isPlaying) {
        // Audio playback waveform animation
        phase += 0.08;
        const waves = 2;
        for (let w = 0; w < waves; w++) {
          canvasCtx.beginPath();
          canvasCtx.lineWidth = 2.5;
          canvasCtx.strokeStyle = w === 0 ? '#16a34a' : '#ea580c';

          for (let x = 0; x < width; x++) {
            const freq = 0.025 + w * 0.01;
            const amp = (height / 3.5) * Math.sin(phase + w * 1.5) * Math.sin((x / width) * Math.PI);
            const y = height / 2 + Math.sin(x * freq + phase * 2 + w) * amp;
            if (x === 0) canvasCtx.moveTo(x, y);
            else canvasCtx.lineTo(x, y);
          }
          canvasCtx.stroke();
        }
      } else {
        // Ambient / Idle breathing wave
        phase += 0.03;
        canvasCtx.beginPath();
        canvasCtx.lineWidth = 1.5;
        canvasCtx.strokeStyle = '#cbd5e1';

        for (let x = 0; x < width; x++) {
          const amp = 5 * Math.sin((x / width) * Math.PI);
          const y = height / 2 + Math.sin(x * 0.03 + phase) * amp;
          if (x === 0) canvasCtx.moveTo(x, y);
          else canvasCtx.lineTo(x, y);
        }
        canvasCtx.stroke();

        // Subtle center dot
        const dotY = height / 2;
        const dotAlpha = 0.5 + 0.4 * Math.sin(phase);
        canvasCtx.fillStyle = `rgba(22, 163, 74, ${dotAlpha})`;
        canvasCtx.beginPath();
        canvasCtx.arc(width / 2, dotY, 3.5, 0, Math.PI * 2);
        canvasCtx.fill();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [analyser, isRecording, isPlaying]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-[#f8faf9] shadow-inner">
      <canvas
        ref={canvasRef}
        className="w-full h-20 block"
        width={480}
        height={80}
      />
      {/* Status Badge */}
      <div className="absolute top-2 right-2.5 flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-700 shadow-xs">
        <span className={`w-1.5 h-1.5 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
        <span>{isRecording ? 'LISTENING' : isPlaying ? 'SPEAKING' : 'READY'}</span>
      </div>
    </div>
  );
}
