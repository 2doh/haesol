import styled from "@emotion/styled";
import { getReAccessToken } from "api/user";
import { useEffect, useRef, useState } from "react";
import { FiClock } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { openModal, updateModalDate } from "slices/modalSlice";
import { getCookie, removeCookie, setCookie } from "utils/cookie";

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
  display: flex;
  align-items: center;
  height: 100%;
`;

const Timer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modalSlice);

  const [min, setMin] = useState(getCookie("timerMin") || 60);
  const [sec, setSec] = useState(getCookie("timerSec") || 0);
  const time = useRef(getCookie("timerTime") || 3600); // 3600초
  const timerId = useRef(null);
  const alertShown = useRef(false); // 이전에 알림을 보여줬는지 여부를 추적하기 위한 useRef

  const timerTime = () => {
    clearInterval(timerId.current);

    timerId.current = setInterval(() => {
      /** 타임 아웃 : 타이머가 0이 되면 로그아웃  */

      /** 10분 남았을 때 시간 알림. */
      // 10분 남았을 때 한 번만 알림을 보여줌
      if (time.current === 599 && !alertShown.current) {
        displaySessionExpirationAlert("BasicModal");
        alertShown.current = true; // 알림을 한 번 보였음을 표시
      }

      if (time.current <= -1) {
        // time.current <= 0 으로 설정하면 마지막에 00:01에서 정지하기 때문에
        // time.current <= -1 로 설정
        clearInterval(timerId.current);
        // console.log("타임 아웃");

        // 여기서 로그아웃 처리 등 추가 작업 수행 가능
        notifyLogoutDueToSessionExpired("BasicModal");

        return;
      }

      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
      setCookie("timerMin", min); // 로컬스토리지에 저장
      setCookie("timerSec", sec); // 로컬스토리지에 저장
      setCookie("timerTime", time.current); // 로컬스토리지에 저장
    }, 1000);

    // return () => clearInterval(timerId.current);
  };

  useEffect(() => {
    timerTime();
    return () => clearInterval(timerId.current);
  }, []);

  /** 로그인 시간 만료 알림 모달 */
  const displaySessionExpirationAlert = selectModalType => {
    const data = {
      bodyText: ["로그인 시간이 10분 남았습니다."],
      headerText: "경고",
      modalRes: [1],
      buttonText: ["확인"],
      buttonCnt: 1,
    };

    dispatch(updateModalDate(data));
    dispatch(openModal(selectModalType));
  };

  /** 로그인 시간 만료 알림 모달 */
  const notifyLogoutDueToSessionExpired = selectModalType => {
    const data = {
      bodyText: ["로그인 시간이 만료되어 로그아웃 되었습니다."],
      headerText: "로그아웃",
      modalRes: [2],
      buttonText: ["확인"],
      buttonCnt: 1,
    };

    dispatch(updateModalDate(data));
    dispatch(openModal(selectModalType));
  };

  /** 로그인 시간 만료 알림 모달 종료 후 새로고침 갱신 */
  useEffect(() => {
    if (modalState.modalRes[0] === false && time.current <= 0) {
      window.location.reload("/");
    }
  }, [modalState.modalRes[0]]);

  /** 연장 버튼 */
  const reAccessToken = async () => {
    // 토큰이 없는 경우 홈으로 돌아감.
    // 토큰이 존재하면 연장 가능.
    if (!getCookie("accessToken")) {
      navigate("/");
    } else {
      const res = await getReAccessToken();
      if (res) {
        clearInterval(timerId.current);
        time.current = 3600; // 재설정하고 싶은 초 단위 시간으로 변경
        alertShown.current = false;
        console.log("시간이 연장되었습니다.");
        timerTime();
      }
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
