import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const StudentImg = ({ studentPic, setStudentPic, studentPk }) => {
  // 파일 선택 태그
  const fileBt = useRef(null);

  // 이미지 미리보기 url 관리
  const [previewFile, setPreviewFile] = useState("");

  // 이미지 미리보기 JSX
  // const makeThumbnail = () => {
  //   <img src={previewFile} />;
  // };

  // 강제로 input type="file" 을 클릭한 것처럼 js 에서 실행
  const handleFileClick = () => {
    fileBt.current.click();
  };

  // 파일 목록 및 이미지 미리보기
  const handleFileChange = e => {
    const file = e.target.files[0];
    // 파일 보관
    setSendFile(file);

    const url = URL.createObjectURL(file);
    // 웹 브라우저 임시 파일 주소
    setPreviewFile(url);
  };

  // // 이미지 미리보기
  // const handleFile = e => {
  //   const file = e.target.files[0];

  // };

  useEffect(() => {
    if (studentPic) {
      setPreviewFile(
        `http://112.222.157.156:5121/pic/2nd/student/${studentPk}/${studentPic}`,
      );
    }
    console.log(studentPic);
    console.log(previewFile);
  }, [studentPic, previewFile]);

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
      <img src={previewFile} alt="Student" />;
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
