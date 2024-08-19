import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import { getCookie } from "utils/cookie";

const OnlineMainTopStyle = styled.div`
  position: relative;
  /* z-index: 999; */
  z-index: 0;

  min-height: 150px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .search-container {
    margin: 0 20px;

    background: #fff;
    height: 60px;
    border-radius: 30px;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.8s;
    box-shadow:
      4px 4px 6px 0 rgba(255, 255, 255, 0.3),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
      inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
  }

  .search-container .search-input {
    background: transparent;
    border: none;
    outline: none;
    width: 400px;
    font-weight: 500;
    font-size: 16px;
    transition: 0.8s;

    &::placeholder {
      color: gray;
    }
  }

  .search-container .search-btn .fas {
    color: #5cbdbb;
  }

  .button-51 {
    width: 100px;
    height: 100px;
  }

  .history-button {
    min-width: 100px;
  }
  .search-button {
    min-width: 52px;
  }
  /* .search-button {
    text-align: center;
  }
  .search-button button {
    width: 48px;
    height: 48px;
    color: #61677c;
    box-shadow:
      -5px -5px 20px #ffffff,
      5px 5px 20px #babecc;
    border: none;
    outline: none;
    padding: 16px;
    background: #ebecf0;
    border-radius: 8px;
    cursor: pointer;
    margin: 8px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 19px;
    transition: all 0.2s ease-in-out;
  }
  .search-button button:hover {
    box-shadow:
      -2px -2px 5px #fff,
      2px 2px 5px #babecc;
  }
  .search-button button:active {
    box-shadow:
      inset -1px -1px 2px #babecc,
      inset -1px -1px 2px #fff;
  } */
`;

const OnlineMainTop = () => {
  const navigate = useNavigate();

  const movePage = (pageNum, pageName) => {
    if (getCookie("accessToken")) {
      alert("준비중인 서비스입니다.");
    } else {
      navigate("/login");
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <OnlineMainTopStyle>
      {/* <button className="button-51" role="button">
        <span className="button-51__Content">
          <span className="button-51__Text text">Button 51</span>
        </span>
      </button> */}
      <div
        className="history-button"
        onClick={() => {
          movePage();
        }}
      >
        <button className="button-27" role="button">
          <span className="text">
            {/* <FaSearch /> */}
            시험 기록
          </span>
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          name="search"
          placeholder="검색어를 입력해주세요."
          className="search-input"
        />
        <a href="#" className="search-btn">
          <i className="fas fa-search"></i>
        </a>
      </div>
      <div
        className="search-button"
        onClick={() => {
          movePage();
        }}
      >
        <button className="button-27" role="button">
          <FaSearch />
        </button>
        {/* <button>
          <i className="fa fa-search">
            <FaSearch />
          </i>
        </button> */}
      </div>
    </OnlineMainTopStyle>
  );
};

export default OnlineMainTop;
