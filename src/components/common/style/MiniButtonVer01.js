import { style } from "@mui/system";

import styles from "../../../scss/common/button.module.css";

const MiniButtonVer01 = ({ buttonClick, nowbutton, buttonLabel }) => {
  return (
    <div className={styles.mini_btn_01}>
      <button
        onClick={() => {
          buttonClick(!nowbutton);
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default MiniButtonVer01;
