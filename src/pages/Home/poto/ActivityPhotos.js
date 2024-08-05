import styled from "@emotion/styled";
import pic1 from "../../../images/pic1.png";
import pic2 from "../../../images/pic2.png";
import pic3 from "../../../images/pic3.png";
import pic4 from "../../../images/pic4.png";
import pic5 from "../../../images/pic5.png";
import pic6 from "../../../images/pic6.png";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useState } from "react";

const ActivityPhotosZoneStyle = styled.div`
  position: absolute;
  top: 18px;
  right: 35px;
  width: 570px;
`;

export const ActivityPhotos = ({ setSwiper }) => {
  return (
    <ActivityPhotosZoneStyle>
      <div className="main-activity-wrap">
        <div className="main-activity-slide-zone">
          <Swiper
            slidesPerView={2}
            // spaceBetween={30}
            modules={[Autoplay, Pagination]}
            speed={1000}
            loop={true}
            autoplay={{
              delay: 2500, // 시간 설정
              disableOnInteraction: false, // false-스와이프 후 자동 재생
              loop: true,
            }}
            onSwiper={e => {
              setSwiper(e);
            }}
            className="main-our-activities-photo-swiper"
          >
            <SwiperSlide>
              <div className="item">
                <div className="polaroid">
                  <img src={pic1} />
                  <div className="caption">운동회</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item">
                <div className="polaroid">
                  <img src={pic2} />
                  <div className="caption">문화예절체험학습</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item">
                <div className="polaroid">
                  <img src={pic3} />
                  <div className="caption">안전체험학습</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item">
                <div className="polaroid">
                  <img src={pic4} />
                  <div className="caption">졸업식</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item">
                <div className="polaroid">
                  <img src={pic5} />
                  <div className="caption">직업체험학습</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item">
                <div className="polaroid">
                  <img src={pic6} />
                  <div className="caption">현장체험학습</div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </ActivityPhotosZoneStyle>
  );
};
