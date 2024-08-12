import styled from "@emotion/styled";
import React from "react";

const UserListTop = ({ nowSelectMemu }) => {
  const getHeaderText4 = () => {
    switch (nowSelectMemu) {
      case 2:
        return "입학";
      case 3:
        return "담당 학년";
      default:
        return "학년";
    }
  };
  const getHeaderText5 = () => {
    switch (nowSelectMemu) {
      case 2:
        return "재학중";
      case 3:
        return "담당 학급";
      default:
        return "학급";
    }
  };
  const getHeaderText6 = () => {
    switch (nowSelectMemu) {
      case 2:
        return "가입일";
      case 3:
        return "등록일";
      default:
        return "승인 신청일";
    }
  };
  return (
    <>
      {/* <div className="item"> */}
      <div className={nowSelectMemu === 2 ? "item sing-user-list" : "item"}>
        <div className="grid-inner">
          <div className="grid-inner-item">
            <div className="grid-inner-item-text">
              {nowSelectMemu === 0 || nowSelectMemu === 1 ? "구분" : "상태"}
            </div>
          </div>
          <div className="grid-inner-item">
            <div className="grid-inner-item-text">아이디</div>
          </div>
          <div className="grid-inner-item">
            <div className="grid-inner-item-text">이름</div>
          </div>
          {nowSelectMemu === 2 ? null : (
            <>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">{getHeaderText4()}</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">{getHeaderText5()}</div>
              </div>
            </>
          )}
          <div className="grid-inner-item">
            <div className="grid-inner-item-text">{getHeaderText6()}</div>
          </div>
          <div className="grid-inner-item">
            <div className="grid-inner-item-text">
              {nowSelectMemu === 0 || nowSelectMemu === 1 ? "반려 / 승인" : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListTop;
