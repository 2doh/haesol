import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import pic1 from "../../images/home/ad_zone_img_01.png";
import pic2 from "../../images/home/ad_zone_img_02.png";
import pic3 from "../../images/home/ad_zone_img_03.png";

const RandomAdZoneStyle = styled.div`
  width: 100%;
  margin-top: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const RandomAdZone = () => {
  const initArr = [pic1, pic2, pic3];

  const [randomImg, setRandomImg] = useState(initArr[0]);

  useEffect(() => {
    const showImg = () => {
      const imgNum = Math.floor(Math.random() * initArr.length);
      setRandomImg(initArr[imgNum]);
    };
    showImg();
    const intervalId = setInterval(showImg, 10000);
    return () => clearInterval(intervalId);
  }, [initArr]);

  return (
    <RandomAdZoneStyle>
      <div className="main-random-ad-zone-wrap">
        <div className="main-contents-title-div">
          <div className="main-contents-title-text">팝업존</div>
        </div>
        <div className="random-ad-zone">
          <div className="random-info-wrap">
            <div
              className="random-pic"
              style={{ backgroundImage: `url(${randomImg})` }}
            ></div>
          </div>
        </div>
      </div>
    </RandomAdZoneStyle>
  );
};

export default RandomAdZone;
