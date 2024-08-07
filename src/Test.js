import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Chatting from "components/chat/Chatting";
import Vocabulary from "pages/learn/Vocabulary";
import Title from "components/Title";
import wordtest from "./api/json/ENwordtest.json";
import "../src/test.scss";
import KakaoLogin from "react-kakao-login";

const Test = () => {
  // return <input classNameName="textinput-size-s"></input>;
  // return <Title></Title>;
  // return (
  //   <>
  //     <Vocabulary></Vocabulary>
  //   </>
  // );
  // 음성인식 테스트
  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition,
  // } = useSpeechRecognition();
  // const [randomImg, setRandomImg] = useState(0);
  // if (!browserSupportsSpeechRecognition) {
  //   return <span>브라우저가 음성 인식을 지원하지 않습니다.</span>;
  // }
  // const aab = () => {
  //   setRandomImg(randomImg + 1);
  // };
  // useEffect(() => {
  //   if (transcript === wordtest[randomImg].word) {
  //     alert("정답!");
  //     setRandomImg(randomImg + 1);
  //   }
  //   console.log(randomImg);
  //   console.log(wordtest[randomImg].word);
  //   console.log(transcript);
  // }, [transcript]);
  // console.log(wordtest);
  // return (
  //   <div>
  //     <button
  //       style={{ width: "50px", height: "50px", backgroundColor: "maroon" }}
  //       onClick={() => {
  //         aab();
  //       }}
  //     ></button>
  //     <button
  //       onClick={() => {
  //         SpeechRecognition.startListening({ language: "en-US" });
  //       }}
  //     >
  //       Start
  //     </button>
  //     <button onClick={SpeechRecognition.stopListening}>Stop</button>
  //     <button onClick={resetTranscript}>Reset</button>
  //     <p>Listening: {listening ? "on" : "off"}</p>
  //     <p style={{ fontSize: 100 }}>{transcript}</p>
  //     <img
  //       style={{ width: "100px", height: "100px" }}
  //       src={wordtest[randomImg].pic}
  //     />
  //   </div>
  // );
  //=========================================================
  //tts 테스트
  // const [text, setText] = useState("");
  // const handleChange = event => {
  //   setText(event.target.value);
  // };
  // const speak = () => {
  //   if ("speechSynthesis" in window) {
  //     const speech = new SpeechSynthesisUtterance(text);
  //     speech.lang = "en-US";
  //     window.speechSynthesis.speak(speech);
  //   } else {
  //     alert("Sorry, your browser does not support text to speech!");
  //   }
  // };
  // return (
  //   <div>
  //     <h1>Text to Speech</h1>
  //     <textarea
  //       value={text}
  //       onChange={handleChange}
  //       rows="10"
  //       cols="30"
  //       placeholder="Enter text here..."
  //     ></textarea>
  //     <br />
  //     <button onClick={speak}>Speak</button>
  //   </div>
  // );
  // ==========================================
  // const io = new Server(3000);
  // return (
  //   <div>
  //     <Chatting />
  //   </div>
  // );
};

export default Test;
