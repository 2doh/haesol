import BoxTitle from "components/common/style/BoxTitle";
import MainSchedule from "./MainSchedule";

const MainScheduleView = () => {
  return (
    <>
      <BoxTitle>학교 일정</BoxTitle>
      <div className="main-schedule">
        <div className="main-title-dwon-contents main-schedule-calendar">
          <MainSchedule />
          <div className="asdf">aaa</div>
        </div>
      </div>
    </>
  );
};

export default MainScheduleView;
