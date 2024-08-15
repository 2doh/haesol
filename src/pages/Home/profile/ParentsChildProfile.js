import LogoutButton from "components/common/LogoutButton";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ParentsChildProfile = ({ childNum, type }) => {
  // pageType = "page1" 이전 페이지
  // pageType = "page2" 현재 페이지

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const childState = useSelector(state => state.selectChildSlice);

  const [infoArr, setInfoArr] = useState([]);

  // 상태 초기화
  const [birth, setBirth] = useState("미등록");
  const [classId, setClassId] = useState("미등록");
  const [className, setClassName] = useState("미등록");
  const [name, setName] = useState("미등록");
  const [prevTop, setPrevTop] = useState();
  const [teacherName, setTeacherName] = useState("미등록");
  const [studentPk, setStudentPk] = useState("");
  const [studentPic, setStudentPic] = useState(null);

  useEffect(() => {
    // console.log("페이지 : ", childState.selectChildInfoList);
  }, [childState]);

  const getProfile = () => {
    if (childState.selectChildInfoList.length !== 0) {
      setBirth(childState.selectChildInfoList[childNum].birth || "미등록");
      setClassId(
        childState.selectChildInfoList[childNum].classId.split(" ")[0] ||
          "미등록",
      );
      setClassName(
        childState.selectChildInfoList[childNum].classId.split(" ")[1] ||
          "미등록",
      );
      setName(childState.selectChildInfoList[childNum].name || "미등록");
      setTeacherName(
        childState.selectChildInfoList[childNum].teacherName || "미등록",
      );
      setStudentPic(childState.selectChildInfoList[childNum].pic || null);
      setStudentPk(childState.selectChildInfoList[childNum].studentPk || "");
    }

    if (type === 1) {
      setPrevTop(childState.prevTopPosition);
    }
    if (type === 2) {
      setPrevTop(childState.nowTopPosition);
    }
  };

  /** 최초 또는 childInfo 변경 시 아이 정보 업데이트 */
  useEffect(() => {
    getProfile();
  }, [childState]);

  /** 마이페이지 이동 */
  const moveMyPage = () => {
    navigate(`/parents/studentinfo`);
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
          style={{
            top: `${prevTop}px`,
            transition: "none",
          }}
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
              {className === "" ||
              className === null ||
              className === 0 ||
              classId === "" ||
              classId === null ||
              classId === 0 ? (
                <div className="no-info">미등록</div>
              ) : (
                `${className} 학년 ${classId} 반`
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
