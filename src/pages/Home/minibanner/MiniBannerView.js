import styled from "@emotion/styled";

import { useState } from "react";
import SlideControlButton from "components/common/style/SlideControlButton";
import MiniBannerSwiper from "./MiniBannerSwiper";

const MiniBannerViewStyle = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  height: 100%;

  display: flex;
  flex-direction: row;
  gap: 20px;
  /* justify-content: center;
  align-items: center; */

  .mini-banner-swiper-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    span {
      font-size: 24px;
      font-weight: bold;
      /* font-family: Noto Sans; */
      color: #2a1b07;
    }
  }

  .swiper-slide {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    & > img {
      width: 200px;
      height: 60px;
      border: 1px solid gray;
      cursor: pointer;
    }
  }
`;
const MiniBannerView = () => {
  const [swiper, setSwiper] = useState();
  const [btnList, setBtnList] = useState([
    "left-btn",
    "right-btn",
    "mini-banner-list-btn",
  ]);

  return (
    <MiniBannerViewStyle>
      <div className="mini-banner-swiper-btn">
        <span>배너모음</span>
        <SlideControlButton swiper={swiper} btnList={btnList} />
      </div>
      <MiniBannerSwiper setSwiper={setSwiper} />
    </MiniBannerViewStyle>
  );
};

export default MiniBannerView;
