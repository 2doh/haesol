import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";

const StudentImg = ({ studentPic, setStudentPic, studentPk }) => {
  // const [sendFile, setSendFile] = useState(null);
  const [previewFile, setPreviewFile] = useState("");
  const fileBt = useRef(null);
  //  const stu_id = 2;

  // 강제로 input type="file" 을 클릭한 것처럼 js 에서 실행
  const handleFileClick = () => {
    fileBt.current.click();
  };

  // 파일 목록 및 이미지 미리보기
  const handleFileChange = e => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    // 파일 보관
    setStudentPic(file);
    // 웹 브라우저 임시 파일 주소
    setPreviewFile(url);
  };

  useEffect(() => {
    console.log(studentPic);
  }, []);

  const StudentsImeStyle = styled.div`
    width: 100%;
    height: 100%;
    .img-contain {
      display: flex;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;

  return (
    // 이미지 전체 영역
    <StudentsImeStyle onClick={() => handleFileClick()}>
      {/* 이미지 보여지는 곳 */}
      <div className="img-contain">
        <img
          src={`http://192.168.0.164:8080/pic/2nd/student/${studentPk}/47872175-b41f-4080-bcf9-dc72604c46d5.png`}
        />
      </div>
      <input
        style={{ display: "none" }}
        id="filebt_id"
        ref={fileBt}
        type="file"
        accept="image/*"
        onChange={e => handleFileChange(e)}
      />
    </StudentsImeStyle>
  );
};

export default StudentImg;
