import styled from "@emotion/styled";
import ViewPw from "components/common/ViewPw";
import { useEffect, useState } from "react";
import "../../scss/teacher/teacheredit.css";

import PwChangeModal from "components/modal/PwChangeModal";
import NotBgClickModal from "components/modal/NotBgClickModal";
import DefaultModal from "components/modal/DefaultModal";

const StudentsInfoStyle = styled.div`
  /* display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 120px;
  width: 100%;
  height: 100%; */

  /* .re-pw-btn {
    & button {
      width: 2000px;
    }
  } */
  .Modal {
    position: absolute;
    width: 500px;
    height: 500px;
    background: red;
  }
`;

const TeacherEdit = () => {
  const [isPwChangeModal, setIsPwChangeModal] = useState(false);
  const showPwChangeModal = () => {
    setIsPwChangeModal(!isPwChangeModal);
  };
  const pwChangeModalCancel = e => {
    setIsPwChangeModal(false);
  };

  // 반 정보 > 추후 데이터 받아와서 처리
  const gradeClass = "5학년 7반";

  // 학생 더미 데이터
  const readOnlyInfo = {
    firstSignup: "2024년 06월 24일 오후 4시 45분",
    userId: "kimgreen010101",
    currentClass: "5학년 7반 | 담임 : 황준하",
  };

  /** 비밀번호 변경 모달 생성 */
  const pwChangeModal = () => {};

  return (
    <StudentsInfoStyle>
      {/* {isPwChangeModal ? (
        <NotBgClickModal cancel={pwChangeModalCancel} />
      ) : null} */}
      {/* {isPwChangeModal ? <PwChangeModal cancel={pwChangeModalCancel} /> : null} */}
      {isPwChangeModal ? <DefaultModal cancel={pwChangeModalCancel} /> : null}
      <div className="main-core teacher-edit-wrap">
        <div className="student-list-title">
          <span>개인 정보 관리</span>
        </div>
        {/* <!-- 신상정보 전체 레이아웃 --> */}
        <div className="user-info-wrap">
          {/* <!-- 탭 선택 부분 --> */}
          <div className="user-info-tap">
            <div className="property">
              <div className="frame">
                <div className="text-wrapper">신상 정보</div>
              </div>
              <div className="info-button .re-pw-btn">
                <button
                  onClick={() => {
                    showPwChangeModal();
                    // pwChangeModal();
                  }}
                  className="re-pw-btn"
                >
                  비밀번호 수정
                </button>
              </div>
            </div>

            <div className="info-button">
              <button>저장</button>
              <button>취소</button>
            </div>
          </div>
          <div className="info-contain-top">
            <div className="info-item-top">
              <div className="info-title">
                <span>교사명</span>
                <input
                  type="text"
                  name="text"
                  placeholder="이름을 입력해주세요"
                />
                <div className="form-check">
                  <input
                    className="form-check-gender"
                    type="radio"
                    name="chk_info"
                    value="남자"
                  />
                  남자
                  <input
                    className="form-check-gender"
                    type="radio"
                    name="chk_info"
                    value="여자"
                  />
                  여자
                </div>
              </div>
              <div className="info-title">
                <span>생년월일</span>
                <input type="date" name="date" />
              </div>
              <div className="info-title">
                <span>전화번호</span>
                <input
                  type="number"
                  name="tel"
                  placeholder="전화번호를 입력해주세요"
                />
              </div>
            </div>
            <div className="info-item-right">
              <div className="info-title">
                <span>담당 학년</span>
                <input type="text" name="text" placeholder="" />
              </div>
              <div className="info-title">
                <span>담당 학급</span>
                <input type="text" name="text" placeholder="" />
              </div>
              <div className="info-title">
                <span></span>
                {/* <input type="number" name="tel" placeholder="" /> */}
              </div>
            </div>
            <div className="info-img">사진</div>
          </div>
          <div className="info-contain-mid">
            <div className="info-item-mid">
              <div className="info-title">
                <span>주소</span>
                <div className="add-form">
                  <div>
                    <input type="text" name="text" placeholder="" />
                    <button type="button">우편번호 찾기</button>
                  </div>
                  <input
                    type="text"
                    name="text"
                    placeholder=""
                    className="info-add"
                  />
                  <input
                    type="text"
                    name="text"
                    placeholder="상세주소를 입력해주세요."
                    className="info-add"
                  />
                </div>
              </div>
              <div className="info-title"></div>
            </div>
          </div>
          <div className="info-contain-top">
            <div className="info-item-bottom">
              <div className="info-title">
                <span>아이디</span>
              </div>
              <div className="info-title"></div>
            </div>
          </div>
          <div className="info-contain-top">
            <div className="info-none-modify">
              <div className="info-title">
                <span></span>
                <div></div>
              </div>
            </div>
          </div>
          <div className="info-contain-top">
            <div className="info-none-modify">
              <div className="info-title">
                <span>아이디</span>
                <div>{readOnlyInfo.userId}</div>
              </div>
            </div>
          </div>
          <div className="info-contain-top">
            <div className="info-none-modify" id="info-none-modify-last">
              <div className="info-title">
                <span></span>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentsInfoStyle>
  );
};

export default TeacherEdit;
