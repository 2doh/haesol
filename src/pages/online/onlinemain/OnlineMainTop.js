import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";

const OnlineMainTopStyle = styled.div`
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
  }

  .search-container .search-btn .fas {
    color: #5cbdbb;
  }

  .button-51 {
    width: 100px;
    height: 100px;
  }

  .search-button {
    min-width: 70px;
  }
`;

const OnlineMainTop = () => {
  return (
    <OnlineMainTopStyle>
      {/* <button className="button-51" role="button">
        <span className="button-51__Content">
          <span className="button-51__Text text">Button 51</span>
        </span>
      </button> */}
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
      <div className="search-button">
        <button className="button-27" role="button">
          <span className="text">
            {/* <FaSearch /> */}
            검색
          </span>
        </button>
      </div>
    </OnlineMainTopStyle>
  );
};

export default OnlineMainTop;
