import { AiFillSound } from "react-icons/ai";
import "../../scss/learn/vocabulary.scss";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";

const Vocabulary = wordtest => {
  const [voca, setVoca] = useState("");

  return (
    <div className="voca-wrap">
      <div className="voca-top">
        <div className="voca-top-totalword">1 / 30</div>
        <AiFillSound size={50} cursor={"pointer"} />
      </div>
      <div className="voca-main">
        <img className="voca-main-card" src="" />
      </div>
      <div className="voca-bottom">
        <IoIosArrowBack size={30} cursor={"pointer"} />
        <div className="voca-bottom-word">{voca}</div>
        <IoIosArrowForward size={30} cursor={"pointer"} />
      </div>
      {/* input 컴포넌트 추가(로그인 탭과 형식 공유하므로 하나의 컴포넌트로) */}
    </div>
  );
};

export default Vocabulary;
