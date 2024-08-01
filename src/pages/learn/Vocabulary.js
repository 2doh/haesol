import { useState } from "react";
import { AiFillSound } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import wordTest from "../../api/json/ENwordtest.json";
import "../../scss/learn/vocabulary.scss";

const Vocabulary = () => {
  const [index, setIndex] = useState(0);
  const voca = wordTest[index];

  // console.log(wordTest);

  // wordTest.map((item, index) => {
  //   console.log(item);
  //   console.log(index);
  // });

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

  const speak = () => {
    if ("speechSynthesis" in window) {
      console.log(voca.word);
      const speech = new SpeechSynthesisUtterance(voca.word);
      // const speechkr = new SpeechSynthesisUtterance(voca.krword);
      speech.lang = "en-US";
      speech.rate = 2;
      speech.pitch = 2;
      // speechkr.lang = "kr";
      // speechkr.rate = 3;
      window.speechSynthesis.speak(speech);
      // window.speechSynthesis.speak(speechkr);
    } else {
      alert("Sorry, your browser does not support text to speech!");
    }
  };

  return (
    <>
      <div className="voca-wrap">
        <div className="voca-top">
          <div className="voca-top-totalword">
            {index + 1} / {wordTest.length}
          </div>
          <AiFillSound size={50} cursor={"pointer"} onClick={() => speak()} />
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
