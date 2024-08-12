import React, { useEffect, useRef, useState } from "react";
import "../../scss/learn/audiorender.scss";
import audioContext from "utils/learn/audioContext";
import audioFrequency from "utils/learn/audioFrequency";
import styled from "@emotion/styled";

const AudioRender = ({ audioStream }) => {
  const [volume, setVolume] = useState("");
  const barCount = 10;

  // useEffect(() => {
  //   if (!audioStream) return;

  //   const audioContext = new AudioContext();
  //   const analyser = audioContext.createAnalyser();
  //   const source = audioContext.createMediaStreamSource(audioStream);
  //   source.connect(analyser);

  //   const bars = barsRef.current;
  //   const bufferLength = analyser.frequencyBinCount;
  //   const dataArray = new Uint8Array(bufferLength);

  //   const draw = () => {
  //     requestAnimationFrame(draw);
  //     analyser.getByteFrequencyData(dataArray);

  //     bars.forEach((bar, index) => {
  //       if (bar && index < bufferLength) {
  //         const volume = dataArray[index];
  //         const colorValue = Math.min(volume * 2, 255);
  //         bar.style.backgroundColor = `rgb(${colorValue}, 100, 100 )`;
  //       }
  //     });
  //   };
  //   draw();
  //   return () => {
  //     audioContext.close();
  //   };
  // }, [audioStream]);
  useEffect(() => {
    if (!audioStream) return;
    let Interval;
    const { analyser, bufferLength, dataArray } = audioContext(audioStream);
    if (audioStream) {
      Interval = setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        const volume = audioFrequency(dataArray, bufferLength);
        setVolume(Math.floor((volume / 256) * 100));
        console.log(volume);
      }, 30);
      return () => clearInterval(Interval);
    }
  }, [audioStream]);

  return (
    <div className="volumemeter">
      {Array.from({ length: barCount }).map((_, index) => {
        const barColor =
          volume / 5 > index ? "#4ADE80" : "rgba(255, 255, 255, 0.3)";
        return (
          <div
            key={index}
            className="volumebar"
            style={{
              backgroundColor: barColor,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default AudioRender;
