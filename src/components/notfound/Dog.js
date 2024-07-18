import React from "react";
import styles from "../../scss/notfound/dog.module.css";

const Dog = () => {
  return (
    <div className={styles.dog}>
      <div className={styles.dog__paws}>
        <div className={`${styles.dog__bl_leg} ${styles.leg}`}>
          <div className={`${styles.dog__bl_paw} ${styles.paw}`}></div>
          <div className={`${styles.dog__bl_top} ${styles.top}`}></div>
        </div>
        <div className={`${styles.dog__fl_leg} ${styles.leg}`}>
          <div className={`${styles.dog__fl_paw} ${styles.paw}`}></div>
          <div className={`${styles.dog__fl_top} ${styles.top}`}></div>
        </div>
        <div className={`${styles.dog__fr_leg} ${styles.leg}`}>
          <div className={`${styles.dog__fr_paw} ${styles.paw}`}></div>
          <div className={`${styles.dog__fr_top} ${styles.top}`}></div>
        </div>
      </div>
      <div className={styles.dog__body}>
        <div className={styles.dog__tail}></div>
      </div>

      <div className={styles.dog__head}>
        <div className={styles.dog__snout}>
          <div className={styles.dog__nose}></div>
          <div className={styles.dog__eyes}>
            <div className={styles.dog__eye_l}></div>
            <div className={styles.dog__eye_r}></div>
          </div>
        </div>
      </div>
      <div className={styles.dog__head}>
        {/* Place ears inside the head container */}
        <div className={styles.dog__ear_l}></div>
        <div className={styles.dog__ear_r}></div>
      </div>
    </div>
  );
};

export default Dog;
