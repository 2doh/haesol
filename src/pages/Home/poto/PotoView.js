import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { ActivityPhotos } from "./ActivityPhotos";
import SlideControlButton from "components/common/style/SlideControlButton";
import useWindowDimensions from "hooks/common/useWindowDimensions";

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

  @media screen and (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    padding: 20px;

    .responsive-poto-view-top-wrap {
      display: flex;
      flex-direction: row;
      gap: 20px;

      .poto-view-title {
        height: 50px;
        padding-top: 15px;
      }

      .poto-btn {
        background-color: white;
        border-radius: 10px 10px 0 0;
        padding: 10px;
      }
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
  const { height, width } = useWindowDimensions();
  const [changeStyle, setChangeStyle] = useState(true);

  useEffect(() => {
    if (width < 1023) {
      setChangeStyle(false);
    } else {
      setChangeStyle(true);
    }
  }, [width]);

  return (
    <PotoViewStyle>
      {changeStyle ? (
        <>
          <div className="poto-view-title">우리들의 활동</div>
          <div className="poto-view-bottom">
            <div className="poto-btn">
              <SlideControlButton swiper={swiper} btnList={btnList} />
            </div>
            <ActivityPhotos setSwiper={setSwiper} />
          </div>
        </>
      ) : (
        <>
          <div className="responsive-poto-view-top-wrap">
            <div className="poto-view-title">우리들의 활동</div>
            <div className="poto-btn">
              <SlideControlButton swiper={swiper} btnList={btnList} />
            </div>
          </div>
          <ActivityPhotos setSwiper={setSwiper} />
        </>
      )}
    </PotoViewStyle>
  );
};

export default PotoView;
