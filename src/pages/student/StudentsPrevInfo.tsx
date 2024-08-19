import styled from "@emotion/styled";
import BoxTitle from "components/common/style/BoxTitle";
import React, { useState } from "react";
import "../../scss/student/studentEdit.css";

interface EtcItem {
  uclass: string;
  teacherName: string;
  etc: string;
}
interface StudentInfo {
  studentPk: number;
  studentName: string;
  studentPhone: string;
  studentEtc: string;
  studentBirth: string;
  studentAddr: string;
  studentZoneCode: string;
  studentDetail: string;
  studentGender?: string;
  parentName?: string;
  connet?: string;
  parentPhone?: string;
  studentPic?: string;
  studentCreatedAt?: string;
  parentId?: string;
  studentGrade?: string;
  studentClass?: string;
  prevEtcList?: EtcItem[];
}

const StudentsInfoStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 120px;
  margin: 0 auto;
  width: 1080px;
  padding-top: 70px;
  padding-bottom: 120px;
  @media screen and (max-width: 1023px) {
    // top: 70px;
    padding-top: 70px;
  }
`;

const StudentsPrevInfo: React.FC = () => {
  // 학생 한 명 데이터
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(
    {} as StudentInfo,
  );
  return (
    <StudentsInfoStyle>
      <div className="student-info">
        <div className="main-schedule-title main-contents-title">
          <BoxTitle>학생 기록 정보</BoxTitle>
        </div>
        <div className="grid-frame">
          {studentInfo.prevEtcList && studentInfo.prevEtcList.length > 0 ? (
            studentInfo.prevEtcList.map((item, index) => (
              <>
                <div className="item" key={index}>
                  <div className="grid-inner">
                    <div className="grid-inner-item">
                      <div className="grid-inner-item-text">학급</div>
                    </div>
                    <div className="grid-inner-item1">
                      <div className="grid-inner-item-text">{item.uclass}</div>
                    </div>
                    <div className="grid-inner-item">
                      <div className="grid-inner-item-text">담당 교직원</div>
                    </div>
                    <div className="grid-inner-item1">
                      <div className="grid-inner-item-text">
                        {item.teacherName}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="student-info-readonly">
                  {item.etc || "기록된 정보가 없습니다."}
                </div>
              </>
            ))
          ) : (
            <>
              <div className="item">
                <div className="grid-inner">
                  <div className="grid-inner-info">
                    <div className="grid-inner-item-text">학급</div>
                  </div>
                  <div className="grid-inner-info1">
                    <div className="grid-inner-item-text">-</div>
                  </div>
                  <div className="grid-inner-info">
                    <div className="grid-inner-item-text">담당 교직원</div>
                  </div>
                  <div className="grid-inner-info1">
                    <div className="grid-inner-item-text">-</div>
                  </div>
                </div>
              </div>
              <div className="student-info-readonly">
                이전 학기 정보가 없습니다.
              </div>
            </>
          )}
        </div>
      </div>
    </StudentsInfoStyle>
  );
};

export default StudentsPrevInfo;
