import styled from "@emotion/styled";
import "../scss/main/home.scss";

const HomeStyle = styled.div``;

const Home = () => {
  return (
    <HomeStyle>
      <div className="main">
        <div className="main-inner">
          <div className="main-inner-class">
            <div className="main-schedule">
              <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text ">학교 일정</div>
              </div>
              <div className="main-title-dwon-contents main-schedule-calendar"></div>
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
            <div className="main-login-user-info">
              {/* <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text">학교 일정</div>
              </div> */}
              <div className="main-inner-info-login">
                <div className="login-inner">
                  <div className="main-info-loginbt">로그인 해주세요</div>
                  <div className="main-info-loginmenu">
                    <div className="id-inquiry-page-move">아이디 찾기</div>
                    <div className="pw-inquiry-page-move">비밀번호 찾기</div>
                    <div className="signup-page-move">회원가입</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-info-lunch">
              <div className="main-info-lunch-title"></div>
              <div className="main-info-lunch-menu"></div>
            </div>
          </div>
          {/* 메인 오른쪽 영역 - end */}
        </div>
      </div>
    </HomeStyle>
  );
};

export default Home;
