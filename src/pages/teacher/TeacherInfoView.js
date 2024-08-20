import styled from "@emotion/styled";
import { getTeacherInfo } from "api/teacher/teacherapi";
import PageTitle from "components/common/style/PageTitle";
import Footer from "components/layout/Footer";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderProfile from "components/layout/header/HeaderProfile";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import PhoneInputFields from "pages/student/PhoneInputFields";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "../../scss/teacher/teacheredit.css";
import { openModal, updateModalDate } from "slices/modalSlice";

const TeacherInfoViewStyle = styled.div`
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

  .teacher-tel-info {
    & input {
      pointer-events: none;
      background-color: #efece8 !important;
    }
  }
`;

const TeacherInfoView = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const emailText = useRef();
  // const emailDomain = useRef();

  // 여기서부터 코드 수정
  const [birth, setBirth] = useState("");
  const [classNum, setClassNum] = useState("");
  const [classGrade, setClassGrade] = useState("");
  const [gender, setGendar] = useState("");
  const [userId, setUserId] = useState("");

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [addr, setAddr] = useState("");
  const [subAddr, setSubAAddr] = useState("");

  /** 선생님 정보 추출 */
  const nowUserInfo = async () => {
    try {
      const res = await getTeacherInfo();

      console.log("res : ", res);

      setBirth(res.data.birth);

      if (res.data.addr) {
        setZoneCode(res.data.addr.split(" # ")[0]);
        setAddr(res.data.addr.split(" # ")[1]);
        setSubAAddr(res.data.addr.split(" # ")[2]);
      }

      setGendar(res.data.gender);
      setUserId(res.data.id);

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

  /** 수정 기능 */
  const infoEdit = () => {
    navigate("/teacher/infoedit");
  };

  /** 비밀번호 수정 모달 호출 */
  const showModal = selectModalType => {
    // const data = { bodyText: [userId], buttonText: ["수정", "취소"] };
    const data = { bodyText: ["test1234"], buttonText: ["수정", "취소"] };

    dispatch(updateModalDate(data));

    dispatch(openModal(selectModalType));
  };

  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <HeaderProfile />

      <TeacherInfoViewStyle>
        <div className="main-core teacher-edit-wrap">
          <div className="student-list-title">
            <PageTitle>개인 정보 관리</PageTitle>
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
                  onClick={() => {
                    infoEdit();
                  }}
                >
                  수정
                </button>
              </div>
            </div>
            <div className="info-contain-top">
              <div className="info-item-top">
                <div className="info-title">
                  <span>교사명</span>
                  <input
                    disabled
                    className="no-edit-class"
                    value={userName}
                    type="text"
                    name="text"
                  />
                  <div className="form-check gender-style">
                    <input
                      disabled
                      className="no-edit-class box"
                      id="domain-txt"
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
                <div className="info-title teacher-tel-info">
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
                      <input disabled type="text" name="text" ref={emailText} />
                      <div>@</div>
                      <input
                        disabled
                        className="box"
                        id="domain-txt"
                        type="text"
                        name="text"
                        value={email.split("@")[1]}
                      />
                    </div>
                  </div>
                </div>
                <div className="info-title addr-title">
                  <span>주소</span>
                  <div className="add-form">
                    <div>
                      <input
                        disabled
                        type="text"
                        name="text"
                        value={zoneCode}
                      />
                    </div>
                    <input
                      disabled
                      type="text"
                      name="text"
                      className="info-add"
                      value={addr}
                    />
                    <input
                      disabled
                      type="text"
                      name="text"
                      className="info-add"
                      value={subAddr}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TeacherInfoViewStyle>
      <Footer />
    </>
  );
};

export default TeacherInfoView;
