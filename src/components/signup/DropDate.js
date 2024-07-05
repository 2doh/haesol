// 시간적 여유가 생긴다면, 윤달을 4년마다 적용시키도록 코드 추가

import styled from "@emotion/styled";
import { useState } from "react";

const DropDate = ({ children }) => {
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState("");
  let year = [];
  for (let i = currentYear; i >= currentYear - 80; i--) {
    year = [...year, i];
  }

  let month = [];
  for (let i = 1; i <= 12; i++) {
    month = [...month, i];
  }

  const last = new Date(currentYear, selectedMonth, 0).getDate();
  let day = [];
  for (let i = 1; i <= last; i++) {
    day = [...day, i];
  }

  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">{children}(선택)</div>
      </div>
      <DropDateStyle>
        <select className="fields-section-drop">
          <option value="none" hidden>
            년
          </option>
          {year.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
        <select
          className="fields-section-drop"
          value={selectedMonth}
          onChange={e => {
            setSelectedMonth(e.target.value);
          }}
        >
          <option value="none" hidden>
            월
          </option>
          {month.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select className="fields-section-drop">
          <option value="none" hidden>
            일
          </option>
          {day.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </DropDateStyle>
    </div>
  );
};

export default DropDate;

const DropDateStyle = styled.div`
  display: flex;
  gap: 10px;
`;
