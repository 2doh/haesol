import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import "../../scss/teacher/teacheredit.css";

import { duplicateEmail, getTeacherInfo } from "api/teacher/teacherapi";
import StudentImg from "pages/student/StudentImg";
import { useDispatch, useSelector } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";
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

  .info-contain-top {
    .info-item-right {
      border-right: solid 2px #886348;
    }
  }
  .info-contain-mid {
    .info-item-mid {
      border-right: solid 2px #886348;

      .email-title > span {
        height: auto;
        padding: 13px 0;
      }

      .addr-title {
        .add-form {
          width: 80%;

          & > input[type="text"] {
            width: 80%;
          }
        }
      }

      .info-title {
        border-bottom: solid 2px #886348;
      }
      .info-title:last-child {
        border-bottom: none;
      }
    }
  }
  .edit-select {
    width: 180px;
    height: 30px;
    padding-left: 5px;
    background: #fbfaf9;
    border-width: 0;
    border: solid 2px #886348;
    /* margin-left: 10px; */
  }

  .is-none {
    display: none;
  }

  .email-add-form {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;

const TeacherEdit = () => {
  const modalState = useSelector(state => state.modalSlice);
  const emailText = useRef();
  const emailDomain = useRef();
  const emailDomainText = useRef();

  // const [isPwChangeModal, setIsPwChangeModal] = useState(false);

  // 비밀번호 수정 버튼
  // const [pwChangeModalResult, setPwChangeModalResult] = useState(false);
  // const [userInfo, setUserInfo] = useState(null);
  // const phoneNum2 = useRef("");
  // const addrNum = useRef("");
  // const addrText = useRef("");
  // const addrDetailText = useRef("");

  // 여기서부터 코드 수정
  const [birth, setBirth] = useState("");
  const [classNum, setClassNum] = useState("");
  const [classGrade, setClassGrade] = useState("");
  const [email, setEmail] = useState(""); // 수정 정보
  const [gender, setGendar] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState(""); // 수정 정보
  const [phoneNum, setPhoneNum] = useState(""); // 수정 정보

  // 우편번호
  const [zoneCode, setZoneCode] = useState(""); // 수정 정보
  // 주소
  const [addr, setAddr] = useState(""); // 수정 정보

  // 이미지
  const [studentPic, setStudentPic] = useState();

  /** 선생님 정보 추출 */
  const nowUserInfo = async () => {
    try {
      const res = await getTeacherInfo();

      setBirth(res.data.birth);
      setZoneCode(res.data.addr.split(" # ")[0]);
      setAddr(res.data.addr.split(" # ")[1]);
      setGendar(res.data.gender);
      setUserId(res.data.id);

      // 담당 학년 / 학급
      if (res.data.class === null) {
        setClassGrade("미등록");
        setClassNum("미등록");
      } else {
        setClassGrade(res.data.class.split(" ")[0]);
        setClassNum(res.data.class.split(" ")[1]);
      }

      // setEmail(res.data.email.split("@"));
      setEmail(res.data.email);
      emailText.current.value = res.data.email.split("@")[0];
      switch (res.data.email.split("@")[1]) {
        case "naver.com":
          emailDomain.current.value = "naver.com";
          break;
        case "google.com":
          emailDomain.current.value = "google.com";
          console.log("네이버 아님");
          break;
        case "hanmail.net":
          emailDomain.current.value = "hanmail.net";
          break;
        case "nate.com":
          emailDomain.current.value = "nate.com";
          break;
        case "kakao.com":
          emailDomain.current.value = "kakao.com";
          break;
        default:
          emailDomain.current.value = "type";
          break;
      }

      setUserName(res.data.name);
      setPhoneNum(res.data.phone);
    } catch (error) {
      console.log(error);
    }
  };

  /** 저장 기능 */
  const saveInfo = (selectModalType, newEamil) => {
    // 기본 이메일과 중복 확인
    if (email === newEamil) {
      console.log("중복 이메일입니다.");

      const data = {
        bodyText: ["정보를 수정하시겠습니까?"],
        modalRes: [11, { name: userName, phone: phoneNum, zoneCode, addr }],
        buttonText: ["수정", "취소"],
      };
      dispatch(updateModalDate(data));
    } else {
      const data = {
        bodyText: ["정보를 수정하시겠습니까?"],
        modalRes: [11, { userName, phoneNum, zoneCode, addr, email: newEamil }],
        buttonText: ["수정", "취소"],
      };
      dispatch(updateModalDate(data));
    }

    dispatch(openModal(selectModalType));
  };

  /** 취소 기능 */
  const modifyCancel = selectModalType => {
    // e.preventDefault();
    // const formData = new FormData();

    /** (선택) 들어갈 내용 수정 */
    const data = {
      bodyText: ["수정한 내용을 되돌리겠습니까?"],
      modalRes: [1],
      buttonText: ["취소", "닫기"],
    };

    dispatch(updateModalDate(data));
    dispatch(openModal(selectModalType));
  };

  useEffect(() => {
    nowUserInfo();
  }, []);

  useEffect(() => {
    if (modalState.modalRes[0] === false) {
      nowUserInfo();
    }
  }, [modalState.modalRes[0]]);

  const dispatch = useDispatch();
  /** 모달 호출 */
  const showModal = selectModalType => {
    /** (선택) 들어갈 내용 수정 */
    const data = { bodyText: [userId] };
    /** (선택) 위와 아래는 세트 */
    dispatch(updateModalDate(data));

    /**(고정) 모달 활성화 */
    const modalRes = dispatch(openModal(selectModalType));
  };

  const [postCode, setPostCode] = useState("우편번호");
  const [address, setAddress] = useState("주소");
  /** 우편번호 찾기 */
  const handleAddClick = e => {
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
        setAddress(roadAddr);
      },
    }).open();
  };

  const changeEmailDomain = e => {
    if (e.target.value !== "type") {
      // 선택한 도메인을 input에 입력하고 disabled
      // emailText.current.value = e.target.value;
      emailDomainText.current.classList = "box is-none";
    } else {
      // 직접 입력 시
      // input 내용 초기화 & 입력 가능하도록 변경
      emailDomainText.current.value = "";
      emailDomainText.current.classList = "box";
      // emailText.current.disabled = false;
    }
  };

  // const [passEmail, setPassEmail] = useState();
  /** 이메일 체크 */
  const cheackInfo = e => {
    if (emailDomain.current.value === "type") {
      const newEmail = `${emailText.current.value}@${emailDomainText.current.value}`;
      handleOnChange(newEmail);
      // emailDomainText.current.value;
    } else {
      const newEmail = `${emailText.current.value}@${emailDomain.current.value}`;
      handleOnChange(newEmail);
      // emailDomain.current.value;
    }
  };

  const [errMsg, setErrMsg] = useState("");
  /** 이메일 유효성 검사 */
  const handleOnChange = newEamil => {
    const regex = /^[^\s@]+@[^\s@]+\.(com|net|co\.kr)$/i;
    if (regex.test(newEamil)) {
      setErrMsg("");
      saveInfo("BasicModal", newEamil);
    } else {
      setErrMsg("이메일 형식에 맞지 않습니다");
    }
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
                    showModal("PasswordChangeModal");
                  }}
                  className="re-pw-btn"
                >
                  비밀번호 수정
                </button>
              </div>
            </div>

            <div className="info-button">
              <button
                onClick={e => {
                  cheackInfo(e);
                }}
              >
                저장
              </button>
              <button
                onClick={e => {
                  modifyCancel("BasicModal");
                  // nowUserInfo();
                }}
              >
                취소
              </button>
            </div>
          </div>
          <div className="info-contain-top">
            <div className="info-item-top">
              <div className="info-title">
                <span>교사명</span>
                <input
                  value={userName}
                  type="text"
                  name="text"
                  placeholder="이름을 입력해주세요"
                  onChange={e => {
                    setUserName(e.target.value);
                  }}
                />
                {/* 고정값 */}
                <div className="form-check">
                  <input
                    checked={gender === "남"}
                    className="form-check-gender"
                    type="radio"
                    name="chk_info"
                    value="남"
                  />
                  남자
                  <input
                    checked={gender === "여"}
                    className="form-check-gender"
                    type="radio"
                    name="chk_info"
                    value="여"
                  />
                  여자
                </div>
              </div>
              <div className="info-title">
                <span>생년월일</span>
                <input
                  type="date"
                  name="date"
                  value={birth}
                  onChange={e => setBirth(e.target.value)}
                />
              </div>
              <div className="info-title">
                <span>전화번호</span>
                <PhoneInputFields
                  placeholder="전화번호를 입력하세요"
                  phoneNum={phoneNum}
                  setPhoneNum={setPhoneNum}
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
                  value={classGrade}
                  onChange={e => setClassGrade(e.target.value)}
                />
              </div>
              <div className="info-title">
                <span>담당 학급</span>
                <input
                  type="text"
                  name="text"
                  placeholder=""
                  value={classNum}
                  onChange={e => setClassNum(e.target.value)}
                />
              </div>
              <div className="info-title">
                <span></span>
                {/* <input type="number" name="tel" placeholder="" /> */}
              </div>
            </div>
            {/* <div className="info-img"><StudentImg /></div> */}
          </div>
          <div className="info-contain-mid">
            <div className="info-item-mid">
              <div className="info-title email-title">
                <span>이메일</span>
                <div className="add-form">
                  <div className="email-add-form">
                    <input
                      type="text"
                      name="text"
                      placeholder=""
                      ref={emailText}
                    />
                    <div>@</div>
                    <input
                      className="box is-none"
                      id="domain-txt"
                      type="text"
                      name="text"
                      placeholder=""
                      ref={emailDomainText}
                    />
                    <select
                      className="edit-select"
                      id="domain-list"
                      ref={emailDomain}
                      onChange={e => {
                        changeEmailDomain(e);
                      }}
                    >
                      <option value="type">직접 입력</option>
                      <option value="naver.com">naver.com</option>
                      <option value="google.com">google.com</option>
                      <option value="hanmail.net">hanmail.net</option>
                      <option value="nate.com">nate.com</option>
                      <option value="kakao.com">kakao.com</option>
                    </select>
                    <div>{errMsg}</div>
                  </div>
                </div>
              </div>
              <div className="info-title addr-title">
                <span>주소</span>
                <div className="add-form">
                  <div>
                    <input
                      type="text"
                      name="text"
                      placeholder=""
                      value={zoneCode}
                    />
                    <button
                      type="button"
                      onClick={e => {
                        handleAddClick(e);
                      }}
                    >
                      우편번호 찾기
                    </button>
                  </div>
                  <input
                    type="text"
                    name="text"
                    placeholder=""
                    className="info-add"
                    value={addr}
                  />
                  <input
                    type="text"
                    name="text"
                    placeholder="상세주소를 입력해주세요."
                    className="info-add"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="info-contain-top">
            <div className="info-none-modify" id="info-none-modify-last">
              <div className="info-title">
                <span>아이디</span>
                <div>{userId}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentsInfoStyle>
  );
};

export default TeacherEdit;
