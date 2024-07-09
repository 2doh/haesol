import React, { useEffect, useState } from "react";
import "../../scss/student/studentList.css";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { getStudentList } from "api/student/studentapi";
const StudentsList = () => {
  // 반 정보
  const gradeClass = "5학년 7반";

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/students/edit`);
  };

  // 전체 학생 리스트
  const [studentList, setStudentList] = useState([]);

  // 선생님 아이디 받아오는 값
  // const tea_id = 1;
  // 실제 토큰 정보 불러와야 함
  // const accessToken = accessToken;

  const studentListData = async () => {
    try {
      const response = await getStudentList();
      const result = response.data;

      if (Array.isArray(result)) {
        setStudentList(result);
      } else {
        setStudentList([result]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 학생 리스트 데이터 불러오기
    console.log("setStudentList 확인중 : ", studentList);
    studentListData();
  }, [studentList]);

  const StudentsListStyle = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  `;

  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* 제목 위치 */}
        <span>{gradeClass}</span>
      </div>
      <StudentsListStyle>
        <div className="grid-frame">
          <div className="item">
            <div className="grid-inner">
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">번호</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">이름</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">성별</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">생년월일</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">학생 전화번호</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">학부모</div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">학부모 전화번호</div>
              </div>
            </div>
          </div>
          {studentList.map((item, index) => (
            <div className="item" key={index}>
              <div
                className="grid-inner"
                onClick={() => {
                  handleClick();
                }}
                id="grid-content"
              >
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{item.num}</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{item.name}</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{item.gender}</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{item.birth}</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{item.phone}</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{item.parentName}</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{item.parentPhone}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </StudentsListStyle>
    </div>
  );
};

export default StudentsList;
