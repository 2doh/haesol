import styled from "@emotion/styled";
import { getReAccessToken } from "api/user";
import MiniButtonVer01 from "components/common/style/MiniButtonVer01";
import useLogout from "hooks/common/useLogout";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { FiClock } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { openModal, updateModalDate } from "slices/modalSlice";
import { getCookie, removeCookie, setCookie } from "utils/cookie";
import { setSession } from "utils/session";

const TimerStyle = styled.div`
  min-width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  & * {
    color: #ffffff !important;
    font-size: 15px;
  }
  /* margin: 0px 10px; */

  & > div:nth-of-type(3) {
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

  const [btnClick, setBtnClick] = useState(false);

  const [min, setMin] = useState(getCookie("timerMin"));
  const [sec, setSec] = useState(getCookie("timerSec"));
  const time = useRef(getCookie("timerTime")); // 초기값 : 3600

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

      // const nowDate = moment().format("YYYYMMDDHHmmss");
      // const reTime = moment().format(getCookie("loginTime"));

      // if (nowDate > getCookie("loginTime")) {
      //   console.log("시간이 지났다.");
      // } else {
      //   console.log("시간이 남았다.");
      // }

      if (time.current <= -1) {
        // time.current <= 0 으로 설정하면 마지막에 00:01에서 정지하기 때문에
        // time.current <= -1 로 설정
        clearInterval(timerId.current);
        // console.log("타임 아웃");

        // 여기서 로그아웃 처리 등 추가 작업 수행 가능
        notifyLogoutDueToSessionExpired("BasicModal");

        return;
      }

      setMin(getCookie("timerMin"));
      setSec(getCookie("timerSec"));
      setCookie("timerMin", parseInt(time.current / 60));
      setCookie("timerSec", time.current % 60);
      setCookie("timerTime", time.current);
      time.current -= 1;
    }, 1000);
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
      useLogout();
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

        // 로그인 만료 시간 저장
        setCookie("loginTime", moment().add(1, "h").format("YYYYMMDDHHmmss"));

        // 타이머 표시 시간 초기 설정
        setCookie("timerMin", 60);
        setCookie("timerSec", 0);
        setCookie("timerTime", 3600);
        setMin(getCookie("timerMin"));
        setSec(getCookie("timerSec"));
        time.current = getCookie("timerTime");

        alertShown.current = false;
        timerTime();
      }
    }
  };

  /** 연장 버튼 */
  useEffect(() => {
    // console.log(btnClick);
    if (btnClick === true) reAccessToken();
  }, [btnClick]);

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

      <MiniButtonVer01
        buttonClick={setBtnClick}
        nowbutton={btnClick}
        buttonLabel={"연장"}
        onClick={() => {
          reAccessToken();
        }}
      />
    </>
  );
};

export default Timer;
