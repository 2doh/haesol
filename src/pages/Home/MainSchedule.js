import styled from "@emotion/styled";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../scss/main/mainschedule.css";
import moment from "moment";

const ScWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const MainSchedule = () => {
  const curDate = new Date(); // 현재 날짜
  // 클릭한 날짜 (초기값 : 현재 날짜)
  const [value, onChange] = useState(curDate);

  // 일정 목록
  const dayList = [
    "2023-03-10",
    "2023-03-21",
    "2023-04-02",
    "2023-04-14",
    "2023-04-27",
  ];

  // 각 날짜 타일에 컨텐츠 추가
  const addContent = ({ date }) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];

    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    // if (dayList.find((day) => day === moment(date).format('YYYY-MM-DD'))) {
    //   contents.push(
    //     <>
    //       {/* <div className="dot"></div> */}
    //       <Image
    //         src="emotion/good.svg"
    //         className="diaryImg"
    //         width="26"
    //         height="26"
    //         alt="today is..."
    //       />
    //     </>
    //   );
    // }
    return <div>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
  };

  // 클릭한 날짜 (년-월-일)
  //   const activeDate = moment(value).format("YYYY-MM-DD");
  // 날짜 요일 출력
  //   const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  //   const formatShortWeekday = (locale, date) => {
  //     const idx = date.getDay();
  //     return weekName[idx];
  //   };

  //   // 특정 날짜 클래스 적용하기
  //   const tileClassName = ({ date }) => {
  //     // date.getDay() 는 요일을 리턴한다.
  //     // 0 = 일요일
  //     console.log(date.getDay());
  //     const day = date.getDay();
  //     let classNames = "";
  //     // 화요일인 경우 샘플
  //     if (day === 2) {
  //       classNames += "rain";
  //     } else if (day === 4) {
  //       classNames += "sun";
  //     }
  //     return classNames;
  //   };

  //   const [value, onChange] = useState(new Date());

  return (
    <ScWrap>
      <Calendar
        locale="ko"
        onChange={onChange}
        value={value}
        // next2Label={null}
        // prev2Label={null}
        // formatDay={(locale, date) => moment(date).format("D")}
        // tileContent={addContent}
        // showNeighboringMonth={false}
        // onActiveStartDateChange={({ activeStartDate }) =>
        //   getActiveMonth(activeStartDate)
        // }
      />
    </ScWrap>
  );
};

export default MainSchedule;
