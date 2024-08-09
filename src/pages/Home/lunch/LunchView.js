import styled from "@emotion/styled";
import TodayLunch from "./TodayLunch";
import moment from "moment";

const LunchViewStyle = styled.div`
  padding: 20px 20px 0px 20px;
  height: 100%;

  .meals-title {
    width: 100%;
    height: 18%;

    text-align: center;
    font-size: 24px;

    padding: 10px 0 3cqmax 0;
    font-weight: 600;
    color: #5f909f;
  }

  .meals {
    width: 100%;
    height: 82%;

    display: flex;
    flex-direction: column;
    align-items: center;

    .today {
      font-size: 18px;
      font-weight: bold;
      padding: 15px;

      background-color: #e1e1e1;
      border-radius: 20px 20px 0 0;
    }

    .today-menu {
      width: 100%;
      height: 100%;
      border: 2px solid #e1e1e1;
      border-radius: 20px 20px 0 0;
      padding: 30px;
    }
  }

  @media screen and (max-width: 1023px) {
    padding: 0px;
  }
`;

const LunchView = () => {
  const mlsvDay = moment().format("YY년 M월 D일");

  return (
    <LunchViewStyle>
      <div className="meals-title">오늘의 급식</div>
      <div className="meals">
        <div className="today">{mlsvDay}</div>
        <div className="today-menu">
          <TodayLunch />
        </div>
      </div>
    </LunchViewStyle>
  );
};

export default LunchView;
