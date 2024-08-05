import styled from "@emotion/styled";
import MainScheduleView from "./calendar/MainScheduleView";
import LunchView from "./lunch/LunchView";
import PopUpView from "./popup/PopUpView";
import PotoView from "./poto/PotoView";
import ParentsProfile from "./profile/ParentsProfile";
import LoginUser from "./LoginUser";
import LoginTeahcer from "./LoginTeahcer";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderProfile from "components/layout/header/HeaderProfile";
import EnglishBookList from "./englishbook/EnglishBookList";
import Footer from "components/layout/Footer";

const MainPageStyle = styled.div`
  width: 100%;
  /* padding-bottom: 100px; */

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

  .english-book-wrap {
    margin-top: 50px;
    height: 400px;
    padding: 20px;
    background-color: #eaf0f1;
  }
`;

const MainPageContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 50px;
  height: 100%;

  .calendar-and-meals-wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    max-height: 450px;

    .calendar-wrap {
      min-width: 810px;
      background-color: #dee8e9;
      border-radius: 30px;
      padding: 30px;
    }

    .lunch-wrap {
      width: 100%;
    }
  }

  .poto-and-pop-up-wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    height: 375px;

    background-color: #bed7dc;
    padding: 5px;

    .poto-wrap {
      min-width: 780px;
    }

    .pop-up-wrap {
      width: 100%;
    }
  }
`;

const MainPage = () => {
  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <HeaderProfile />
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
              <div className="lunch-wrap">
                <LunchView />
              </div>
            </div>

            <div className="poto-and-pop-up-wrap">
              <div className="poto-wrap">
                <PotoView />
              </div>
              <div className="pop-up-wrap">
                <PopUpView />
              </div>
            </div>
          </MainPageContents>
        </div>

        <div className="english-book-wrap">
          <EnglishBookList />
        </div>
      </MainPageStyle>
      {/* <Footer /> */}
    </>
  );
};

export default MainPage;
