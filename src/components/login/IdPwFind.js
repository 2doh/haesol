import { useNavigate } from "react-router";
import FindId from "./FindId";
import FindPass from "./FindPass";
const IdPwFind = naviState => {
  const navi = useNavigate();
  return (
    <>
      {naviState.naviState === "find-id" ? (
        <FindId></FindId>
      ) : naviState.naviState === "find-pass" ? (
        <FindPass></FindPass>
      ) : (
        navi("*")
      )}
    </>
  );
};
export default IdPwFind;
