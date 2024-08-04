import styled from "@emotion/styled";

import EnglishBook from "./EnglishBook";

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
    align-items: center;

    font-size: 40px;
    color: #1b4957;
    font-weight: bold;
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
      <div className="title-wrap">English Book</div>
      <div className="book-wrap">
        <EnglishBook />
      </div>
    </EnglishBookListStyle>
  );
};

export default EnglishBookList;
