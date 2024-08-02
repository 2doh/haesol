import styled from "@emotion/styled";
import { useState } from "react";
import { AiFillSound } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiSpeakFill } from "react-icons/ri";
import { speak } from "utils/speak";
import wordTest from "../../api/json/ENwordtest.json";

const Vocabulary = ({ setSpeakingWord }) => {
  const [index, setIndex] = useState(0);
  const voca = wordTest[index];
  const tempObj = {
    speechword: voca.word,
    speechlang: "kr",
  };

  // console.log(wordTest);

  // wordTest.map((item, index) => {
  //   console.log(item);
  //   console.log(index);
  // });

  const onSpeak = () => {
    speak(tempObj);
  };

  const onNext = () => {
    if (index === wordTest.length - 1) {
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
  // console.log(wordTest[index]);
  // console.log(wordTest.length);

  return (
    <>
      <div className="voca-wrap">
        <div className="voca-top">
          <div className="voca-top-totalword">
            {index + 1} / {wordTest.length}
          </div>
          <AiFillSound size={50} cursor={"pointer"} onClick={() => onSpeak()} />
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
          <div className="voca-bottom-word">{voca.word}</div>
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
