import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { RiSpeakFill } from "react-icons/ri";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import wordTest from "../../api/json/ENwordtest.json";
import TextInput from "../../components/common/TextInput";
import "../../scss/learn/vocabulary.scss";
import Vocabulary from "./Vocabulary";
import listeningTest from "../../api/json/ENheartest.json";

// 단어 편집거리 계산 알고리즘
const getLevenshteinDistance = (a, b) => {
  const matrix = Array.from({ length: b.length + 1 }, () =>
    Array(a.length + 1).fill(0),
  );

  for (let i = 0; i <= a.length; i++) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= b.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      if (b[j - 1] === a[i - 1]) {
        matrix[j][i] = matrix[j - 1][i - 1];
      } else {
        matrix[j][i] = Math.min(
          matrix[j - 1][i - 1] + 1, // 치환
          matrix[j][i - 1] + 1, // 삽입
          matrix[j - 1][i] + 1, // 삭제
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

// 가장 유사한 단어 찾기 함수
const findClosestWord = (recognizedWord, wordList) => {
  let closestWord = wordList[0];
  let minDistance = getLevenshteinDistance(recognizedWord, wordList[0]);

  wordList.forEach(word => {
    const distance = getLevenshteinDistance(recognizedWord, word);
    if (distance < minDistance) {
      minDistance = distance;
      closestWord = word;
    }
  });

  return closestWord;
};

const VocaLearn = () => {
  const [learnState, setLearnState] = useState("listening");
  const [closestWord, setClosestWord] = useState("");
  const [getObj, setGetObj] = useState(listeningTest);
  const [onAnswer, setOnAnswer] = useState("");
  const [index, setIndex] = useState(0);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // console.log(getObj);

  const handleOnSubmit = e => {
    e.preventDefault();
    if (onAnswer === getObj[index].answer) {
      alert("정답");
      setOnAnswer("");
      if (index === getObj.length - 1) {
        return;
      }
      setIndex(index + 1);
      return;
    }
    if (onAnswer !== getObj[index].answer) {
      alert("오답");
      setOnAnswer("");
    }
  };

  useEffect(() => {
    if (transcript) {
      const closest = findClosestWord(transcript, wordTest);
      setClosestWord(closest);
    }
  }, [transcript]);

  useEffect(() => {
    if (learnState === "voca") {
      setGetObj(wordTest);
    }
    if (learnState === "listening") {
      setGetObj(listeningTest);
    }
  }, []);

  return (
    <>
      <VocaWrapStyle>
        <Vocabulary
          getObj={getObj}
          index={index}
          setIndex={setIndex}
          learnState={learnState}
        />
        <VocaBottomWrap>
          {learnState === "speak" ? (
            <WordWrapStyle>
              <RiSpeakFill
                size={40}
                cursor={"pointer"}
                onClick={() => {
                  SpeechRecognition.startListening({ language: "en-US" });
                }}
              />
              <div className="voca-bottom-word">{closestWord}</div>
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
