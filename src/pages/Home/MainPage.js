import styled from "@emotion/styled";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderProfile from "components/layout/header/HeaderProfile";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import MainScheduleView from "./calendar/MainScheduleView";
import EnglishBookList from "./englishbook/EnglishBookList";
import LunchView from "./lunch/LunchView";
import MiniBannerView from "./minibanner/MiniBannerView";
import PopUpView from "./popup/PopUpView";
import PotoView from "./poto/PotoView";
import "../../scss/main/mainpage.css";
import Footer from "components/layout/Footer";
import ClassNotice from "./ClassNotice";
import QuickMenu from "components/common/quickmenu/QuickMenu";
import { useEffect, useState } from "react";

const MainPageStyle = styled.div`
  width: 100%;

  @media screen and (max-width: 1023px) {
    .calendar-and-meals-wrap {
      display: flex;
      flex-direction: column;
      max-height: auto;

      background-color: red;
    }
  }
`;

const MainPageContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  height: 100%;
`;

const LoginUserMainPageContents = styled.div`
  .main-inner-class {
    width: 700px;
    /* height: 100%; */
  }
`;

const AAAStyle = styled.div`
  .side-bar {
    position: absolute;
    right: 20px; /* 왼쪽 여백 */
    top: 50%;
    z-index: 999999;
    transform: translateY(-50%);
  }
`;

const MainPage = () => {
  const [barPosition, setBarPosition] = useState(510);

  const handleScroll = () => {
    const position = 510 + window.scrollY;
    // const position = 956 < 510 + window.scrollY ? 956 : 510 + window.scrollY;
    setBarPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          {/* <QuickMenu /> */}
          <AAAStyle>
            <div className="side-bar" style={{ top: barPosition }}>
              11111 {/* 내용 */}
            </div>
          </AAAStyle>

          <MainPageContents>
            {/* <LoginUserMainPageContents>
              <div className="main-inner-class">
                <ClassNotice />
              </div>

            </LoginUserMainPageContents> */}

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
        <div className="mini-banner-wrap">
          <MiniBannerView />
        </div>
      </MainPageStyle>
      <Footer />
    </>
  );
};

export default MainPage;
