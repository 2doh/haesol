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
    // 전송 파일 보관
    setSendFile(file);
    // 미리보기용
    const url = URL.createObjectURL(file);
    // 웹 브라우저 임시 파일 주소
    setPreviewFile(url);
  };

  const handleFileClick = () => {
    fileBt.current.click();
  };

  // useEffect(() => {
  //   if (studentPic) {
  //     setPreviewImg(
  //       `http://112.222.157.156:5121/pic/2nd/student/${studentPk}/${studentPic}`,
  //     );
  //   }
  // }, [studentPic, previewImg]);

  // const handleFileChange = e => {
  //   const tempFile = e.target.files[0];
  //   const tempUrl = URL.createObjectURL(tempFile);
  //   // console.log(tempUrl);
  //   setPreviewImg(tempUrl);
  //   // 전송할 파일 변경(주의. 파일을 넣어주자.)
  //   setImgFile(tempFile);
  // };

  const handleFileUpload = async () => {
    const formData = new FormData();
    const infoData = JSON.stringify({
      studentPic: studentPic,
    });

    const dto = new Blob([infoData], { type: "application/json" });
    formData.append("pic", dto);
    // file 추가하기
    formData.append("pic", sendFile);
    // console.log("formData 데이터 전송");
    modifyStudentInfo(formData);
  };

  return (
    // 이미지 전체 영역
    <StudentsImeStyle
      onClick={() => {
        handleFileClick();
      }}
    >
      <img src={previewFile} className="info-img" />
      {previewFile === null ? (
        <div className="info-img">이미지 업로드</div>
      ) : (
        <img src={"주소"} className="info-img" />
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
