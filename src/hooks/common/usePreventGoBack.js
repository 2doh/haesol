import { useEffect } from "react";

/** 뒤로가기 막기 */
const usePreventGoBack = alertMessage => {
  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    const preventGoBack = () => {
      alert(
        alertMessage || "작성 중인 데이터가 있습니다. 페이지를 떠나시겠습니까?",
      );

      history.pushState(null, "", location.href);
    };

    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);
};

export default usePreventGoBack;
