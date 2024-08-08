import styled from "@emotion/styled";
import LogoutButton from "components/common/LogoutButton";
import React, { useEffect, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import { getCookie, removeCookie, setCookie } from "utils/cookie";

const ParentsProfileStyle = styled.div`
  position: relative;
  width: 330px;
  height: 300px;
`;

const ParentsProfile = () => {
  // 나중에 : api 수정 후

  const navigate = useNavigate();
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));

  const [myChildList, setMyChildList] = useState([]);
  const [offUseEffect, setOffUseEffect] = useState(false);

  // 선택되어 있는 학생 한 명의 정보
  const [birth, setBirth] = useState("");
  const [classId, setClassId] = useState("");
  const [className, setClassName] = useState("");
  // const [class, setClass] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentsPK, setParentsPK] = useState("");
  const [phone, setPhone] = useState("");
  const [studentPk, setStudentPk] = useState("");

  // 이미지
  const [studentPic, setStudentPic] = useState(null);

  const [selectChildInfo, setSelectChildInfo] = useState([]);
  const [num, setnum] = useState(0);

  /** 메뉴 선택 */

  /** 아이들 정보 불러오기 */

  useEffect(() => {
    // console.log("offUseEffect False");
    if (offUseEffect) {
      const num = getCookie("selectChildNum");
      // console.log("offUseEffect True");
      // console.log("정보 확인 : ", myChildList[num].name);

      /** 선택되어 있는 학생의 정보 저장 */
      setBirth(myChildList[num].birth);
      setClassId(myChildList[num].classId);
      setClassName(myChildList[num].classId);
      setGender(myChildList[num].gender);
      setName(myChildList[num].name);
      setParentName(myChildList[num].parentName);
      setParentPhone(myChildList[num].parentPhone);
      setParentsPK(myChildList[num].parentsPK);
      setPhone(myChildList[num].phone);
      setStudentPk(myChildList[num].studentPk);
      setAge(myChildList[num].age);
      setTeacherName(myChildList[num].teacherName);
      setStudentPic(myChildList[num].pic);
      setCookie("studentPk", myChildList[num].studentPk);
    }
  }, [getCookie("selectChildNum")]);

  /** 마이페이지 이동 */
  const moveMyPage = () => {
    navigate(`/studentinfo`);
  };

  /** 성적 확인 페이지 이동 */
  const moveMyGradePage = () => {
    // navigate("/grade/1");
    navigate(`/grade/${studentPk}`);
  };

  return (
    <ParentsProfileStyle>
      <div className="user-info-wrap">
        <div className="user-info-inner">
          <div className="user-info">
            {/* 유저 정보 start */}
            <div className="top-user-info">
              <div className="user-pic"></div>

              <div className="user-info-div">
                <div className="user-info-label-box">
                  <div className="user-info-label">학생 이름</div>
                  <div className="user-info-label">생일</div>
                  <div className="user-info-label">학급</div>
                  <div className="user-info-label">선생님 성함</div>
                </div>
                <div className="user-info-text-box">
                  <div className="login-user-info-text">
                    {name === "" || name === null || name === 0 ? (
                      <div className="no-info">미등록</div>
                    ) : (
                      birth
                    )}
                  </div>
                  <div className="login-user-info-text">
                    {birth === "" || birth === null || birth === 0 ? (
                      <div className="no-info">미등록</div>
                    ) : (
                      birth
                    )}
                  </div>
                  <div className="login-user-info-text">
                    {className === "" || className === null ? (
                      <div className="no-info">미등록</div>
                    ) : (
                      className
                    )}
                  </div>
                  <div className="login-user-info-text">
                    {teacherName === "" || teacherName === null ? (
                      <div className="no-info">미등록</div>
                    ) : (
                      teacherName
                    )}
                  </div>
                </div>
              </div>

              <LogoutButton />
            </div>
            {/* 유저 정보 end */}

            {/* 버튼 start */}
            <div className="bottom-user-btn">
              <button
                className="subject-grade-btn"
                onClick={() => {
                  moveMyGradePage();
                }}
              >
                과목별 성적
              </button>

              <button
                className="my-page-btn"
                onClick={() => {
                  moveMyPage();
                }}
              >
                마이페이지
              </button>
            </div>
            {/* 버튼 end */}
          </div>
        </div>
      </div>
    </ParentsProfileStyle>
  );
};

export default ParentsProfile;
