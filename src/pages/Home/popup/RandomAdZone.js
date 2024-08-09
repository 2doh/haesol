import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import pic1 from "../../../images/home/ad_zone_img_01.png";
import pic2 from "../../../images/home/ad_zone_img_02.png";
import pic3 from "../../../images/home/ad_zone_img_03.png";

const RandomAdZoneStyle = styled.div`
  width: 100%;
  margin-top: 35px;
  position: relative;
  display: flex;
  flex-direction: column;

  .random-pic {
    cursor: pointer;
  }

  @media screen and (max-width: 1023px) {
    .random-ad-zone {
      background-color: unset;
      .random-info-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        .random-pic {
          aspect-ratio: 16 / 9;
          width: auto !important;
        }
      }
    }
  }
`;

const RandomAdZone = () => {
  const initArr = [pic1, pic2, pic3];

  const [randomImg, setRandomImg] = useState(initArr[0]);

  /** 새 탭에서 열기 */
  const handleOpenNewTab = url => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  const movePage = () => {
    if (randomImg === pic1) {
      handleOpenNewTab("https://www.129.go.kr/counsel/counsel01.do");
    }
    if (randomImg === pic2) {
      handleOpenNewTab("https://www.parents.go.kr/index.do");
    }
    if (randomImg === pic3) {
      handleOpenNewTab("https://www.privacy.go.kr/front/main/main.do#");
    }
  };

  useEffect(() => {
    const showImg = () => {
      const imgNum = Math.floor(Math.random() * initArr.length);
      setRandomImg(initArr[imgNum]);
    };
    showImg();
    const intervalId = setInterval(showImg, 5000);
    return () => clearInterval(intervalId);
  }, [initArr]);

  return (
    <RandomAdZoneStyle>
      <div className="main-random-ad-zone-wrap">
        <div className="random-ad-zone">
          <div className="random-info-wrap">
            <div
              className="random-pic"
              style={{ backgroundImage: `url(${randomImg})` }}
              onClick={() => {
                movePage();
              }}
            ></div>
          </div>
        </div>
      </div>
    </RandomAdZoneStyle>
  );
};

export default RandomAdZone;
