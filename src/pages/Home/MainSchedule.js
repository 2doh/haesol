import styled from "@emotion/styled";
import {
  AA_SERVER_URL,
  ATPT_OFCDC_SC_CODE,
  KEY,
  SD_SCHUL_CODE,
} from "api/config";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../scss/main/mainschedule.css";

const ScWrap = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const nowMonthScheduleStyle = styled.div``;

const MainSchedule = () => {
  const curDate = new Date(); // 현재 날짜
  const today = moment(curDate).format("YYYY-MM-DD"); // 출력용
  // 클릭한 날짜 (초기값 : 현재 날짜)
  const [value, onChange] = useState(curDate);
  const [activeStartDate, setActiveStartDate] = useState(curDate);
  const fromMmd = moment().format("YYYYMM01");
  const toYmd = moment().format("YYYYMM" + { last });
  var last = new Date(2024, 7, 0).getDate();
  const [aaArr, setAaArr] = useState([]);

  // console.log("말일 : ", last);

  // console.log("일정 목록 배열 : ", curDate);

  /** 학사 일정 */
  useEffect(() => {
    const url = `${AA_SERVER_URL}?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${KEY}&AA_FROM_YMD=${fromMmd}&AA_TO_YMD=${toYmd}&TYPE=JSON`;
    // const url = `${AA_SERVER_URL}?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${KEY}&TYPE=JSON`;

    axios.get(url).then(async res => {
      // 급식 데이터가 있는 없는지 확인
      const resArr = res.data.SchoolSchedule[1].row;
      resArr.map((item, index) => {
        // aaArr.push(item.AA_YMD);
        setAaArr([...aaArr, item.AA_YMD]);
        // console.log("학사 일정 : ", resArr[index].AA_YMD);
        // console.log("학사 일정 item : ", item.AA_YMD);
        // console.log("학사 일정 item : ", aaArr);
      });
    });
  }, []);

  // 일정 목록
  const dayList = [
    "2023-07-10",
    "2023-07-21",
    "2023-07-02",
    "2023-07-14",
    "2023-07-27",
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
  /** 오늘로 돌아오는 버튼 기능 */
  // const handleTodayClick = () => {
  //   setActiveStartDate(curDate);
  //   onChange(curDate);
  // };

  /** 현재 캘린더에 보이는 월이 변경되었을 때 */
  const changeCalendarMonth = e => {
    // console.log("값 확인 : ", e);
  };

  return (
    <ScWrap>
      <Calendar
        locale="ko"
        // locale="en"
        onChange={onChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        event={dayList}
        formatDay={(locale, date) => moment(date).format("D")}
        // tileContent={addContent}
        showNeighboringMonth={false}
        // 오늘 날짜로 돌아오는 기능을 위해 필요한 옵션 설정
        // activeStartDate={activeStartDate === null ? undefined : activeStartDate}
        // onViewChange={e => {
        //   console.log(e);
        // }}

        // 활성화된(현재 보여지는) 년, 월, 일이 변경될 때마다 실행
        onActiveStartDateChange={e => {
          changeCalendarMonth(e);
        }}

        // onActiveStartDateChange={({ activeStartDate }) =>
        //   getActiveMonth(activeStartDate)
        // }
      />
      <div className="calendar-now-month-list-wrap">
        <div className="now-schedule-day">{today}</div>
        <div className="">일정 리스트 영역(오늘 일정에는 하이라이트 주기)</div>
      </div>
    </ScWrap>
  );
};

export default MainSchedule;
