import { useEffect, useState } from "react";

const HomeAdressFields = ({
  children,
  setZoneCode,
  setAddr,
  setDetail,
  detail,
}) => {
  const [postCode, setPostCode] = useState("우편번호");
  const [address, setAddress] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const handleClick = async e => {
    e.preventDefault();
    // 주소찾기 팝업
    new daum.Postcode({
      oncomplete: function (data) {
        var roadAddr = data.roadAddress;
        var extraRoadAddr = "";
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }
        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        setPostCode(data.zonecode);
        setZoneCode(data.zonecode);
        setAddress(roadAddr);
      },
    }).open();
  };
  // const addrSet = () => {
  //   setAddr(`${address} ${detailedAddress}`);
  // };
  // useEffect(() => {
  //   addrSet();
  // }, [detailedAddress]);
  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">주소(선택)</div>
      </div>
      <div className="signup-main-fields-homeadress">
        <div className="fieleds-homeadress-postcodewrap">
          <div className="fieleds-homeadress-postcode">{postCode}</div>
          <button
            className="homeadress-postcode-bt"
            onClick={e => {
              handleClick(e);
            }}
          >
            우편번호 찾기
          </button>
        </div>
        <input
          className="fieleds-homeadress-adress"
          placeholder={"주소"}
          value={address}
          readOnly
        />
        <input
          className="fieleds-homearess-input"
          type="text"
          placeholder={children}
          // value={detailedAddress}
          value={detail}
          onChange={e => {
            // setDetailedAddress(e.target.value);
            setDetail(e.target.value);
          }}
        ></input>
      </div>
    </div>
  );
};

export default HomeAdressFields;
