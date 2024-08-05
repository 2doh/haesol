import { useEffect } from "react";

/** 새로고침 및 창닫기 막기 */
const usePreventRefresh = () => {
  // 새로고침 막기 변수
  const preventClose = e => {
    e.preventDefault();
    e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
  };

  useEffect(() => {
    window.addEventListener("beforeunload", preventClose);

    // 브라우저에 렌더링 시 한 번만 실행하는 코드
    // (() => {
    //   window.addEventListener("beforeunload", preventClose);
    // })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);
};
export default usePreventRefresh;
