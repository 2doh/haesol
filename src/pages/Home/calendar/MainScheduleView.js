import styled from "@emotion/styled";
import BoxTitle from "components/common/style/BoxTitle";
import CalendarList from "./CalendarList";
import MainSchedule from "./MainSchedule";
import { ImSpoonKnife } from "react-icons/im";
import { useEffect, useState } from "react";

const MainScheduleViewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .schedule-tag {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    .dot {
      margin: 0 10px 0 0;
      padding: 0;
    }
    .test-day-mark {
      height: 8px;
      width: 8px;
    }

    span {
      padding-right: 20px;
    }
  }
`;

const MainScheduleView = () => {
  const [eventList, setEventList] = useState([]);

  return (
    <MainScheduleViewStyle>
      <BoxTitle>학교 일정</BoxTitle>
      <div className="schedule-wrap">
        <div className="schedule-inner">
          <div className="item">
            <MainSchedule setEventList={setEventList} />
          </div>
          <div className="item">
            <CalendarList eventList={eventList} />
          </div>
        </div>
        <div className="schedule-tag">
          <div className="dot closed-day-mark"></div>
          <span>휴업일</span>
          <div className="dot test-day-mark"></div>
          <span>시험일 </span>
          <div className="dot no-leftovers-day-mark">
            <ImSpoonKnife />
          </div>
          <span>수요일은 다 먹는 날</span>
        </div>
      </div>
    </MainScheduleViewStyle>
  );
};

export default MainScheduleView;
