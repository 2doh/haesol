import styled from "@emotion/styled";

import EnglishBook from "./EnglishBook";
import EnglishBookImg from "../../../images/home/pngtree-books.png";

const EnglishBookListStyle = styled.div`
  width: 100%;
  height: 100%;

  background-color: #eaf0f1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title-wrap {
    width: 100%;
    min-height: 90px;
    height: 60px;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;

    p {
      font-size: 40px;
      color: #1b4957;
      font-weight: bold;
      z-index: 2;
      position: absolute;
    }
    .english-book-img {
      width: 120px;
      height: 120px;
      z-index: 1;
      top: -5px;
      left: -138px;
      position: relative;
    }
  }

  .book-wrap {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 40px;
    color: #1b4957;
    font-weight: bold;
  }
`;

const EnglishBookList = () => {
  return (
    <EnglishBookListStyle>
      <div className="title-wrap">
        <img src={EnglishBookImg} className="english-book-img"></img>
        <p>English Book</p>
      </div>
      <div className="book-wrap">
        <EnglishBook />
      </div>
    </EnglishBookListStyle>
  );
};

export default EnglishBookList;
