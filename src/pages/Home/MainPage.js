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
import { getCookie } from "utils/cookie";

const MainPageStyle = styled.div`
  width: 100%;
`;

const MainPageContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  height: 100%;

  @media screen and (max-width: 1023px) {
    gap: 0px;
  }
`;

const LoginUserMainPageContents = styled.div`
  .main-inner-class {
    width: 700px;
    /* height: 100%; */
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
          {getCookie("userRole") ? <QuickMenu /> : null}

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
