import postcode from "api/signup/postcode";
import PostCodeModal from "./PostCodeModal";

const HomeAdressFields = ({ children }) => {
  const handleClick = e => {
    e.preventDefault();
    postcode();
    console.log(postcode);
  };
  return (
    <div className="signup-main-fields">
      <PostCodeModal />
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">주소</div>
      </div>
      <div className="signup-main-fields-homeadress">
        <div className="fieleds-homeadress-postcodewrap">
          <div className="fieleds-homeadress-postcode">우편번호</div>
          <button
            className="homeadress-postcode-bt"
            onClick={e => {
              handleClick(e);
            }}
          >
            우편번호 찾기
          </button>
        </div>
        <div className="fieleds-homeadress-adress">주소</div>
        <input
          className="fieleds-homearess-input"
          type="text"
          placeholder={children}
        ></input>
      </div>
    </div>
  );
};

export default HomeAdressFields;
