import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import pic1 from "../../images/pic1.png";
import pic2 from "../../images/pic2.png";
import pic3 from "../../images/pic3.png";
import pic4 from "../../images/pic4.png";
import pic5 from "../../images/pic5.png";
import pic6 from "../../images/pic6.png";

export const ActivityPhotos = () => {
  const initArr = [pic1, pic2, pic3, pic4, pic5, pic6];
  const titles = [
    "운동회",
    "문화예절체험학습",
    "안전체험학습",
    "졸업식",
    "직업체험학습",
    "현장체험학습",
  ];
  const [randomImg, setRandomImg] = useState(initArr[0]);
  const [picTitle, setPicTitle] = useState(titles[0]);

  useEffect(() => {
    const showImg = () => {
      const imgNum = Math.floor(Math.random() * initArr.length);
      setRandomImg(initArr[imgNum]);
      setPicTitle(titles[imgNum]);
    };
    showImg();
    const intervalId = setInterval(showImg, 10000);
    return () => clearInterval(intervalId);
  }, [initArr]);

  return (
    <>
      <PhotoStyle style={{ backgroundImage: `url(${randomImg})` }}></PhotoStyle>
      <BarStyle>
        <TitleStyle>{picTitle}</TitleStyle>
      </BarStyle>
    </>
  );
};

const PhotoStyle = styled.div`
  width: 100%;
  height: 100%;
  max-height: 450px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  background: no-repeat center;
  background-size: cover;
`;

const TitleStyle = styled.div`
  color: #2a2b07;
  font-size: 24px;
  padding: 10px;
`;

const BarStyle = styled.div`
  width: 100%;
  height: 100%;
  max-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
