import { useRef, useState } from "react";

export const timerTime = ({ minD, timeD, timerIdD }) => {
  const [min, setMin] = useState(minD);
  const [sec, setSec] = useState(0);
  const time = useRef(timeD); // 3600초
  const timerId = useRef(null);

  clearInterval(time.current);
  clearInterval(timerId.current);
  time.current = timeD;
  timerId.current = null;
  setMin(minD);
  setSec(0);

  timerId.current = setInterval(() => {
    setMin(parseInt(time.current / 60));
    setSec(time.current % 60);
    time.current -= 1;
  }, 1000);

  return () => clearInterval(timerId.current);
};
