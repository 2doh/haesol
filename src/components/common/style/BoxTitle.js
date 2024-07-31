import styled from "@emotion/styled";
import React from "react";
import styles from "../../../scss/common/boxtitle.module.css";

const BoxTitleStyle = styled.div``;

const BoxTitle = ({ children }) => {
  return (
    <BoxTitleStyle>
      <div className={styles.box_title}>
        <div className={styles.box_title_text}>{children}</div>
      </div>
    </BoxTitleStyle>
  );
};

export default BoxTitle;
