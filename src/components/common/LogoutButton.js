import useLogout from "hooks/common/useLogout";
import { MdOutlineLogout } from "react-icons/md";

const LogoutButton = () => {
  return (
    <div
      className="logout-icon"
      onClick={() => {
        useLogout();
      }}
    >
      <MdOutlineLogout size="100%" title="로그아웃" />
    </div>
  );
};

export default LogoutButton;
