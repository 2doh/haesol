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
  const [getObj, setGetObj] = useState([]);
  const [onAnswer, setOnAnswer] = useState("");
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [onListening, setOnListening] = useState(false);
  const [isTranscript, setIsTranscript] = useState("");
  const location = useLocation();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    alert("브라우저가 음성 인식을 지원하지 않습니다.");
  }

  // 듣기 쓰기
  const handleOnSubmit = e => {
    e.preventDefault();
    const currentWord = getObj[index]?.answer;
    console.log(currentWord);
    if (onAnswer === currentWord) {
      alert("정답");
      setOnAnswer("");
      if (index < getObj.length - 1) {
        setIndex(index + 1);
      }
    } else {
      alert(`오답`);
      setOnAnswer("");
      resetTranscript();
    }
  };

  // 말 듣 쓰 구분
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

  // 말하기
  // useEffect(() => {
  //   setOnListening(true);
  // }, [listening]);

  useEffect(() => {
    if (listening) {
      setOnListening(true);
    }
    if (!listening) {
      setOnListening(false);
    }
  }, [listening]);

  useEffect(() => {
    if (isTranscript === getObj[index]?.word) {
      alert("정답!");
      if (index < getObj.length - 1) {
        setIndex(index + 1);
        setIsTranscript("");
      }
    }
  }, [isTranscript]);

  useEffect(() => {
    setIsTranscript(transcript);
  }, [transcript]);

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
              listening={listening}
              resetTranscript={resetTranscript}
              setIsTranscript={setIsTranscript}
            />
            <VocaBottomWrap>
              {learnState === "speaking" ? (
                <WordWrapStyle>
                  <HiSpeakerphone
                    size={40}
                    cursor={"pointer"}
                    onClick={() => {
                      if (onListening) {
                        SpeechRecognition.stopListening();
                      }
                      if (!onListening) {
                        SpeechRecognition.startListening({ language: "en-US" });
                      }
                    }}
                    style={{
                      filter: onListening
                        ? `drop-shadow(1px 1px 5px red)`
                        : `none`,
                    }}
                  />
                  <div className="voca-bottom-word">{isTranscript}</div>
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
  /* border: solid 1px #000; */
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
