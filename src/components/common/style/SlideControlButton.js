import styled from "@emotion/styled";
import { useRef, useState } from "react";
// import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";

import { RiPlayLargeFill } from "react-icons/ri";

const ControlButtoStyle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  .btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 35px;
    height: 35px;
    background-color: #add2d8;
    padding: 8px;

    border-radius: 10px;

    svg {
      width: 100%;
      height: 100%;
      path {
        color: white;
      }
    }
  }
`;
const SlideControlButton = ({ swiper, btnList }) => {
  const startBtn = useRef();
  const [isStartBtn, setIsStartBtn] = useState(false);

  /** 이전으로 이동 */
  const handlePrev = () => {
    swiper?.slidePrev();
    slideStop();
  };

  /** 다음으로 이동 */
  const handleNext = () => {
    swiper?.slideNext();
    slideStop();
  };

  /** 일시정지 & 재생 버튼 */
  const handleStopAndStart = () => {
    if (isStartBtn) {
      // 정지되어 있는 경우
      swiper.autoplay.start();
      setIsStartBtn(false);
    } else {
      // 재생되고 있는 경우
      slideStop();
    }
  };

  /** 일시정지 */
  const slideStop = () => {
    swiper.autoplay.stop();
    setIsStartBtn(true);
  };

  return (
    <ControlButtoStyle>
      {btnList.includes("left-btn") ? (
        <div className="btn left-btn" onClick={() => handlePrev()}>
          {/* <FaChevronLeft /> */}
          <FaChevronLeft />
        </div>
      ) : null}
      {btnList.includes("stop-and-start-btn") ? (
        <div
          ref={startBtn}
          className="btn stop-and-start-btn"
          onClick={() => handleStopAndStart()}
        >
          {isStartBtn ? <RiPlayLargeFill /> : <GiPauseButton />}
        </div>
      ) : null}

      {btnList.includes("right-btn") ? (
        <div className="btn right-btn" onClick={() => handleNext()}>
          <FaChevronRight />
        </div>
      ) : null}
    </ControlButtoStyle>
  );
};

export default SlideControlButton;
