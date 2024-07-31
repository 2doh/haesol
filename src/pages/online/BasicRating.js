import React, { useState } from "react";
import { Rate } from "antd";
import styled from "@emotion/styled";

const StarStyle = styled.div`
  /* 회색 별 */
  .ant-rate-star-zero {
    path {
      color: rgba(0, 0, 0, 0.3);
    }
  }

  /* 노란 별 */
  .ant-rate-star-full {
    path {
      color: #ffaa00;
    }
  }
`;

const BasicRating = () => {
  const [value, setValue] = useState(3);
  return (
    <StarStyle>
      <div className="wrapper">
        <div className="flex">
          <Rate
            className="rate-style"
            // tooltips={desc}
            onChange={setValue}
            value={value}
          />
          {/* {value ? <span>{desc[value - 1]}</span> : null} */}
        </div>
      </div>
    </StarStyle>
  );
};

export default BasicRating;
