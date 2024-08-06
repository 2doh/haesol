import styled from "@emotion/styled";
import { modifyStudentInfo } from "api/student/studentapi";
import React, { useEffect, useRef, useState } from "react";

const StudentsImeStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  button {
    margin: 0 auto;
    width: 100%;
  }
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

const StudentImg = ({ studentPk, studentPic }) => {
  const fileBt = useRef(null);

  // 이미지 미리보기를 할 변수
  const [previewImg, setPreviewImg] = useState("");
  // 서버에 POSt 할 파일을 관리할 변수
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    if (studentPic) {
      setPreviewImg(
        `http://112.222.157.156:5121/pic/2nd/student/${studentPk}/${studentPic}`,
      );
    }
    // console.log(studentPic);
    // console.log(previewFile);
  }, [studentPic, previewFile]);

  const handleFileChange = e => {
    const tempFile = e.target.files[0];
    const tempUrl = URL.createObjectURL(tempFile);
    // console.log(tempUrl);
    setPreviewImg(tempUrl);

    // 전송할 파일 변경(주의. 파일을 넣어주자.)
    setImgFile(tempFile);
  };

  const handleFileClick = () => {
    fileBt.current.click();
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    const infoData = JSON.stringify({
      studentPic: studentPic,
    });
    // const infoData = JSON.stringify({
    //   // 속성명: 속성값,
    //   studentPic: studentPic,
    // });

    const dto = new Blob([infoData], { type: "application/json" });
    // console.log(dto);
    formData.append("pic", dto);
    // file 추가하기
    // formData.append("petImage", imgFile); 처럼 백에서 요구한 값 넣기
    formData.append("pic", imgFile);
    // console.log("formData 데이터 전송");

    try {
      const response = await modifyStudentInfo(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // 이미지 전체 영역
    <StudentsImeStyle>
      <button
        onClick={() => {
          handleFileUpload();
        }}
      >
        이미지 업로드
      </button>

      <img src={studentPic} />

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
