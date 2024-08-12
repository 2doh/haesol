import React, { useEffect, useRef } from "react";
import "../../scss/learn/audiorender.scss";

const AudioRender = ({ audioStream }) => {
  const barsRef = useRef([]);
  const barCount = 10;

  useEffect(() => {
    if (!audioStream) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(audioStream);
    source.connect(analyser);

    const bars = barsRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      bars.forEach((bar, index) => {
        if (bar && index < bufferLength) {
          const volume = dataArray[index];
          const colorValue = Math.min(volume * 2, 255);
          bar.style.backgroundColor = `rgb(${colorValue}, 100, 100 )`;
        }
      });
    };
    draw();
    return () => {
      audioContext.close();
    };
  }, [audioStream]);

  return (
    <div className="volumemeter">
      {Array.from({ length: barCount }).map((_, index) => (
        <div
          key={index}
          className="volumebar"
          ref={el => (barsRef.current[index] = el)}
        ></div>
      ))}
    </div>
  );
};

export default AudioRender;
