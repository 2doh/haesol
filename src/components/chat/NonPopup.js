import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../../scss/chat/chat.css";

const NonPopup = ({ setChatStartOpen }) => {
  const [checked, setChecked] = useState(false); // 체크박스를 체크했는가
  const [hasCookie, setHasCookie] = useState(false); // 쿠키가 저장되어있는가
  const [cookies, setCookies] = useCookies(["HBB_Cookie"]); // 쿠기에 저장되는 내용

  // 체크박스 변경 시
  const handleChange = e => {
    setChecked(e.target.checked);
    console.log("Checkbox changed: ", e.target.checked);
    // if (e.target.checked) {
    //   setOpen(false);
    // }
  };

  // 쿠키의 유효기한을 지정하는 함수
  const getExpiredDate = days => {
    const date = new Date(); // 현재 시간을 받아온다
    date.setDate(date.getDate() + days);
    // 현재시간의 날짜에 days 만큼 더하여 유효기간을 지정
    return date;
  };

  // 페이지 로드 시 쿠키 유무 확인
  useEffect(() => {
    if (cookies["HBB_Cookie"]) {
      setHasCookie(true);
      console.log("Cookie detected: ", cookies["HBB_Cookie"]);
    } else {
      setHasCookie(false);
      console.log("No cookie found");
    }
  }, [cookies]);

  // // 팝업을 닫을 때 실행되는 로직
  // useEffect(() => {
  //   if (checked && !open) {
  //     const expires = getExpiredDate(1); // 1일 후 만료
  //     console.log("Setting cookie...");
  //     setCookies("HBB_Cookie", true, { path: "/", expires });
  //     console.log("쿠키 설정:", cookies);
  //   }
  // }, [open, checked, setCookies]);

  // 채팅 시작하기 버튼을 눌렀을 때 쿠키 설정 및 팝업 닫기
  const handleChatStart = () => {
    if (checked) {
      const expires = getExpiredDate(1); // 1일 후 만료
      setCookies("HBB_Cookie", true, { path: "/", expires });
    }
    setChatStartOpen(true); // ChatList를 열기 위해 ChatStart의 상태를 업데이트
  };

  return (
    <>
      {!hasCookie && open && (
        <>
          <div className="chat-start-non-popup">
            <input
              type="checkbox"
              id="non-popup"
              name="non-popup"
              checked={checked}
              onChange={e => {
                handleChange(e);
              }}
            />
            <label htmlFor="non-popup">오늘 하루 더 이상 보지 않기</label>
          </div>
          <button
            className="chat-button"
            onClick={() => {
              handleChatStart();
            }}
          >
            채팅 시작하기
          </button>
        </>
      )}
    </>
  );
};

export default NonPopup;
