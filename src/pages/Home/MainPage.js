import styled from "@emotion/styled";
import React from "react";
import MainSchedule from "./MainSchedule";
import MainScheduleView from "./MainScheduleView";

const MainPageStyle = styled.div`
  width: 100%;

  .main-page-fill-space {
    position: relative;
    height: 75px;
    width: 100%;

    .top-space,
    .bottom-space {
      position: absolute;
      height: 50%;
      width: 100%;
    }

    .top-space {
      top: 0;
      background-color: #f3f9fa;
    }
    .bottom-space {
      bottom: 0;
    }
  }

  .main-page-wrap {
    width: 1180px;
    border-radius: 30px;
    margin: 0 auto;
    overflow: hidden;
  }
`;

const MainPageContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .calendar-and-meals-wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;

    .calendar-wrap {
      min-width: 810px;
      background-color: #dee8e9;
      border-radius: 30px;

      padding: 30px;
    }

    .meals-wrap {
      width: 100%;
      background-color: green;
    }
  }
`;

const MainPage = () => {
  return (
    <MainPageStyle>
      {/* 로그인 후 알림장 목록 탭을 위한 공간 */}
      <div className="main-page-fill-space">
        <div className="top-space"></div>
        <div className="bottom-space"></div>
      </div>

      <div className="main-page-wrap">
        <MainPageContents>
          <div className="calendar-and-meals-wrap">
            <div className="calendar-wrap">
              <MainScheduleView />
            </div>
            <div className="meals-wrap">{/* <MainScheduleView /> */}</div>
          </div>
          MainPage
        </MainPageContents>
      </div>
    </MainPageStyle>
  );
};

export default MainPage;
