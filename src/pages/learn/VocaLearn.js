import styled from "@emotion/styled";
import { listeningList, words } from "api/online/envocaapi";
import Title from "components/Title";
import Footer from "components/layout/Footer";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import AudioRender from "components/learn/AudioRender";
import Loading from "components/loading/Loading";
import { useEffect, useState } from "react";
import { HiSpeakerphone } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { getCookie } from "utils/cookie";
import TextInput from "../../components/common/TextInput";
import "../../scss/learn/vocabulary.scss";
import Vocabulary from "./Vocabulary";
import VocaResult from "./VocaResult";

const VocaLearn = () => {
  const location = useLocation();
  const [learnState, setLearnState] = useState("");
  const [getObj, setGetObj] = useState([]);
  const [onAnswer, setOnAnswer] = useState("");
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [onListening, setOnListening] = useState(false);
  const [isTranscript, setIsTranscript] = useState("");
  const [audioStream, setAudioStream] = useState(null);
  const [tempArr, setTempArr] = useState([]);
  const navigate = useNavigate();
  // console.log(userRole);
  // console.log(getObj);

  const getVocaList = async state => {
    // console.log(state);
    const reqData = {
      studentPk: getCookie("studentPk"),
    };
    if (state === "speaking" || state === "voca") {
      const result = await words(reqData.studentPk);
      // console.log(result);
      setGetObj(result);
    }
    if (state === "listening") {
      const result = await listeningList(reqData.studentPk);
      // console.log(result);
      setGetObj(result);
    }
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    alert("브라우저가 음성 인식을 지원하지 않습니다.");
  }

  console.log(transcript);

  const tempArrUpdateHandler = isCorrect => {
    setTempArr(prevArr => {
      const newArr = [...prevArr];
      const currentItem = getObj.data.result[index];
      const currentItemId =
        learnState === "voca" ? currentItem.wordQuePk : currentItem.queId;
      // 배열에서 현재 문제의 ID와 일치하는 항목의 인덱스를 찾기
      const itemIndex = newArr.findIndex(item =>
        learnState === "voca"
          ? item.wordQuePk === currentItemId
          : item.queId === currentItemId,
      );
      if (itemIndex !== -1) {
        // 이미 존재하는 항목이면 업데이트
        newArr[itemIndex] = {
          ...newArr[itemIndex], // 기존 항목 복사
          isCorrect, // 정답 여부 업데이트
          answer: onAnswer, // 사용자의 답변 업데이트
        };
      } else {
        // 존재하지 않으면 새로 추가
        newArr.push({
          wordQuePk: learnState === "voca" ? currentItem.wordQuePk : null,
          queId: learnState !== "voca" ? currentItem.queId : null,
          question: learnState !== "voca" ? currentItem.question : null,
          answer: onAnswer,
          isCorrect,
          sentence: learnState !== "voca" ? currentItem.sentence : null,
          queAnswer: learnState === "voca" ? currentItem.answer : null,
        });
      }
      // console.log(newArr);
      return newArr;
    });
  };
  // 듣기 쓰기
  const handleOnSubmit = e => {
    e.preventDefault();
    // console.log(getObj.data.result[index].answer);
    const currentWord = getObj.data.result[index].answer;
    // console.log(currentWord);
    const isCorrect = onAnswer === currentWord;
    tempArrUpdateHandler(isCorrect);

    if (isCorrect) {
      alert("정답");
    } else {
      alert(`오답`);
    }

    setOnAnswer("");
    resetTranscript();
    if (index < getObj.data.result.length - 1) {
      setIndex(index + 1);
    }
    if (index === getObj.data.result.length - 1) {
      setLearnState("result");
    }
  };
  // console.log(tempArr);
  // console.log(getObj);

  // 말 듣 쓰 구분
  useEffect(() => {
    const lcoationState = location.state.type;
    if (!lcoationState) {
      navigate("/");
    }
    if (lcoationState === "말하기") {
      setLearnState("speaking");
      getVocaList("speaking");
      // setGetObj(wordTest);
    }
    if (lcoationState === "듣기") {
      setLearnState("listening");
      getVocaList("listening");
      // setGetObj(listeningTest);
    }
    if (lcoationState === "쓰기") {
      setLearnState("voca");
      getVocaList("voca");
      // setGetObj(wordTest);
    }
    setLoading(false);
  }, [location]);

  // 말하기
  const micHandler = async () => {
    // console.log(SpeechRecognition);
    // console.log(onListening);
    if (onListening) {
      SpeechRecognition.stopListening();
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
        setAudioStream(null);
      }
      setOnListening(false);
    }
    if (!onListening) {
      try {
        // 권한 요청
        await navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(stream => setAudioStream(stream));
        // 권한이 허용된 경우
        SpeechRecognition.startListening({
          language: "en-US",
        });
        setOnListening(true);
      } catch (err) {
        // 권한이 거부된 경우
        alert(
          "연결된 마이크가 없거나, 마이크 권한이 없습니다. 마이크 연결 및 웹브라우저 환경에서 마이크 권한을 허용해 주세요",
        );
      }
    }
  };
  // useEffect(() => {
  //   if (onListening) {
  //     SpeechRecognition.startListening({ language: "en-US" });
  //     navigator.mediaDevices
  //       .getUserMedia({ audio: true })
  //       .then(stream => setAudioStream(stream))
  //       .catch(err =>
  //         alert(
  //           "연결된 마이크가 없거나, 마이크 권한이 없습니다. 마이크 연결 및 웹브라우저 환경에서 마이크 권한을 허용해 주세요",
  //         ),
  //       );
  //   } else {
  //     SpeechRecognition.stopListening();
  //     if (audioStream) {
  //       audioStream.getTracks().forEach(track => track.stop());
  //       setAudioStream(null);
  //     }
  //   }
  // }, [onListening]);

  useEffect(() => {
    if (isTranscript === getObj[index]?.word) {
      if (onListening) {
        SpeechRecognition.stopListening();
        if (audioStream) {
          audioStream.getTracks().forEach(track => track.stop());
          setAudioStream(null);
        }
        setOnListening(false);
      }
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

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel(); // 음성 중단
      }
    };
  }, []);

  return (
    <>
      <GreenHeaderNoOption />
      <VocaWrapStyle>
        <Title></Title>
        {loading ? (
          <Loading></Loading>
        ) : learnState === "result" ? (
          <VocaResult tempArr={tempArr} />
        ) : getObj?.data?.result?.length > 0 ? (
          <ContentWrapStyle>
            <Vocabulary
              getObj={getObj}
              index={index}
              setIndex={setIndex}
              learnState={learnState}
              audioStream={audioStream}
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
                      micHandler(onListening);
                    }}
                    style={{
                      filter: onListening
                        ? `drop-shadow(1px 1px 5px red)`
                        : `none`,
                    }}
                  />
                  <AudioRender audioStream={audioStream} />
                  {/* <div className="voca-bottom-word">{isTranscript}</div> */}
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
        ) : null}
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
  max-width: 300px;
  width: 100%;
  height: 100%;
`;

const WordWrapStyle = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export default VocaLearn;
