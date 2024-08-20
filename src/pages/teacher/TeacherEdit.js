import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import "../../scss/teacher/teacheredit.css";
import { getTeacherInfo } from "api/teacher/teacherapi";
import PhoneInputFields from "pages/student/PhoneInputFields";
import { useDispatch, useSelector } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderProfile from "components/layout/header/HeaderProfile";
import Footer from "components/layout/Footer";
import usePreventGoBack from "hooks/common/usePreventGoBack";
import usePreventRefresh from "hooks/common/usePreventRefresh";

const StudentsInfoStyle = styled.div`
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
        /* border-bottom: none; */
      }
      input[id="domain-txt"] {
        margin-left: 0px;
      }

      .email-warn-msg-div {
        border-color: #f9957f !important;
        background-color: #fff0ef !important;
      }

      .email-warn-msg {
        color: #f6532b;
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
  .no-edit-class {
    pointer-events: none;
    background-color: #efece8 !important;
  }
  .gender-style {
    margin-left: 0px !important;
    input {
      width: 25px !important;
    }
    /* width: auto; */
  }
`;

const TeacherEdit = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modalSlice);

  const emailText = useRef();
  const emailDomain = useRef();
  const emailDomainText = useRef();

  // 여기서부터 코드 수정
  const [birth, setBirth] = useState("");
  const [classNum, setClassNum] = useState("");
  const [classGrade, setClassGrade] = useState("");
  const [gender, setGendar] = useState("");
  const [userId, setUserId] = useState("");

  // 업데이트 되는 정보 (5가지)
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [addr, setAddr] = useState("");
  const [subAddr, setSubAAddr] = useState("");

  // 이미지
  const [studentPic, setStudentPic] = useState();

  // 이메일 에러 메세지
  const [errMsg, setErrMsg] = useState("");

  usePreventGoBack(
    "페이지 이동 전 저장 버튼을 누르지 않으면 내용이 저장되지 않습니다.",
  );
  usePreventRefresh();

  /** 선생님 정보 추출 */
  const nowUserInfo = async () => {
    try {
      const res = await getTeacherInfo();

      setBirth(res.data.birth);

      if (res.data.addr) {
        setZoneCode(res.data.addr.split(" # ")[0]);
        setAddr(res.data.addr.split(" # ")[1]);
        setSubAAddr(res.data.addr.split(" # ")[2]);
      }

      setGendar(res.data.gender);
      setUserId(res.data.uid);

      // 담당 학년 / 학급
      if (res.data.class === null) {
        setClassGrade("미등록");
        setClassNum("미등록");
      } else {
        setClassGrade(res.data.class);
        setClassNum(res.data.grade);
      }

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

  /** 최초 랜더링 */
  useEffect(() => {
    nowUserInfo();
    window.scrollTo(0, 0);
  }, []);

  /** 모달 종료 후 갱신 */
  useEffect(() => {
    if (modalState.modalRes[0] === false) {
      nowUserInfo();

      // if (emailDomain.current.value !== "type") {
      //   emailDomainText.current.classList = "box is-none";
      // } else {
      //   emailDomainText.current.value = "";
      //   emailDomainText.current.classList = "box";
      // }
    }
  }, [modalState.modalRes[0]]);

  /** 저장 기능 */
  const saveInfo = (selectModalType, newEamil) => {
    const addAddr = `${addr} # ${subAddr}`;

    // 기본 이메일과 중복 확인
    if (email === newEamil) {
      console.log("중복 이메일입니다.");

      const data = {
        bodyText: ["정보를 수정하시겠습니까?"],
        modalRes: [
          11,
          { name: userName, phone: phoneNum, zoneCode, addr: addAddr },
        ],
        buttonText: ["수정", "취소"],
      };
      dispatch(updateModalDate(data));
    } else {
      const data = {
        bodyText: ["정보를 수정하시겠습니까?"],
        modalRes: [
          11,

          {
            name: userName,
            phone: phoneNum,
            zoneCode,
            addr: addAddr,
            email: newEamil,
          },
        ],
        buttonText: ["수정", "취소"],
      };
      dispatch(updateModalDate(data));
    }

    dispatch(openModal(selectModalType));
  };

  /** 취소 기능 */
  const modifyCancel = selectModalType => {
    const data = {
      bodyText: ["수정한 내용을 되돌리겠습니까?"],
      modalRes: [10],
      buttonText: ["취소", "닫기"],
    };

    dispatch(updateModalDate(data));
    dispatch(openModal(selectModalType));
  };

  /** 비밀번호 수정 모달 호출 */
  const showModal = selectModalType => {
    const data = { bodyText: [userId], buttonText: ["수정", "취소"] };

    dispatch(updateModalDate(data));

    dispatch(openModal(selectModalType));
  };

  /** 비밀번호가 바뀌었다는 모달 호출  */
  useEffect(() => {
    if (modalState.modalRes[0] === "비밀번호수정완료") {
      const data = {
        bodyText: ["비밀번호 변경에 성공했습니다."],
        headerText: "비밀번호 변경 성공",
        modalRes: [1],
        buttonText: ["확인"],
        buttonCnt: 1,
      };

      dispatch(updateModalDate(data));
      dispatch(openModal("BasicModal"));
    }
  }, [modalState.modalRes]);

  /** 우편번호 찾기 - 팝업 */
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
        setZoneCode(data.zonecode);
        setAddr(roadAddr);
      },
    }).open();
  };

  /** 이메일 도메인 select */
  const changeEmailDomain = e => {
    if (e.target.value !== "type") {
      emailDomainText.current.classList = "box is-none";
    } else {
      emailDomainText.current.value = "";
      emailDomainText.current.classList = "box";
    }
  };

  /** 이메일 체크 */
  const cheackInfo = e => {
    if (emailDomain.current.value === "type") {
      const newEmail = `${emailText.current.value}@${emailDomainText.current.value}`;
      handleOnChange(newEmail);
    } else {
      const newEmail = `${emailText.current.value}@${emailDomain.current.value}`;
      handleOnChange(newEmail);
    }
  };

  /** 이메일 유효성 검사 */
  const handleOnChange = newEamil => {
    const regex = /^[^\s@]+@[^\s@]+\.(com|net|co\.kr)$/i;
    if (regex.test(newEamil)) {
      setErrMsg("");
      emailText.current.classList = "";
      // emailDomainText.current.classList = "";
      saveInfo("BasicModal", newEamil);
    } else {
      setErrMsg("이메일 형식에 맞지 않습니다");
      emailText.current.classList = "email-warn-msg-div";
      emailDomainText.current.classList = "email-warn-msg-div";
      emailText.current.focus();
      emailDomainText.current.focus();
    }
  };

  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <HeaderProfile />
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
                  <div className="form-check gender-style">
                    <input
                      className="no-edit-class"
                      type="text"
                      name="text"
                      value={gender}
                    />
                  </div>
                </div>
                <div className="info-title">
                  <span>생년월일</span>
                  <input
                    type="date"
                    name="date"
                    value={birth}
                    className="no-edit-class"
                    // onChange={e => setBirth(e.target.value)}
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
                  <span>아이디</span>
                  <input
                    type="text"
                    name="text"
                    placeholder=""
                    value={userId}
                    className="no-edit-class"
                    // onChange={e => setClassGrade(e.target.value)}
                  />
                </div>
                <div className="info-title">
                  <span>담당 학년</span>
                  <input
                    type="text"
                    name="text"
                    placeholder=""
                    value={classGrade}
                    className="no-edit-class"
                    // onChange={e => setClassGrade(e.target.value)}
                  />
                </div>
                <div className="info-title">
                  <span>담당 학급</span>
                  <input
                    type="text"
                    name="text"
                    placeholder=""
                    value={classNum}
                    className="no-edit-class"
                    // onChange={e => setClassNum(e.target.value)}
                  />
                </div>
              </div>
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
                      <div className="email-warn-msg">{errMsg}</div>
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
                      value={subAddr}
                      onChange={e => {
                        setSubAAddr(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StudentsInfoStyle>
      <Footer />
    </>
  );
};

export default TeacherEdit;
