import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { AiFillSound } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiSpeakFill } from "react-icons/ri";
import { speak } from "utils/speak";

const Vocabulary = ({ getObj, index, setIndex, learnState }) => {
  const voca = getObj[index];

  const tempObj = {
    speechword: voca.word,
    speechlang: "kr",
  };
  const temp = {
    speechword: voca.listening,
    speechlang: "en-US",
  };

  // console.log(getObj);
  // console.log(voca);

  const onSpeak = () => {
    speak(tempObj);
  };

  const onClick = () => {
    speak(temp);
  };

  const onNext = () => {
    if (index === getObj.length - 1) {
      return;
    }
    setIndex(index + 1);
  };
  const onBack = () => {
    if (index === 0) {
      return;
    }
    setIndex(index - 1);
  };
  // console.log(index);
  // console.log(getObj[index]);
  // console.log(getObj.length);

  useEffect(() => {}, []);

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
              onBack();
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
              onNext();
            }}
          />
        </div>
        {/* input 컴포넌트 추가(로그인 탭과 형식 공유하므로 하나의 컴포넌트로) */}
      </div>
    </>
  );
};

export default Vocabulary;
