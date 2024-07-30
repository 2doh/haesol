import {
  AA_SERVER_URL,
  ATPT_OFCDC_SC_CODE,
  KEY,
  SD_SCHUL_CODE,
} from "api/config";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

const CalendarList = () => {
  const [eventList, setEventList] = useState([]);
  const [eventDayList, setEventDayList] = useState([]);

  // 조회 기간 시작일
  const fromMmd = moment().format("YYYYMM01");
  // 조회 기간 말일
  const toYmd = moment().format("YYYYMM" + { last });
  var last = new Date(2024, 7, 0).getDate();

  // 공제일 리스트
  const [closedDayList, setClosedDayList] = useState([]);

  /** 학사 일정 */
  useEffect(() => {
    const url = `${AA_SERVER_URL}?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${KEY}&AA_FROM_YMD=${fromMmd}&AA_TO_YMD=${toYmd}&TYPE=JSON`;
    // const url = `${AA_SERVER_URL}?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${KEY}&TYPE=JSON`;

    axios.get(url).then(async res => {
      // 급식 데이터가 있는 없는지 확인
      const eventNum = res.data.SchoolSchedule[0].head[0].list_total_count;

      if (eventNum >= 1) {
        const data = res.data.SchoolSchedule[1].row;

        data.map((item, index) => {
          setEventDayList(prevEventDayList => [
            ...prevEventDayList,
            moment(item.AA_YMD).format("YYYY-MM-DD"),
          ]);
          setEventList(prevEventList => [...prevEventList, item.EVENT_NM]);

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

  return (
    <div className="calendar-list">
      <div className="now-schedule-day">
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
    </div>
  );
};

export default CalendarList;
