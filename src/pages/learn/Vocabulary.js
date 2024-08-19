import styled from "@emotion/styled";
import { userRoleState } from "atoms/userState";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiSpeakerHighFill, PiSpeakerXFill } from "react-icons/pi";
import { useRecoilState } from "recoil";
import { speak } from "utils/speak";

const Vocabulary = ({
  getObj,
  index,
  setIndex,
  learnState,
  resetTranscript,
  audioStream,
  setIsTranscript,
}) => {
  const initVolume = localStorage.getItem("initVolume");
  const voca = getObj?.data?.result[index];
  const [listen, setListen] = useState(false);
  const [volume, setVolume] = useState(initVolume || 0.5);
  const [isVolume, setIsVolume] = useState(volume);

  localStorage.setItem("initVolume", volume);

  const tempObj = {
    speechword: voca?.word,
    speechlang: "en-US",
    speechvolume: volume,
  };
  const temp = {
    speechword: voca?.sentence,
    speechlang: "en-US",
    speechvolume: volume,
  };
  // console.log(tempObj);
  // console.log(getObj);
  // console.log(voca);
  // console.log(index);

  const onSpeak = () => {
    if (!listen) {
      setListen(true);
      speak(tempObj, () => setListen(false), false); // 음성 시작
    } else {
      // 이미 음성이 재생 중일 때 음성을 중단합니다.
      speak(tempObj, () => setListen(false), true); // 음성 중단
      setListen(false);
    }
  };

  // console.log(listen);
  const onClick = () => {
    if (!listen) {
      setListen(true);
      speak(temp, () => setListen(false), false); // 음성 시작
    } else {
      // 이미 음성이 재생 중일 때 음성을 중단합니다.
      speak(temp, () => setListen(false), true); // 음성 중단
      setListen(false);
    }
  };

  const onNext = () => {
    if (index === getObj.data.result.length - 1) {
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

  // console.log(volume);
  // console.log(isVolume);

  return (
    <>
      <div className="voca-wrap">
        <div className="voca-top">
          <div className="voca-top-totalword">
            {index + 1} / {getObj.data.result.length}
          </div>
          <div className="voca-top-soundwrap">
            {volume === 0 ? (
              <PiSpeakerXFill
                size={30}
                onClick={() => {
                  setVolume(isVolume);
                }}
                cursor={"pointer"}
              />
            ) : (
              <PiSpeakerHighFill
                size={30}
                cursor={"pointer"}
                onClick={() => {
                  setIsVolume(volume);
                  setVolume(0);
                }}
                style={{
                  filter: listen ? `drop-shadow(1px 1px 5px red)` : `none`,
                }}
              />
            )}
            <input
              className="voca-top-volumeslider"
              type="range"
              min={0}
              max={1}
              color="gray"
              step={0.01}
              value={volume}
              onChange={event => {
                setVolume(event.target.valueAsNumber);
                setIsVolume(event.target.valueAsNumber);
              }}
            />
          </div>
        </div>
        <div className="voca-main">
          <img
            className="voca-main-card"
            src={voca?.pic}
            onClick={() => {
              learnState === "listening" ? onClick() : onSpeak();
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="voca-bottom">
          <IoIosArrowBack
            size={30}
            cursor={"pointer"}
            onClick={() => {
              if (!listen && !audioStream) {
                onBack();
                resetTranscript();
              }
            }}
          />
          {/* <div className="voca-bottom-word">{voca.word}</div> */}
          <div className="voca-bottom-word">
            {learnState === "listening" ? voca.question : voca.word}
          </div>
          <IoIosArrowForward
            size={30}
            cursor={"pointer"}
            onClick={() => {
              if (!listen && !audioStream) {
                onNext();
                resetTranscript();
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Vocabulary;
