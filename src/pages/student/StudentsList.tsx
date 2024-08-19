import React, { useEffect, useState } from "react";
import "../../scss/student/studentList.css";
import { useNavigate, useParams } from "react-router";
import styled from "@emotion/styled";
import { getStudentList } from "api/student/studentapi";
import { getCookie } from "utils/cookie";
import { FaAngleDown } from "react-icons/fa6";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import Footer from "components/layout/Footer";
import HeaderMemu from "components/layout/header/HeaderMenu";

const StudentsListStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

interface StudentInfo {
  studentPk: number;
  num: number;
  name: string;
  gender: string;
  birth: string;
  phone: string;
  parentName: string;
  parentPhone: string;
}

const StudentsList: React.FC = () => {
  const userClass = getCookie("userClass");
  const userGrade = getCookie("userGrade");

  const navigate = useNavigate();
  const handleClick = (studentPk: number) => {
    console.log("studentPk :", studentPk);
    navigate(`/students/${studentPk}`);
  };

  // 전체 학생 리스트
  const [studentList, setStudentList] = useState<StudentInfo[]>([]);

  const studentListData = async () => {
    try {
      const response = await getStudentList();
      const result = response?.data;

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
    studentListData();
  }, []);

  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <div className="main-core">
        <div className="student-list-title">
          {/* 제목 위치 */}
          <span>
            {userGrade}학년 {userClass}반
          </span>
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
                    <div className="grid-inner-item-text">
                      {item.parentName}
                    </div>
                  </div>
                  <div className="grid-inner-item">
                    <div className="grid-inner-item-text">
                      {item.parentPhone}
                    </div>
                  </div>
                  <div className="grid-inner-item">
                    <div className="grid-inner-item-text">
                      <FaAngleDown className="downIcon" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </StudentsListStyle>
      </div>
      <Footer />
    </>
  );
};

export default StudentsList;
