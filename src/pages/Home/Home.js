import styled from "@emotion/styled";
import "../../scss/main/home.css";
import MainSchedule from "./MainSchedule";
import LoginUser from "./LoginUser";

const HomeStyle = styled.div``;

const Home = () => {
  return (
    <HomeStyle>
      <LoginUser />
      <div className="main">
        <div className="main-inner">
          <div className="main-inner-class">
            <div className="main-schedule">
              <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text ">학교 일정</div>
              </div>
              <div className="main-title-dwon-contents main-schedule-calendar">
                <MainSchedule />
              </div>
            </div>
            <div className="main-activity">
              <div className="main-activity-title main-contents-title">
                <div className="main-schedule-title-text">우리들 활동</div>
              </div>
              <div className="main-title-dwon-contents main-activity-slide"></div>
            </div>
          </div>

          {/* 메인 오른쪽 영역 - start */}
          <div className="main-inner-info">
            {/* 내 정보 - start */}
            <div className="main-login-user-info no-display ">
              {/* <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text">학교 일정</div>
              </div> */}
              <div className="main-inner-info-login">
                <div className="login-inner">
                  <button className="main-info-loginbt">로그인 해주세요</button>
                  <div className="main-info-login-menu">
                    <div className="id-inquiry-page-move">아이디 찾기</div>
                    <div className="pw-inquiry-page-move">비밀번호 찾기</div>
                    <div className="signup-page-move">회원가입</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 추후 수정 */}
            <div className="main-info-lunch ">
              <div className="main-activity-title main-contents-title main-info-lunch-title ">
                <div className="main-schedule-title-text">오늘의 급식</div>
              </div>
              <div className="main-title-dwon-contents main-info-lunch-menu">
                <div className="lunch-today-day">
                  <p className="text-wrapper">24년 6월 26일</p>
                  <p className="text-wrapper">수요일(잔반 없는 날)</p>
                </div>
                <div className="lunch-today-menu">
                  <p className="text-wrapper">짜장볶음밥</p>
                  <p className="text-wrapper">꽃맛살 겨자냉채</p>
                  <p className="text-wrapper">후르츠탕수육</p>
                  <br></br>
                  <p className="text-wrapper sub-menu">단무지</p>
                  <p className="text-wrapper sub-menu">배추김치</p>
                  <p className="text-wrapper sub-menu">오이냉국</p>
                </div>
              </div>
            </div>
          </div>
          {/* 메인 오른쪽 영역 - end */}
        </div>
      </div>
    </HomeStyle>
  );
};

export default Home;
