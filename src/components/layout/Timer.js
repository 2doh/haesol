import styled from "@emotion/styled";
import { getReAccessToken } from "api/user";
import { useEffect, useRef, useState } from "react";
import { FiClock } from "react-icons/fi";

const TimerStyle = styled.div`
  min-width: 80px;
  display: flex;
  justify-content: center;
  gap: 5px;
  & * {
    color: #ffffff !important;
  }
  /* margin: 0px 10px; */

  & > div:nth-child(3) {
    width: 20px;
  }

  & button {
  }
`;

const ClockStyle = styled.div`
  /* width: 100%;
  height: 100%; */
  display: flex;
  align-items: center;
  height: 100%;
`;

const Timer = () => {
  // const secondHand = document.querySelector(".second-hand");
  // const minsHand = document.querySelector(".min-hand");
  // const hourHand = document.querySelector(".hour-hand");

  // function setDate() {
  //   const now = new Date();

  //   const seconds = now.getSeconds();
  //   const secondsDegrees = (seconds / 60) * 360 + 90;
  //   secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  //   const mins = now.getMinutes();
  //   const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
  //   minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  //   const hour = now.getHours();
  //   const hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;
  //   hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  // }

  // setInterval(setDate, 1000);

  // setDate();

  const [min, setMin] = useState(60);
  const [sec, setSec] = useState(0);
  const time = useRef(3600); // 3600초
  const timerId = useRef(null);

  const timerTime = () => {
    /** 타이머 리셋 : 추후 로그인 연장 기능 추가 예정 */
    clearInterval(timerId.current);
    clearInterval(time.current);
    timerId.current = null;
    time.current = 3600;
    setMin(60);
    setSec(0);

    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  };

  useEffect(() => {
    timerTime();
  }, []);

  const reAccessToken = async () => {
    const res = getReAccessToken();
    if (res) {
      timerTime();
    }
  };

  return (
    <>
      <ClockStyle>
        <FiClock size={17} style={{ color: "green" }} />
      </ClockStyle>
      <TimerStyle>
        <div>{String(min).padStart(2, "0")}</div>
        <div> : </div>
        <div>{String(sec).padStart(2, "0")}</div>
      </TimerStyle>
      <div>
        <button
          onClick={() => {
            reAccessToken();
          }}
        >
          연장
        </button>
      </div>
    </>
  );
};

export default Timer;
