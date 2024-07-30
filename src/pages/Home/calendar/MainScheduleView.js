import styled from "@emotion/styled";
import BoxTitle from "components/common/style/BoxTitle";
import CalendarList from "./CalendarList";
import MainSchedule from "./MainSchedule";

const MainScheduleViewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainScheduleView = () => {
  return (
    <MainScheduleViewStyle>
      <BoxTitle>학교 일정</BoxTitle>
      <div className="schedule-wrap">
        <div className="item">
          <MainSchedule />
        </div>
        <div className="item">
          <CalendarList />
        </div>
      </div>
    </MainScheduleViewStyle>
  );
};

export default MainScheduleView;
