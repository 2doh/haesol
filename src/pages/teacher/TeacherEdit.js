import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "../../scss/teacher/teacheredit.css";

import DefaultModal from "components/modal/DefaultModal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "slices/modalSlice";
import { MODAL_TYPES, modalInfo } from "utils/usemodals";
import Modal from "components/common/Modal";

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
  // const [isPwChangeModal, setIsPwChangeModal] = useState(false);
  const [pwChangeModalResult, setPwChangeModalResult] = useState(false);
  // const modalRes = null;
  // const showPwChangeModal = () => {
  //   setIsPwChangeModal(!isPwChangeModal);
  // };
  // const pwChangeModalCancel = e => {
  //   setIsPwChangeModal(false);
  // };

  // const modalState = useSelector(state => state.modalSlice);
  const dispatch = useDispatch();
  /** 모달 호출 */
  const showModal = selectModalType => {
    const modalRes = dispatch(openModal(selectModalType));
    // console.log("모달 결과 출력 : ", modalRes);
  };

  // const modalInfo = {
  //   headerText: "확인",
  //   bodyTextLabel: ["구분", "아이디"],
  //   // bodyText: ["완료하시겠습니까?"],
  //   bodyText: ["학부모", "acahe1d3"],
  //   // buttonText: ["완료"],
  //   buttonText: ["완료", "취소"],
  //   buttonNum: 2,
  // };

  useEffect(() => {
    if (pwChangeModalResult) {
      // 동작
      console.log("pwChangeModalResult : ", pwChangeModalResult);
      setPwChangeModalResult(false);
    }
  }, [pwChangeModalResult]);

  // 반 정보 > 추후 데이터 받아와서 처리
  const gradeClass = "5학년 7반";

  // 선생님 더미 데이터
  const readOnlyInfo = {
    name: "홍길동",
    phone: "010-0000-0000",
    email: "test1234@naver.com",
    zoneCode: "12345",
    addr: "서울 판교 1234",
  };

  return (
    <StudentsInfoStyle>
      {/* {isPwChangeModal ? (
        <NotBgClickModal
          cancel={pwChangeModalCancel}
          setModalResult={setPwChangeModalResult}
          headerText={modalInfo.headerText}
          bodyTextLabel={modalInfo.bodyTextLabel}
          bodyText={modalInfo.bodyText}
          buttonText={modalInfo.buttonText}
        />
      ) : null} */}
      {/* {isPwChangeModal ? <PwChangeModal cancel={pwChangeModalCancel} /> : null} */}
      {/* {isPwChangeModal ? (
        <DefaultModal
          cancel={pwChangeModalCancel}
          setModalResult={setPwChangeModalResult}
          headerText={modalInfo.headerText}
          bodyText={modalInfo.bodyText}
          buttonText={modalInfo.buttonText}
          buttonNum={modalInfo.buttonNum}
        />
      ) : null} */}
      {/* 테스트 중 */}
      {/* {modalState.isOpen ? <Modal /> : null} */}
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
                    // showModal("BasicModal");
                    // showModal("PasswordChangeModal");
                    // showModal("ArrValueModal");
                    showModal("TelAcceptModal");
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
            <div className="info-none-modify" id="info-none-modify-last">
              <div className="info-title">
                <span>아이디</span>
                <div>{readOnlyInfo.userId}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentsInfoStyle>
  );
};

export default TeacherEdit;
