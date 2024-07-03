import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";

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
        <div className="clock">
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
        </div>
      </ClockStyle>
      <TimerStyle>
        {min} : {sec}
      </TimerStyle>
    </>
  );
};

export default Timer;
