import styled from "@emotion/styled";
import TodayLunch from "./TodayLunch";
import moment from "moment";
import img1 from "../../../images/home/spoon-and-chopsticks.png";
import img2 from "../../../images/home/bibimbap.png";

const LunchViewStyle = styled.div`
  padding: 20px 20px 0px 20px;
  height: 100%;

  .meals-title {
    width: 100%;

    display: flex;
    height: 18%;
    flex-direction: row;
    padding: 25px 0 0cqmax 0;
    /* padding: 10px 0 3cqmax 0; */
    justify-content: center;

    p {
      position: relative;
      left: -15px;
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      color: #5f909f;
    }

    #lunchImg01 {
      width: 30px;
      height: 30px;
      transform: rotate(30deg);
      position: relative;
      z-index: 1;
      left: -26px;
    }
    #lunchImg02 {
      width: 60px;
      height: 60px;
      transform: rotate(30deg);
      position: relative;
      z-index: -1;
      left: 8px;
      top: -35px;
    }
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
      <div className="meals-title">
        <img src={img2} id="lunchImg02" />
        <p>오늘의 급식</p>
        <img src={img1} id="lunchImg01" />
      </div>
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
