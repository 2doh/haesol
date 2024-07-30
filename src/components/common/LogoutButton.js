import { MdOutlineLogout } from "react-icons/md";
import { logout } from "./Logout";

const LogoutButton = () => {
  return (
    <div
      className="logout-icon"
      onClick={() => {
        logout();
      }}
    >
      <MdOutlineLogout size="100%" title="로그아웃" />
    </div>
  );
};

export default LogoutButton;
