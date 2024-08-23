interface AudioContextResult {
  analyser: AnalyserNode;
  bufferLength: number;
  dataArray: Uint8Array;
}

const audioContext = (stream: MediaStream): AudioContextResult => {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const microphone = audioContext.createMediaStreamSource(stream);
  microphone.connect(analyser);
  analyser.fftSize = 256; // 256 ~ 2048
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  return { analyser, bufferLength, dataArray };
};

export default audioContext;
