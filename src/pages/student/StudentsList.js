import React, { useState } from "react";
import "../../scss/student/studentList.css";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
const StudentsList = () => {
  // 반 정보
  const gradeClass = "5학년 7반";

  // 학생 더미 데이터
  const studentsList = [
    {
      studentNumber: "1",
      studentName: "김누구",
      studentGender: "여자",
      studentBirth: "010102",
      studentPhone: "123-456-7890",
      parentsName: "김구누",
      parentsPhone: "987-654-3210",
    },
    {
      studentNumber: "2",
      studentName: "니누구",
      studentGender: "남자",
      studentBirth: "010101",
      studentPhone: "234-567-8901",
      parentsName: "니구누",
      parentsPhone: "876-543-2109",
    },
  ];

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/students/edit`);
  };

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
          {studentsList.map((item, index) => (
            <div className="item" key={index}>
              <div
                className="grid-inner"
                onClick={() => {
                  handleClick();
                }}
                id="grid-content"
              >
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">
                    {item.studentNumber}
                  </div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{item.studentName}</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">
                    {item.studentGender}
                  </div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">
                    {item.studentBirth}
                  </div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">
                    {item.studentPhone}
                  </div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{item.parentsName}</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">
                    {item.parentsPhone}
                  </div>
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
