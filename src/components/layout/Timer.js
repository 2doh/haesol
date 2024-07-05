import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { FiClock } from "react-icons/fi";

const TimerStyle = styled.div`
  min-width: 60px;
  display: flex;
  justify-content: center;
`;

const ClockStyle = styled.div`
  /* width: 100%;
  height: 100%; */
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

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  return (
    <>
      <ClockStyle>
        {/* <div className="clock">
          <div className="outer-clock-face">
            <div className="marking marking-one"></div>
            <div className="marking marking-two"></div>
            <div className="marking marking-three"></div>
            <div className="marking marking-four"></div>
            <div className="inner-clock-face">
              <div className="hand hour-hand"></div>
              <div className="hand min-hand"></div>
              <div className="hand second-hand"></div>
            </div>
          </div>
        </div> */}
        <FiClock />
      </ClockStyle>
      <TimerStyle>
        {min} : {sec}
      </TimerStyle>
    </>
  );
};

export default Timer;
