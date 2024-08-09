import styled from "@emotion/styled";
import {
  ATPT_OFCDC_SC_CODE,
  KEY,
  MLSV_SERVER_URL,
  SD_SCHUL_CODE,
} from "api/config";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

const MenuStyle = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: #2a1b07;

  width: 100%;
  height: 100%;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;

    gap: 5px;
    background-color: #edecec;
    border-radius: 10px;
  }

  .today-no-menu {
  }

  @media screen and (max-width: 1023px) {
    .today-lunch-menu {
      padding: 20px;
    }
  }
`;

const TodayLunch = () => {
  //   const today = moment().format("YYYYMMDD");
  const today = moment().format("20240701");
  const [menuArr, setMenuArr] = useState([""]);
  //   const [isMenu, setIsMenu] = useState(false);
  const isMenu = useRef();

  useEffect(() => {
    const url = `${MLSV_SERVER_URL}?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${KEY}&MLSV_YMD=${today}&TYPE=JSON`;
    // const url = `${MLSV_SERVER_URL}?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${KEY}&MLSV_YMD=20240707&TYPE=JSON`;
    axios.get(url).then(res => {
      // 급식 데이터가 있는 없는지 확인
      if (res.data.mealServiceDietInfo) {
        // INFO-000
        const menu = res.data.mealServiceDietInfo[1].row[0].DDISH_NM;
        /** <br/>와  (숫자.숫자) 제거 정규 표현식 */
        setMenuArr(
          menu
            .replace(/<br\s*\/?>|\([^)]*\)/gi, "")
            .split(/\s+/)
            .filter(item => item !== ""),
        );
        isMenu.current.classList = "today-lunch-menu";
      } else {
        // INFO-200
        setMenuArr(["오늘은 급식이 없습니다."]);
        isMenu.current.classList = "today-no-menu";
      }
    });
  }, []);

  return (
    <MenuStyle>
      <div ref={isMenu}>
        {isMenu ? null : null}
        {menuArr.map((item, index) => (
          <p className="text-wrapper" key={index}>
            {item}
          </p>
        ))}
        {/* <p className="text-wrapper">꽃맛살 겨자냉채</p>
              <p className="text-wrapper">후르츠탕수육</p>
              <br></br>
              <p className="text-wrapper sub-menu">단무지</p>
              <p className="text-wrapper sub-menu">배추김치</p>
              <p className="text-wrapper sub-menu">오이냉국</p> */}
      </div>
    </MenuStyle>
  );
};

export default TodayLunch;
