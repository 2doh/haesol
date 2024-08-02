import React, { useEffect, useState } from "react";
import Vocabulary from "./Vocabulary";
import TextInput from "../../components/common/TextInput";
import styled from "@emotion/styled";
import "../../scss/learn/vocabulary.scss";
import { RiSpeakFill } from "react-icons/ri";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VocaLearn = () => {
  const [learnState, setLearnState] = useState(false);
  const [speakingWord, setSpeakingWord] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const onSpeech = () => {
    SpeechRecognition.startListening({ language: "ko" });
  };

  return (
    <>
      <VocaWrapStyle>
        <Vocabulary speakingWord={speakingWord}></Vocabulary>
        <VocaBottomWrap>
          {learnState ? (
            <TextInput></TextInput>
          ) : (
            <WordWrapStyle>
              <RiSpeakFill
                size={50}
                cursor={"pointer"}
                onClick={() => {
                  onSpeech();
                }}
              />
              <div className="voca-bottom-word">{transcript}</div>
              <p></p>
            </WordWrapStyle>
          )}
        </VocaBottomWrap>
      </VocaWrapStyle>
    </>
  );
};

const VocaWrapStyle = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 650px;
  height: 100%;
`;

const VocaBottomWrap = styled.div`
  margin: 10px auto 0;
  max-width: 300px;
  width: 100%;
  height: 100%;
`;

const WordWrapStyle = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export default VocaLearn;
