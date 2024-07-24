import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const commands = [
  {
    command: "hello",
    callback: () => alert("Hello!"),
    isFuzzyMatch: true,
    fuzzyMatchingThreshold: 0.2,
    bestMatchOnly: true,
  },
  {
    command: "reset",
    callback: ({ resetTranscript }) => resetTranscript(),
  },
  {
    command: "stop",
    callback: () => SpeechRecognition.stopListening(),
  },
];

const Test = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>브라우저가 음성 인식을 지원하지 않습니다.</span>;
  }

  return (
    <div>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>Listening: {listening ? "on" : "off"}</p>
      <p style={{ fontSize: 100 }}>{transcript}</p>
    </div>
  );
};

export default Test;
