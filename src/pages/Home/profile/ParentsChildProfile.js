import LogoutButton from "components/common/LogoutButton";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ParentsChildProfile = ({ childInfo, childNum, nowTopPosition }) => {
  const navigate = useNavigate();

  // 상태 초기화
  const [birth, setBirth] = useState("미등록");
  const [classId, setClassId] = useState("미등록");
  const [className, setClassName] = useState("미등록");
  const [name, setName] = useState("미등록");
  const [teacherName, setTeacherName] = useState("미등록");
  const [studentPk, setStudentPk] = useState("");
  const [studentPic, setStudentPic] = useState(null);

  /** 최초 또는 childInfo 변경 시 아이 정보 업데이트 */
  useEffect(() => {
    if (childInfo) {
      setBirth(childInfo.birth || "미등록");
      setClassId(childInfo.classId || "미등록");
      setClassName(childInfo.classId || "미등록");
      setName(childInfo.name || "미등록");
      setTeacherName(childInfo.teacherName || "미등록");
      setStudentPic(childInfo.pic || null);
      setStudentPk(childInfo.studentPk || "");
    }
  }, [childInfo]);

  /** 마이페이지 이동 */
  const moveMyPage = () => {
    navigate(`/studentinfo`);
  };

  /** 성적 확인 페이지 이동 */
  const moveMyGradePage = () => {
    navigate(`/grade/${studentPk}`);
  };

  return (
    <div className="user-info">
      {name === "미등록" ? null : (
        <div
          className="rgyPostIt"
          style={{ top: `${nowTopPosition - 27}px`, transition: "none" }}
        >
          {/* {console.log(childNum)} */}
          {name}
        </div>
      )}
      {/* <div className="rgyPostIt">{name}</div> */}
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
                name
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
  );
};

export default ParentsChildProfile;
