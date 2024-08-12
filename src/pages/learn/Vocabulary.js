import styled from "@emotion/styled";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import { useEffect, useState } from "react";
import { AiFillSound } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiSpeakFill } from "react-icons/ri";
import { speak } from "utils/speak";

const Vocabulary = ({
  getObj,
  index,
  setIndex,
  learnState,
  resetTranscript,
  listening,
  setIsTranscript,
}) => {
  const voca = getObj[index];
  const [listen, setListen] = useState(false);

  const tempObj = {
    speechword: voca.word,
    speechlang: "en-US",
  };
  const temp = {
    speechword: voca.listening,
    speechlang: "en-US",
  };

  console.log(getObj);
  console.log(voca);
  console.log(index);

  const onSpeak = () => {
    setListen(true);
    speak(tempObj, () => setListen(false));
  };

  const onClick = () => {
    setListen(true);
    speak(temp, () => setListen(false));
  };

  const onNext = () => {
    if (index === getObj.length - 1) {
      return;
    }
    setIndex(index + 1);
    setIsTranscript("");
  };
  const onBack = () => {
    if (index === 0) {
      return;
    }
    setIndex(index - 1);
    setIsTranscript("");
  };
  // console.log(index);
  // console.log(getObj[index]);
  // console.log(getObj.length);

  return (
    <>
      <div className="voca-wrap">
        <div className="voca-top">
          <div className="voca-top-totalword">
            {index + 1} / {getObj.length}
          </div>
          <AiFillSound
            size={50}
            cursor={"pointer"}
            onClick={() => {
              learnState === "listening" ? onClick() : onSpeak();
            }}
            style={{
              filter: listen ? `drop-shadow(1px 1px 5px red)` : `none`,
            }}
          />
        </div>
        <div className="voca-main">
          <img className="voca-main-card" src={voca.pic} />
        </div>
        <div className="voca-bottom">
          <IoIosArrowBack
            size={30}
            cursor={"pointer"}
            onClick={() => {
              if (!listen && !listening) {
                onBack();
                resetTranscript();
              }
            }}
          />
          {/* <div className="voca-bottom-word">{voca.word}</div> */}
          <div className="voca-bottom-word">
            {learnState === "listening" ? voca.sentence : voca.word}
          </div>
          <IoIosArrowForward
            size={30}
            cursor={"pointer"}
            onClick={() => {
              if (!listen && !listening) {
                onNext();
                resetTranscript();
              }
            }}
          />
        </div>
        {/* input 컴포넌트 추가(로그인 탭과 형식 공유하므로 하나의 컴포넌트로) */}
      </div>
    </>
  );
};

export default Vocabulary;
