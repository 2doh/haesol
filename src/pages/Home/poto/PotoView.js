import styled from "@emotion/styled";
import React, { useState } from "react";
import { ActivityPhotos } from "./ActivityPhotos";
import SlideControlButton from "components/common/style/SlideControlButton";

const PotoViewStyle = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  .poto-view-title {
    height: 70px;
    font-size: 24px;
    font-weight: bold;
    color: #1b4957;
    padding-top: 30px;
    padding-left: 20px;

    /* position: relative;
    bottom: 0; */
  }

  .poto-view-bottom {
    width: 100%;
    height: calc(100% - 70px);
    background-color: white;

    border-radius: 0 30px 0 25px;

    .poto-btn {
      width: 168px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const PotoView = () => {
  const [swiper, setSwiper] = useState();
  const [btnList, setBtnList] = useState([
    "left-btn",
    "right-btn",
    "stop-and-start-btn",
  ]);

  return (
    <PotoViewStyle>
      <div className="poto-view-title">우리들의 활동</div>
      <div className="poto-view-bottom">
        <div className="poto-btn">
          <SlideControlButton swiper={swiper} btnList={btnList} />
        </div>
        <ActivityPhotos setSwiper={setSwiper} />
      </div>
    </PotoViewStyle>
  );
};

export default PotoView;
