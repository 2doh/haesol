import styled from "@emotion/styled";

const HeaderMemuStyle = styled.div`
  font-size: 17px;
  position: relative;
  z-index: 999;
  height: 65px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f9fa;

  .header-menu-wrap {
    display: flex;
    position: absolute;
    left: 0;

    max-width: 1400px;
    min-width: 1000px;

    border-radius: 0px 50px 50px 0px;

    width: 100%;
    height: 100%;
    background-color: #5f909f;
    
    margin-right: 60px;

    .header-menu-inner {
      display: flex;
      justify-content: center;

      position: relative;
      width: 100%;

      height: 100%;
      overflow: hidden;
      margin-right: 130px;
      /* padding: 0px 180px; */

      ul {
        position: absolute;
        right: 0px;
        height: 100%;
        min-width: 70%;
        width: 100%;
        max-width: 900px;

        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }

      ul > li {
        white-space: nowrap;
        font-size: 22px;
        color: white;
      }
    }
  }
`;

const HeaderMemu = () => {
  return (
    <HeaderMemuStyle>
      <div className="header-menu-wrap">
        <nav className="header-menu-inner">
          <ul>
            <li>알림 마당</li>
            <li>학생 마당</li>
            <li>학부모 마당</li>
            <li>선생님 마당</li>
            <li>온라인 학습</li>
          </ul>
        </nav>
      </div>
    </HeaderMemuStyle>
  );
};

export default HeaderMemu;
