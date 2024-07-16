import React, { useEffect, useState } from "react";
import "../../scss/student/studentList.css";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { getStudentList } from "api/student/studentapi";
import { getCookie } from "utils/cookie";
const StudentsList = () => {
  const userClass = getCookie("userClass");

  const navigate = useNavigate();
  const handleClick = studentPk => {
    navigate(`/students/edit/${studentPk}`);
  };

  // 전체 학생 리스트
  const [studentList, setStudentList] = useState([]);

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
    // console.log("setStudentList 확인중 : ", studentList);
    studentListData();
  }, []);

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
        <span>{userClass}</span>
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
                  handleClick(item.studentPk);
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
