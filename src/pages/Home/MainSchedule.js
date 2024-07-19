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
import { ImSpoonKnife } from "react-icons/im";
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
  // 조회 기간 시작일
  const fromMmd = moment().format("YYYYMM01");
  // 조회 기간 말일
  const toYmd = moment().format("YYYYMM" + { last });
  var last = new Date(2024, 7, 0).getDate();

  const [eventList, setEventList] = useState([]);
  const [eventDayList, setEventDayList] = useState([]);

  // 공제일 리스트
  const [closedDayList, setClosedDayList] = useState([]);
  // 시험일 리스트
  const [testDayList, setTestDayList] = useState([
    "2024-07-10",
    "2024-07-11",
    "2024-07-12",
  ]);
  // 잔반없는 날 리스트
  const [noLeftoversDay, setNoLeftoversDay] = useState([
    "2024-07-03",
    "2024-07-10",
    "2024-07-17",
  ]);

  // 마커를 위한 배열
  const [mark, setMark] = useState([]);

  const [eventListTotalCount, setEventListTotalCount] = useState(0);
  // 일정 count 수
  // console.log("말일 : ", last);

  // console.log("일정 목록 배열 : ", curDate);

  /** 학사 일정 */
  useEffect(() => {
    const url = `${AA_SERVER_URL}?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${KEY}&AA_FROM_YMD=${fromMmd}&AA_TO_YMD=${toYmd}&TYPE=JSON`;
    // const url = `${AA_SERVER_URL}?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${KEY}&TYPE=JSON`;

    axios.get(url).then(async res => {
      // 급식 데이터가 있는 없는지 확인
      const eventNum = res.data.SchoolSchedule[0].head[0].list_total_count;

      setEventListTotalCount(eventNum);

      if (eventNum >= 1) {
        const data = res.data.SchoolSchedule[1].row;

        data.map((item, index) => {
          console.log("값 확인 : ", item);

          setEventDayList(prevEventDayList => [
            ...prevEventDayList,
            moment(item.AA_YMD).format("YYYY-MM-DD"),
          ]);
          setEventList(prevEventList => [...prevEventList, item.EVENT_NM]);
          setMark(prevMark => [...prevMark, item.EVENT_NM]);

          switch (item.SBTR_DD_SC_NM) {
            case "휴업일":
              setClosedDayList(prevClosedDayList => [
                ...prevClosedDayList,
                moment(item.AA_YMD).format("YYYY-MM-DD"),
              ]);
              break;
            default:
              break;
          }

          // console.log("학사 일정 : ", item.AA_YMD);
          // console.log("행사명 : ", item.EVENT_NM);
          // console.log("수정일자 : ", item.LOAD_DTM);
          // console.log("수업 공제일명 : ", item.SBTR_DD_SC_NM);
          // 공제일명에 따라서 색상 다르게 설정하기
        });
      }
    });
  }, []);

  useEffect(() => {
    console.log("일정 있는 날짜 배열 : ", eventDayList);
    console.log("일정  배열 : ", eventList);
  }, [eventDayList, eventList]);

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
        calendarType="gregory"
        onChange={onChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        event={eventDayList}
        formatDay={(locale, date) => moment(date).format("D")}
        tileContent={({ date, view }) => {
          // 마커 삽입
          // 날짜 타일에 컨텐츠 추가하기 (html 태그)
          // 추가할 html 태그를 변수 초기화
          let html = [];
          // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
          if (
            closedDayList.find(x => x === moment(date).format("YYYY-MM-DD"))
          ) {
            html.push(<div className="dot closed-day-mark"></div>);
          }
          if (testDayList.find(x => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(<div className="dot test-day-mark"></div>);
          }
          if (
            noLeftoversDay.find(x => x === moment(date).format("YYYY-MM-DD"))
          ) {
            html.push(
              <div className="dot no-leftovers-day-mark">
                {/* <FaUtensilSpoon /> */}
                <ImSpoonKnife />
              </div>,
            );
          }

          // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
          return (
            <>
              <div className="flex justify-center items-center absoluteDiv">
                {html}
                {console.log(html)}
              </div>
            </>
          );
        }}
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
        <div className="now-schedule-day"></div>
        {/* <div className="now-schedule-day">{today}</div> */}
        <div className="now-month-event-text-wrap">
          <div className="now-month-event-text">
            {eventList.map((item, index) => {
              return (
                <div className="event-day" key={index}>
                  <div className="event-day-style">
                    {moment(eventDayList[index]).format("M월 DD일")}
                  </div>
                  <div className="event-day-text-style">{item}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ScWrap>
  );
};

export default MainSchedule;
