import styled from "@emotion/styled";
import { userRoleState } from "atoms/userState";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiSpeakerHighFill, PiSpeakerXFill } from "react-icons/pi";
import { useRecoilState } from "recoil";
import { speak } from "utils/speak";

interface VocaDataItem {
  wordQuePk?: number;
  queId?: number;
  word?: string;
  answer?: string;
  question?: string;
  sentence?: string;
  pic?: string;
}

interface VocabularyProps {
  getObj: { data: { result: VocaDataItem[] } };
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  learnState: string;
  resetTranscript: () => void;
  audioStream: MediaStream | null;
  setIsTranscript: React.Dispatch<React.SetStateAction<string>>;
  tempArrUpdateHandler: (isCorrect: boolean | null) => void;
  onAnswer: string;
  setListen: React.Dispatch<React.SetStateAction<boolean>>;
  listen: boolean;
  setLearnState: React.Dispatch<React.SetStateAction<string>>;
}

interface SpeechOptions {
  speechword: string;
  speechlang: string;
  speechvolume: number;
}

const Vocabulary: React.FC<VocabularyProps> = ({
  getObj,
  index,
  setIndex,
  learnState,
  resetTranscript,
  audioStream,
  setIsTranscript,
  tempArrUpdateHandler,
  onAnswer,
  setListen,
  listen,
  setLearnState,
}) => {
  const initVolume = localStorage.getItem("initVolume");
  const voca = getObj?.data?.result[index];
  const [volume, setVolume] = useState<number>(parseFloat(initVolume || "0.5"));
  const [isVolume, setIsVolume] = useState<number>(volume);

  localStorage.setItem("initVolume", volume.toString());

  const tempObj: SpeechOptions = {
    speechword: voca?.word || "",
    speechlang: "en-US",
    speechvolume: volume,
  };
  const temp: SpeechOptions = {
    speechword: voca?.sentence || "",
    speechlang: "en-US",
    speechvolume: volume,
  };

  const onSpeak = () => {
    if (!listen) {
      setListen(true);
      speak(tempObj, () => setListen(false), false); // 음성 시작
    } else {
      speak(tempObj, () => setListen(false), true); // 음성 중단
      setListen(false);
    }
  };

  const onClick = () => {
    if (!listen) {
      setListen(true);
      speak(temp, () => setListen(false), false); // 음성 시작
    } else {
      speak(temp, () => setListen(false), true); // 음성 중단
      setListen(false);
    }
  };

  const confirmEndWord = () => {
    setIndex(index + 1);
    return true;
  };

  const onNext = async () => {
    if (index === getObj.data.result.length - 1) {
      const isEnd = confirmEndWord();
      if (isEnd) {
        setLearnState("result");
      }
    } else {
      if (!onAnswer) {
        tempArrUpdateHandler(null);
      }
      setIndex(index + 1);
      setIsTranscript("");
    }
  };

  const onBack = () => {
    if (index > 0) {
      setIndex(index - 1);
      setIsTranscript("");
    }
  };

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
            src={
              learnState === "listening"
                ? `http://112.222.157.156:5121/pic/onlineEngLis/${voca?.queId}/${voca?.pic}`
                : `http://112.222.157.156:5121/pic/onlineEngWord/${voca?.wordQuePk}/${voca?.pic}`
            }
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
          <div className="voca-bottom-word">
            {learnState === "listening" ? voca?.question : voca?.word}
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
