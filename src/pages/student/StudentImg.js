import React, { useState } from "react";

const StudentImg = () => {
  const [sendFile, setSendFile] = useState(null);
  const handleFileChange = e => {
    const file = e.target.files[0];
    // 파일 보관
    setSendFile(file);
  };

  // 강제로 input type="file" 을 클릭한 것처럼 js 에서 실행
  const handleFileClick = () => {
    fileBt.current.click();
  };

  const [previewFile, setPreviewFile] = useState("");
  const handleFile = e => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    // 웹 브라우저 임시 파일 주소
    setPreviewFile(url);
  };

  <img src={previewFile} />;

  //   // 1. 전송데이터 포맷 만들기
  //   const formData = new FormData();

  //   // 2. 보낼데이터 (json 형식의 문자열로 만들기)
  //   const infoData = JSON.stringify({
  //     속성명: 속성값,
  //     속성명: 속성값,
  //   });

  //   // 3. Blob 바이너리 데이터 만들기
  //   const 자료 = new Blob([infoData], { type: "application/json" });

  //   // 4. form-data 에 키에 값으로 추가하기
  //   formData.append("키명", 자료);

  //   // 5. 이미지 파일 추가하기
  //   formData.append("키명", 파일);

  //   // 6. axios 로 전달
  //   axiosPost함수(formData);

  //   const post기능명 = async data => {
  //     try {
  //       const header = { headers: { "Content-Type": "multipart/form-data" } };
  //       const response = await axios.post("주소", data, header);
  //       // console.log(response);
  //       return response;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    // 이미지 보여지는 곳
    <>
      <div className="student-img">이미지</div>
      <input
        // style={{ display: "none" }}
        id="filebt_id"
        // ref={fileBt}
        type="file"
        accept="image/*"
        // onChange={e => handleFileChange(e)}
      />
    </>
  );
};

export default StudentImg;
