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

// 레벤슈타인 거리 계산 함수
const levenshtein = (a, b) => {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

// 가장 가까운 단어를 찾는 함수
const findClosestWord = (input, words) => {
  let closest = words[0];
  let minDistance = levenshtein(input, words[0].word);

  for (let i = 1; i < words.length; i++) {
    const distance = levenshtein(input, words[i].word);
    if (distance < minDistance) {
      closest = words[i];
      minDistance = distance;
    }
  }
  return closest;
};

const VocaLearn = () => {
  const [learnState, setLearnState] = useState("");
  const [closestWord, setClosestWord] = useState("");
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
    const closest = findClosestWord(transcript, getObj);

    if (transcript === currentWord) {
      alert("정답");
      setOnAnswer("");
      setClosestWord("");
      if (index === getObj.length - 1) {
        return;
      }
      setIndex(index + 1);
    } else {
      setClosestWord(closest.word);
      alert(`오답, 가장 가까운 단어: ${closest.word}`);
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
  margin: 0 auto;
  width: 100%;
  max-width: 650px;
  height: 100%;
  background-color: #f3f9fa;
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
