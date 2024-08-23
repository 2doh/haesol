import { useEffect, useState } from "react";
import audioContext from "utils/learn/audioContext";
import audioFrequency from "utils/learn/audioFrequency";
import "../../scss/learn/audiorender.scss";

interface AudioRenderProps {
  audioStream: MediaStream | null; // MediaStream 또는 null로 설정
}

const AudioRender: React.FC<AudioRenderProps> = ({ audioStream }) => {
  const [volume, setVolume] = useState<number>(0); // volume은 숫자 타입
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

    let interval: NodeJS.Timeout; // Interval의 타입을 NodeJS.Timeout으로 설정

    const { analyser, bufferLength, dataArray } = audioContext(audioStream);

    if (audioStream) {
      interval = setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        const volume = audioFrequency(dataArray, bufferLength);
        setVolume(Math.floor((volume / 256) * 100));
      }, 30);

      return () => clearInterval(interval);
    }
  }, [audioStream]);

  return (
    <div className="volumemeter">
      {Array.from({ length: barCount }).map((_, index) => {
        const barColor =
          volume / 2 > index ? "#4ADE80" : "rgba(255, 255, 255, 0.3)";
        return (
          <div
            key={index}
            className="volumebar"
            style={{
              backgroundColor: audioStream
                ? barColor
                : "rgba(255, 255, 255, 0.3)",
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default AudioRender;
