import styled from "@emotion/styled";

const HeaderTopStyle = styled.div`
  font-size: 17px;
  position: relative;
  z-index: 999;
  height: 70px;
  width: 100%;
  min-width: 900px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f9fa;

  .header-wrap {
    display: flex;
    position: relative;

    max-width: 900px;
    /* min-width: 900px; */
    width: 100%;
    height: 100%;

    .header-logo-div {
      width: inherit;
      height: inherit;
      display: flex;
      align-items: center;
    }
    .header-btn-div {
      position: absolute;
      bottom: 0;
      right: 0;

      display: flex;
      flex-direction: row;
      gap: 5px;

      & > div {
        border: 2px solid #add2d8;
        border-bottom: 0px;
        border-radius: 50px 50px 0px 0px;
        width: 80px;
        height: 50px;
        background-color: white;
      }
    }
  }
`;

const HeaderTopPublic = () => {
  /** 메인 페이지로 이동 */
  const moveHomePage = () => {
    navigate("/");
  };

  return (
    <HeaderTopStyle>
      <div className="header-wrap">
        <div className="header-logo-div">
          <div
            className="logo"
            onClick={() => {
              moveHomePage();
            }}
          ></div>
        </div>
        <div className="header-btn-div">
          <div className="header-seach-btn"></div>
          <div className="header-menu-btn"></div>
        </div>
      </div>
    </HeaderTopStyle>
  );
};

export default HeaderTopPublic;
