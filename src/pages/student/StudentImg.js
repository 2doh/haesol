import styled from "@emotion/styled";
import { modifyStudentInfo } from "api/student/studentapi";
import React, { useEffect, useRef, useState } from "react";

const StudentsImeStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .info-img {
    width: 100%;
    object-fit: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StudentImg = ({ studentPk, studentPic }) => {
  const fileBt = useRef(null);

  const [previewFile, setPreviewFile] = useState(null);
  const [sendFile, setSendFile] = useState(null);

  // 이미지 업로드 및 미리보기용 함수
  const handleFileChange = e => {
    const file = e.target.files[0];

    if (file) {
      // 전송 파일 보관
      setSendFile(file);
      // 미리보기용
      const url = URL.createObjectURL(file);
      // 웹 브라우저 임시 파일 주소
      setPreviewFile(url);
    }
  };

  //   // 전송 파일 보관
  //   setSendFile(file);
  //   // 미리보기용
  //   const url = URL.createObjectURL(file);
  //   // 웹 브라우저 임시 파일 주소
  //   setPreviewFile(url);
  // };

  const handleFileClick = () => {
    if (fileBt.current) {
      fileBt.current.click();
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (studentPic) {
        const imageUrl = `http://192.168.0.144:5121/pic/student/${studentPk}/${studentPic}`;
        try {
          const response = await axios.get(imageUrl, { responseType: "blob" });
          const url = URL.createObjectURL(response.data);
          setPreviewFile(url);
        } catch (error) {
          console.error("이미지를 가져오는 중 오류 발생:", error);
        }
      }
    };

    fetchImage();
  }, [studentPk, studentPic]);
  const handleFileUpload = async () => {
    const formData = new FormData();
    const infoData = JSON.stringify({
      studentPic: studentPic,
    });

    const dto = new Blob([infoData], { type: "application/json" });
    formData.append("pic", dto);
    // file 추가하기
    if (sendFile) {
      formData.append("pic", sendFile);
    }
    // console.log("formData 데이터 전송");
    modifyStudentInfo(formData);
  };

  //   <img
  //   src={`http://192.168.0.144:5121/pic/download/student/${studentPk}/${studentPic}`}
  //   className="info-img"
  // />

  return (
    // 이미지 전체 영역
    <StudentsImeStyle
      onClick={() => {
        handleFileClick();
      }}
    >
      {previewFile !== null ? (
        <img src={previewFile} className="info-img" alt="Student" />
      ) : (
        <p>사진 업로드</p>
      )}
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
