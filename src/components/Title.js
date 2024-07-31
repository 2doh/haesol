import { getStudentInfo } from "api/student/studentapi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Title = () => {
  return (
    <div className="student-list-title">
      {/* <!-- 제목 위치 --> */}
      <button
        style={{ width: 100, height: 100, backgroundColor: "red" }}
      ></button>
      <span>{studentClass}</span>
      <p>{studentName}</p>
    </div>
  );
};

export default Title;
