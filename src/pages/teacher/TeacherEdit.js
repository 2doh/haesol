import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import "../../scss/teacher/teacheredit.css";

import { getTeacherInfo } from "api/teacher/teacherapi";
import StudentImg from "pages/student/StudentImg";
import { useDispatch } from "react-redux";
import { openModal } from "slices/modalSlice";
import PhoneInputFields from "pages/student/PhoneInputFields";

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
  const [userInfo, setUserInfo] = useState(null);
  const [phoneNum, setPhoneNum] = useState();
  const userName = useRef("");
  const genM = useRef("");
  const genW = useRef("");
  const birth = useRef("");
  const addrNum = useRef("");
  const addrText = useRef("");
  const addrDetailText = useRef("");
  const classNum = useRef("");
  const classGrade = useRef("");

  /** 선생님 정보 추출 */
  const nowUserInfo = async () => {
    try {
      const res = await getTeacherInfo();
      // setUserInfo(res.data);
      console.log("받은 데이터 확인 : ", res.data);
      // setUserName(res.data.name);
      if (res.data.gender === "여") {
        genW.current.checked = true;
      }
      if (res.data.gender === "남") {
        genM.current.checked = true;
      }
      userName.current.value = res.data.name;
      birth.current.value = res.data.birth;
      setPhoneNum(res.data.phone.replace(/-/g, ""));
      addrNum.current.value = res.data.addr.split("#")[0];
      addrText.current.value = res.data.addr.split("#")[1];
      if (res.data.addr.split("#")[2]) {
        addrDetailText.current.value = res.data.addr.split("#")[2];
      } else {
        addrDetailText.current.value = "";
      }
      classGrade.current.value = res.data.class.split(" ")[0];
      classNum.current.value = res.data.class.split(" ")[1];
      userId.current.value = res.data.id;
      console.log(userId.current.value);
      // phone.current.value = Number(res.data.phone);
    } catch (error) {
      console.log(error);
    }
    // = await getTeacherInfo();

    // return res;
  };

  const aaa = () => {
    let formattedNumber = e.target.value.replace(/[^0-9]/g, "");
    if (formattedNumber.length > 3 && formattedNumber.length <= 7) {
      formattedNumber = formattedNumber.replace(/^(\d{3})(\d{1,4})/, "$1-$2");
    } else if (formattedNumber.length > 7) {
      formattedNumber = formattedNumber.replace(
        /^(\d{3})(\d{4})(\d{1,4})/,
        "$1-$2-$3",
      );
    }
  };

  useEffect(() => {
    // const res = nowUserInfo();
    nowUserInfo();
    // console.log("결과값 : ", res);
  }, []);

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
    /** (선택) 들어갈 내용 수정 */
    // const data = { bodyTextLabel: ["변경값"] };
    /** (선택) 위와 아래는 세트 */
    // dispatch(updateModalDate(data));

    /**(고정) 모달 활성화 */
    const modalRes = dispatch(openModal(selectModalType));
    console.log("모달 결과 출력 내용 확인 : ", modalRes);
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

  /** 이름 변경 감지 */
  const handleChange = e => {
    // setUserName(e.target.value);
    const val = (userName.current.value = e.target.value);
    console.log("이름 : ", val);
  };

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
                    showModal("PasswordChangeModal");
                    // showModal("ArrValueModal");
                    // showModal("TelAcceptModal");
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
                  ref={userName}
                  type="text"
                  name="text"
                  placeholder="이름을 입력해주세요"
                  // value={userName}
                  // onChange={handleChange}
                />
                <div className="form-check">
                  <input
                    ref={genM}
                    className="form-check-gender"
                    type="radio"
                    name="chk_info"
                    value="남자"
                  />
                  남자
                  <input
                    ref={genW}
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
                <input type="date" name="date" ref={birth} />
              </div>
              <div className="info-title">
                <span>전화번호</span>

                {/* <input
                  type="number"
                  name="tel"
                  placeholder="전화번호를 입력해주세요"
                  ref={phone}
                /> */}
                <PhoneInputFields
                  placeholder="전화번호를 입력하세요"
                  phoneNum={phoneNum}
                  // ref={phone.current.val}
                />
              </div>
            </div>
            <div className="info-item-right">
              <div className="info-title">
                <span>담당 학년</span>
                <input
                  type="text"
                  name="text"
                  placeholder=""
                  ref={classGrade}
                />
              </div>
              <div className="info-title">
                <span>담당 학급</span>
                <input type="text" name="text" placeholder="" ref={classNum} />
              </div>
              <div className="info-title">
                <span></span>
                {/* <input type="number" name="tel" placeholder="" /> */}
              </div>
            </div>
            <div className="info-img">
              <StudentImg />
            </div>
          </div>
          <div className="info-contain-mid">
            <div className="info-item-mid">
              <div className="info-title">
                <span>주소</span>
                <div className="add-form">
                  <div>
                    <input
                      type="text"
                      name="text"
                      placeholder=""
                      ref={addrNum}
                    />
                    <button type="button">우편번호 찾기</button>
                  </div>
                  <input
                    type="text"
                    name="text"
                    placeholder=""
                    className="info-add"
                    ref={addrText}
                  />
                  <input
                    type="text"
                    name="text"
                    placeholder="상세주소를 입력해주세요."
                    className="info-add"
                    ref={addrDetailText}
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
                <div>(나중에 리덕스에서 추가하기)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentsInfoStyle>
  );
};

export default TeacherEdit;
