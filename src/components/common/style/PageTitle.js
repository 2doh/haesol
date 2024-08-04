import styles from "../../../scss/common/pagetitle.module.css";

const PageTitle = ({ children }) => {
  return (
    <div className={styles.page_title_div}>
      <span className={styles.page_title}>{children}</span>
    </div>
  );
};

export default PageTitle;
