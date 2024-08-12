import styled from "@emotion/styled";
import { useNavigate } from "react-router";
import Dog from "./Dog";

const NotFoundStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 200px;
  width: 100%;
  height: 100vh;
  background-color: #f3f9fa;

  .not-found-wrap {
    position: absolute;
    bottom: 65%;
    z-index: 999999;

    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 10px;

    h1 {
      font-size: 30px;
      margin-bottom: 20px;
    }

    p {
      font-size: 15px;
    }

    .not-found-btn-wrap {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      gap: 15px;

      a,
      a:visited {
        text-decoration: none;
        color: #00ae68;
        font-size: 15px;
      }

      a.button {
        display: block;
        position: relative;
        float: left;
        width: 120px;
        padding: 0;
        margin: 10px 20px 10px 0;
        font-weight: 600;
        text-align: center;
        line-height: 50px;
        color: #fff;
        border-radius: 5px;
        transition: all 0.2s;
      }

      .btnLightBlue {
        background: #5dc8cd;
      }

      .btnOrange {
        background: #ffaa40;
      }

      .btnLightBlue.btnPush {
        box-shadow: 0px 5px 0px 0px #1e8185;
      }

      .btnOrange.btnPush {
        box-shadow: 0px 5px 0px 0px #a66615;
      }

      .btnPush:hover {
        margin-top: 15px;
        margin-bottom: 5px;
      }

      .btnLightBlue.btnPush:hover {
        box-shadow: 0px 0px 0px 0px #1e8185;
      }

      .btnOrange.btnPush:hover {
        box-shadow: 0px 0px 0px 0px #a66615;
      }

      /* BORDER */

      .btnLightBlue.btnBorder {
        box-shadow: 0px 0px 0px 0px #01939a;
      }

      .btnLightBlue.btnBorder:hover {
        box-shadow: 0px 0px 0px 5px #01939a;
      }

      .btnOrange.btnBorder {
        box-shadow: 0px 0px 0px 0px #a66615;
      }

      .btnOrange.btnBorder:hover {
        box-shadow: 0px 0px 0px 5px #a66615;
      }
    }
  }
`;

const DogWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const NotFound = () => {
  const navigate = useNavigate();
  /** 이전 페이지로 돌아가기 */
  const turnBack = e => {
    e.preventDefault();
    navigate(-1);
  };

  /** 메인 페이지로 이동 */
  const goToMain = e => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <NotFoundStyle>
      <div className="not-found-wrap">
        <h1>죄송합니다. 페이지를 찾을 수 없습니다.</h1>
        <p>존재하지 않은 주소를 입력하셨거나,</p>
        <p>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
        <div className="not-found-btn-wrap">
          <a
            type="button"
            href=""
            title="Button push orange"
            className="button btnPush btnOrange"
            onClick={e => {
              turnBack(e);
            }}
          >
            이전 페이지
          </a>
          <a
            type="button"
            href=""
            title="Button push lightblue"
            className="button btnPush btnLightBlue"
            onClick={e => {
              goToMain(e);
            }}
          >
            메인 페이지
          </a>
        </div>
      </div>
      <DogWrap>
        <Dog></Dog>
      </DogWrap>
    </NotFoundStyle>
  );
};

export default NotFound;
