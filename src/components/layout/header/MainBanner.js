import styled from "@emotion/styled";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import banner01 from "../../../images/home/main_banner_01.png";
import banner02 from "../../../images/home/main_banner_02.png";
import banner03 from "../../../images/home/main_banner_03.jpg";

const MainBannerStyle = styled.div`
  .swiper {
    height: 450px;
    width: 100%;
    background-color: #dbebee;
    border-radius: 0px 50px 50px 0px;

    img {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
    }

    .move-page-div {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 1023px) {
    .swiper {
      border-radius: 0px;
    }
  }
`;

/** 새 탭에서 열기 */
const handleOpenNewTab = url => {
  window.open(url, "_blank", "noopener, noreferrer");
};

const MainBanner = () => {
  const movePage = selectNum => {
    if (selectNum === 1) {
      handleOpenNewTab("https://netmap.edunet.net/netmap/map.do");
    }
    if (selectNum === 2) {
      //
    }
    if (selectNum === 3) {
      handleOpenNewTab("https://2024crc.nlive.kr/");
    }
  };
  return (
    <MainBannerStyle>
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        speed={1000}
        loop={true}
        autoplay={{
          delay: 2500, // 시간 설정
          disableOnInteraction: false, // false-스와이프 후 자동 재생
          loop: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide
          className="move-page-div"
          onClick={() => {
            movePage(1);
          }}
        >
          <img src={banner01} />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => {
            movePage(2);
          }}
        >
          <img src={banner02} />
        </SwiperSlide>
        <SwiperSlide
          className="move-page-div"
          onClick={() => {
            movePage(3);
          }}
        >
          <img src={banner03} />
        </SwiperSlide>
      </Swiper>
    </MainBannerStyle>
  );
};

export default MainBanner;
