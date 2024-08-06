import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import book1 from "../../../images/home/en-book-01.png";
import book2 from "../../../images/home/en-book-02.jpg";
import book3 from "../../../images/home/en-book-03.png";
import book4 from "../../../images/home/en-book-04.jpg";
import book5 from "../../../images/home/en-book-05.png";
import book6 from "../../../images/home/en-book-06.jpg";

import vod from "../../../images/home/ico_vod.svg";
import learning from "../../../images/home/ico_learning.svg";
import workbook from "../../../images/home/ico_workbook.svg";

const EnglishBookStyle = styled.div`
  height: 100%;
  max-width: 99vw;

  .swiper {
    height: 100%;

    .swpier-wrapper {
      transition-timing-function: linear;
    }

    .swiper-slide {
      cursor: pointer;
      max-width: 365px;
      height: 100%;

      display: flex;
      flex-direction: row;

      border-radius: 10px;
      overflow: hidden;

      & > div:first-of-type {
        background-color: #dedede;
        flex-grow: 1;
        max-width: 50%;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 100%;
          border-radius: 5px;
        }
      }

      & > div:last-of-type {
        position: relative;

        background-color: white;
        padding: 30px;
        max-width: 50%;
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        gap: 40px;

        .book-info {
          display: flex;
          flex-direction: column;
          gap: 14px;
          .book-title {
            font-size: 24px;
            font-weight: bold;
            word-break: break-all;
          }
          .book-info-type {
            font-size: 15px;
            font-weight: normal;
            color: #727272;
          }
        }

        .book-tag {
          position: absolute;
          bottom: 40px;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;

          img {
            border-radius: 50px;
            padding: 7px;
            background-color: #ebebeb;
          }

          p {
            font-size: 16px;
            color: #727272;
          }
        }
      }
    }
  }
`;
const EnglishBook = () => {
  /** 새 탭에서 열기 */
  const handleOpenNewTab = url => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  const movePage = bookNum => {
    switch (bookNum) {
      case "book1":
        handleOpenNewTab(
          "https://www.ebse.co.kr/apps/funReading/view.do?course_id=ECLIPFUN000001&clip_id=174120",
        );
        break;
      case "book2":
        handleOpenNewTab(
          "https://www.ebse.co.kr/apps/funReading/view.do?course_id=ECLIPFUN000001&clip_id=168432",
        );
        break;
      case "book3":
        handleOpenNewTab(
          "https://www.ebse.co.kr/apps/funReading/view.do?course_id=ECLIPFUN000001&clip_id=171891",
        );
        break;
      case "book4":
        handleOpenNewTab(
          "https://www.ebse.co.kr/apps/funReading/view.do?course_id=ECLIPFUN000001&clip_id=170917",
        );
        break;
      case "book5":
        handleOpenNewTab(
          "https://www.ebse.co.kr/apps/funReading/view.do?course_id=ECLIPFUN000001&clip_id=175006",
        );
        break;
      case "book6":
        handleOpenNewTab(
          "https://www.ebse.co.kr/apps/funReading/view.do?course_id=ECLIPFUN000001&clip_id=49648",
        );
        break;
      default:
        break;
    }
  };

  return (
    <EnglishBookStyle>
      <Swiper
        // slidesPerView={4}
        slidesPerView={"auto"}
        spaceBetween={150} // 슬라이드 간격
        // pagination={{
        //   clickable: false,
        // }}
        modules={[Autoplay, Pagination]}
        speed={5000}
        loop={true}
        autoplay={{
          //   delay: 2500, // 시간 설정
          disableOnInteraction: false, // false-스와이프 후 자동 재생
          loop: true,
          freemode: true,
        }}
      >
        <SwiperSlide
          onClick={() => {
            movePage("book1");
          }}
        >
          <div>
            <img src={book1} />
          </div>
          <div>
            <div className="book-info">
              <div className="book-title">Play Ball!</div>
              <div className="book-info-type">Lv.1 | 비소설</div>
            </div>
            <div className="book-tag">
              <img src={vod} />
              <p>VOD</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() => {
            movePage("book2");
          }}
        >
          <div>
            <img src={book2} />
          </div>
          <div>
            <div className="book-info">
              <div className="book-title">Soccer By the Numbers </div>
              <div className="book-info-type">Lv.4 | 비소설</div>
            </div>
            <div className="book-tag">
              <img src={learning} />
              <p>learning</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() => {
            movePage("book3");
          }}
        >
          <div>
            <img src={book3} />
          </div>
          <div>
            <div className="book-info">
              <div className="book-title">Patterns in Sports</div>
              <div className="book-info-type">Lv.3 | 비소설</div>
            </div>
            <div className="book-tag"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() => {
            movePage("book4");
          }}
        >
          <div>
            <img src={book4} />
          </div>
          <div>
            <div className="book-info">
              <div className="book-title">Surfing Safari</div>
              <div className="book-info-type">Lv.4 | 소설</div>
            </div>
            <div className="book-tag">
              <img src={workbook} />
              <p>워크북</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() => {
            movePage("book5");
          }}
        >
          <div>
            <img src={book5} />
          </div>
          <div>
            <div className="book-info">
              <div className="book-title">Kick, Pass, Score!</div>
              <div className="book-info-type">Lv.3 | 소설</div>
            </div>
            <div className="book-tag">
              <img src={vod} />
              <p>VOD</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          onClick={() => {
            movePage("book6");
          }}
        >
          <div>
            <img src={book6} />
          </div>
          <div>
            <div className="book-info">
              <div className="book-title">Xtreme Sports : Rock Climbing</div>
              <div className="book-info-type">Lv.6 | 비소설</div>
            </div>
            <div className="book-tag">
              <img src={learning} />
              <p>learning</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </EnglishBookStyle>
  );
};

export default EnglishBook;
