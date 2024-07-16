import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import "../../scss/teacher/teacheredit.css";

import { getTeacherInfo } from "api/teacher/teacherapi";
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
`;

const TeacherEdit = () => {
  const modalState = useSelector(state => state.modalSlice);

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
      console.log("받은 데이터 확인 : ", res.data);

      // 주소 저장
      // const splitAddr = res.data.addr.split("#");
      // const paddedAddr = [
      //   splitAddr[0] || "",
      //   splitAddr[1] || "",
      //   splitAddr[2] || "",
      // ];
      // setAddr(paddedAddr);
      // setBirth(res.data.birth);
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
      setUserName(res.data.name);
      setPhoneNum(res.data.phone);
    } catch (error) {
      console.log(error);
    }
  };

  /** 저장 기능 */
  const saveInfo = selectModalType => {
    // e.preventDefault();
    // const formData = new FormData();

    /** (선택) 들어갈 내용 수정 */
    const data = {
      bodyText: ["정보를 수정하시겠습니까?"],
      modalRes: [11, userName, phoneNum, email, zoneCode, addr],
      buttonText: ["수정", "취소"],
    };
    /** (선택) 위와 아래는 세트 */
    dispatch(updateModalDate(data));

    /**(고정) 모달 활성화 */
    const modalRes = dispatch(openModal(selectModalType));
    // console.log("모달 결과 출력 내용 확인 : ", modalRes);
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

    /** (선택) 위와 아래는 세트 */
    dispatch(updateModalDate(data));

    /**(고정) 모달 활성화 */
    dispatch(openModal(selectModalType));

    // console.log("모달 결과 출력 내용 확인 : ", modalRes);
  };

  useEffect(() => {
    nowUserInfo();
  }, []);

  useEffect(() => {
    if (modalState.modalRes[0] === false) {
      nowUserInfo();
    }
  }, [modalState.modalRes[0]]);

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
    const data = { bodyText: [userId] };
    /** (선택) 위와 아래는 세트 */
    dispatch(updateModalDate(data));

    /**(고정) 모달 활성화 */
    const modalRes = dispatch(openModal(selectModalType));
    // console.log("모달 결과 출력 내용 확인 : ", modalRes);
  };

  // useEffect(() => {
  //   if (pwChangeModalResult) {
  //     console.log("pwChangeModalResult : ", pwChangeModalResult);
  //     setPwChangeModalResult(false);
  //   }
  // }, [pwChangeModalResult]);

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
                  saveInfo("BasicModal");
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

                {/* <input
                  type="number"
                  name="tel"
                  placeholder="전화번호를 입력해주세요"
                  ref={phone}
                /> */}
                <PhoneInputFields
                  placeholder="전화번호를 입력하세요"
                  phoneNum={phoneNum}
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
            <div className="info-img">{/* <StudentImg /> */}</div>
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
              <div className="info-title"></div>
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
