import styled from "@emotion/styled";
import axios from "axios";
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

interface StudentImgProps {
  studentPk: string | number | undefined;
  studentPic: string | null;
  setImgFile: (file: File | null) => void;
}

const StudentImg: React.FC<StudentImgProps> = ({
  studentPk,
  studentPic,
  setImgFile,
}) => {
  const fileBt = useRef<HTMLInputElement | null>(null);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  // 이미지 업로드 및 미리보기용 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // 전송 파일 보관
      setImgFile(file);
      // 미리보기용
      const url = URL.createObjectURL(file);
      // 웹 브라우저 임시 파일 주소
      setPreviewFile(url);
    }
  };

  const handleFileClick = () => {
    if (fileBt.current) {
      fileBt.current.click();
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (studentPic) {
        const imageUrl = `http://112.222.157.156:5121/pic/student/${studentPk}/${studentPic}`;
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
