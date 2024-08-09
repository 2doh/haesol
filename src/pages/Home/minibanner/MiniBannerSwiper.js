import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import bannerImg1 from "../../../images/home/minibanner/mini-banner-img-01.png";
import bannerImg2 from "../../../images/home/minibanner/mini-banner-img-02.png";
import bannerImg3 from "../../../images/home/minibanner/mini-banner-img-03.gif";
import bannerImg4 from "../../../images/home/minibanner/mini-banner-img-04.gif";
import bannerImg5 from "../../../images/home/minibanner/mini-banner-img-05.jpg";
import bannerImg6 from "../../../images/home/minibanner/mini-banner-img-06.png";
import bannerImg7 from "../../../images/home/minibanner/mini-banner-img-07.jpg";
import bannerImg8 from "../../../images/home/minibanner/mini-banner-img-08.jpg";
import bannerImg9 from "../../../images/home/minibanner/mini-banner-img-09.jpg";
import bannerImg10 from "../../../images/home/minibanner/mini-banner-img-10.png";
import bannerImg11 from "../../../images/home/minibanner/mini-banner-img-11.png";
import bannerImg12 from "../../../images/home/minibanner/mini-banner-img-12.jpg";
import bannerImg13 from "../../../images/home/minibanner/mini-banner-img-13.jpg";
import bannerImg14 from "../../../images/home/minibanner/mini-banner-img-14.png";
import bannerImg15 from "../../../images/home/minibanner/mini-banner-img-15.png";
import bannerImg16 from "../../../images/home/minibanner/mini-banner-img-16.jpg";
import bannerImg17 from "../../../images/home/minibanner/mini-banner-img-17.jpg";
import bannerImg18 from "../../../images/home/minibanner/mini-banner-img-18.png";
import bannerImg19 from "../../../images/home/minibanner/mini-banner-img-19.jpg";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useWindowDimensions from "hooks/common/useWindowDimensions";

const MiniBannerWrap = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center; */
`;

const MiniBannerSwiper = ({ setSwiper }) => {
  const [images, setImages] = useState([
    bannerImg1,
    bannerImg2,
    bannerImg3,
    bannerImg4,
    bannerImg5,
    bannerImg6,
    bannerImg7,
    bannerImg8,
    bannerImg9,
    bannerImg10,
    bannerImg11,
    bannerImg12,
    bannerImg13,
    bannerImg14,
    bannerImg15,
    bannerImg16,
    bannerImg17,
    bannerImg18,
    bannerImg19,
  ]);

  /** 새 탭에서 열기 */
  const handleOpenNewTab = url => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  const movePage = bannerNum => {
    switch (bannerNum) {
      case 0:
        handleOpenNewTab("https://www.kedi.re.kr/studentsupport/index.do");
        break;
      case 1:
        handleOpenNewTab(
          "https://www.moe.go.kr/boardCnts/listRenew.do?boardID=72783&renew=72783&m=0319&s=moe",
        );
        break;
      case 2:
        handleOpenNewTab("http://www.alzzam.co.kr/job/");
        break;
      case 3:
        handleOpenNewTab("https://www.safe182.go.kr/index.do");
        break;
      case 4:
        handleOpenNewTab("https://nsmart.koedu.co.kr/nonmember/login.php");
        break;
      case 5:
        handleOpenNewTab("https://www.textbook114.com/index.jsp");
        break;
      case 6:
        handleOpenNewTab("https://www.safetyreport.go.kr/#main");
        break;
      case 7:
        handleOpenNewTab("https://doran.edunet.net/main/mainForm.do");
        break;
      case 8:
        handleOpenNewTab("https://www.parents.go.kr/index.do");
        break;
      case 9:
        handleOpenNewTab("https://www.simpan.go.kr/nsph/index.do");
        break;
      case 10:
        handleOpenNewTab(
          "https://www.safekorea.go.kr/idsiSFK/neo/main/main.html",
        );
        break;
      case 11:
        handleOpenNewTab("https://artsedu.kice.re.kr/home/kor/main.do");
        break;
      case 12:
        handleOpenNewTab(
          "https://www.jne.go.kr/main/cm/cntnts/cntntsView.do?mi=163&cntntsId=9",
        );
        break;
      case 13:
        handleOpenNewTab("https://www.1388.go.kr/ind/YTOSP_SC_IND_01");
        break;
      case 14:
        handleOpenNewTab("https://www.edunet.net/nedu/main/mainForm.do");
        break;
      case 15:
        handleOpenNewTab("https://together.kakao.com/promotions/68");
        break;
      case 16:
        handleOpenNewTab("https://pf.kakao.com/_CxoBxcC");
        break;
      case 17:
        handleOpenNewTab("https://www.jne.go.kr/openfinance/main.do");
        break;
      case 18:
        handleOpenNewTab(
          "https://www.privacy.go.kr/front/contents/cntntsView.do?contsNo=260",
        );
        break;
      default:
        break;
    }
    // if (bannerNum === 1) {
    // }
    // if (randomImg === 2) {
    //   handleOpenNewTab("https://www.parents.go.kr/index.do");
    // }
    // if (randomImg === 3) {
    //   handleOpenNewTab("https://www.privacy.go.kr/front/main/main.do#");
    // }
  };

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
    // <MiniBannerWrap>
    <Swiper
      slidesPerView={changeStyle ? 4 : 2}
      navigation={true}
      modules={[Autoplay, Pagination]}
      loop={true}
      //   autoplay={{
      //     delay: 2500, // 시간 설정
      //     disableOnInteraction: false, // false-스와이프 후 자동 재생
      //     loop: true,
      //   }}
      onSwiper={e => {
        setSwiper(e);
      }}
      className="mySwiper"
    >
      {images.map((item, index) => (
        <SwiperSlide key={item}>
          <img
            src={images[index]}
            onClick={e => {
              movePage(index);
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    // {/* </MiniBannerWrap> */}
  );
};

export default MiniBannerSwiper;
