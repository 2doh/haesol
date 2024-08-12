import {
  AA_SERVER_URL,
  ATPT_OFCDC_SC_CODE,
  KEY,
  SD_SCHUL_CODE,
} from "api/config";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

const CalendarList = ({ eventList }) => {
  const nowMonth = moment().format("MM");
  const [nowEventList, setNowEventList] = useState([]);

  useEffect(() => {
    eventList.map((item, index) => {
      if (item.AA_YMD.slice(5, 7) === nowMonth) {
        setNowEventList(nowEventList => [...nowEventList, item]);
      }
    });
  }, [eventList]);

  return (
    <div className="calendar-list">
      <div className="now-schedule-day">
        <div
          className={
            nowEventList.length === 0
              ? "no-event-day-wrap"
              : "now-month-event-text-wrap"
          }
        >
          <div className="now-month-event-text">
            {nowEventList.length !== 0 ? (
              nowEventList.map((item, index) => {
                return (
                  <div className="event-day" key={index}>
                    <div className="event-day-style">
                      {moment(item.AA_YMD).format("M월 DD일")}
                    </div>
                    <div className="event-day-text-style">{item.EVENT_NM}</div>
                  </div>
                );
              })
            ) : (
              <div className="no-event-day">일정이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarList;
