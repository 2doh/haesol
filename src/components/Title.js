import { getStudentInfo } from "api/student/studentapi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Title = () => {
  return (
    <div className="student-list-title" style={{ margin: 0 }}>
      {/* <!-- 제목 위치 --> */}
      <span>정보</span>
      <span>이름</span>
    </div>
  );
};

export default Title;
