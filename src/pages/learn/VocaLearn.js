import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import wordTest from "../../api/json/ENwordtest.json";
import TextInput from "../../components/common/TextInput";
import "../../scss/learn/vocabulary.scss";
import Vocabulary from "./Vocabulary";
import listeningTest from "../../api/json/ENheartest.json";
import { HiSpeakerphone } from "react-icons/hi";
import { useLocation } from "react-router";
import Loading from "components/loading/Loading";
import Title from "components/Title";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import Footer from "components/layout/Footer";

const VocaLearn = () => {
  const [learnState, setLearnState] = useState("");
  const [getObj, setGetObj] = useState("");
  const [onAnswer, setOnAnswer] = useState("");
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleOnSubmit = e => {
    e.preventDefault();
    const currentWord = getObj[index].word;

    if (transcript === currentWord) {
      alert("정답");
      setOnAnswer("");
      if (index === getObj.length - 1) {
        return;
      }
      setIndex(index + 1);
    } else {
      alert(`오답`);
      setOnAnswer("");
      resetTranscript();
    }
  };

  useEffect(() => {
    if (transcript) {
      console.log(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    const lcoationState = location.state.type;
    if (lcoationState === "말하기") {
      setLearnState("speaking");
      setGetObj(wordTest);
    }
    if (lcoationState === "듣기") {
      setLearnState("listening");
      setGetObj(listeningTest);
    }
    if (lcoationState === "쓰기") {
      setLearnState("voca");
      setGetObj(wordTest);
    }
    setLoading(false);
  }, [location]);

  return (
    <>
      <GreenHeaderNoOption />
      <VocaWrapStyle>
        <Title></Title>
        {loading ? (
          <Loading></Loading>
        ) : (
          <ContentWrapStyle>
            <Vocabulary
              getObj={getObj}
              index={index}
              setIndex={setIndex}
              learnState={learnState}
            />
            <VocaBottomWrap>
              {learnState === "speaking" ? (
                <WordWrapStyle>
                  <HiSpeakerphone
                    size={40}
                    cursor={"pointer"}
                    onClick={() => {
                      SpeechRecognition.startListening({ language: "en-US" });
                    }}
                  />
                  <div className="voca-bottom-word">{transcript}</div>
                </WordWrapStyle>
              ) : (
                <form
                  onSubmit={e => {
                    handleOnSubmit(e);
                  }}
                >
                  <TextInput
                    onAnswer={onAnswer}
                    setOnAnswer={setOnAnswer}
                  ></TextInput>
                </form>
              )}
            </VocaBottomWrap>
          </ContentWrapStyle>
        )}
      </VocaWrapStyle>
      <Footer></Footer>
    </>
  );
};

const VocaWrapStyle = styled.div`
  margin: 50px auto;
  width: 100%;
  max-width: 650px;
  height: 100%;
  /* background-color: #f3f9fa; */
  border: solid 1px #000;
  padding: 50px auto;
`;

const ContentWrapStyle = styled.div`
  width: 100%;
  height: 100%;
`;

const VocaBottomWrap = styled.div`
  margin: 10px auto 0;
  max-width: 200px;
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
