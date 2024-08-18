import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router";
import iconStatic1 from "./icon/korean-icon-static.png";
import iconGif1 from "./icon/korean-icon.gif";
import iconStatic2 from "./icon/math-icon-static.png";
import iconGif2 from "./icon/math-icon.gif";

import iconStatic3 from "./icon/english-icon-static.png";
import iconGif3 from "./icon/english-icon.gif";

import iconStatic4 from "./icon/science-icon-static.png";
import iconGif4 from "./icon/science-icon.gif";

import iconStatic5 from "./icon/art-icon-static.png";
import iconGif5 from "./icon/art-icon.gif";
import iconStatic6 from "./icon/sports-icon-static.png";
import iconGif6 from "./icon/sports-icon.gif";
import iconStatic7 from "./icon/morality-icon-static.png";
import iconGif7 from "./icon/morality-icon.gif";
import iconStatic8 from "./icon/music-icon-static.png";
import iconGif8 from "./icon/music-icon.gif";
import { getCookie } from "utils/cookie";

const iconStaticMap = {
  0: iconStatic1,
  1: iconStatic2,
  2: iconStatic3,
  3: iconStatic4,
  4: iconStatic5,
  5: iconStatic6,
  6: iconStatic7,
  7: iconStatic8,
  // 필요에 따라 더 많은 이미지 매핑
};

const iconGifMap = {
  0: iconGif1,
  1: iconGif2,
  2: iconGif3,
  3: iconGif4,
  4: iconGif5,
  5: iconGif6,
  6: iconGif7,
  7: iconGif8,
  // 필요에 따라 더 많은 GIF 매핑
};

const SubjectsListWrapStyle = styled.div`
  .subjects-list-warp {
    padding: 0 100px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    gap: 40px;
    position: relative;

    .box {
      cursor: pointer;
      width: 200px;
      height: 200px;
      /* border-radius: 20px; */
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      transition: transform 0.6s ease;
    }
  }
`;

const SubjectsListWrap = () => {
  const navigate = useNavigate();
  const [subjectsList1, setSubjectsList1] = useState(["국어", "수학", "영어"]);
  const [subjectsList2, setSubjectsList2] = useState(["과학", "미술", "체육"]);
  const [subjectsList3, setSubjectsList3] = useState([
    "바른생활",
    "음악",
    // "사회/도덕",
  ]);

  const movePage = (pageNum, pageName) => {
    if (getCookie("accessToken")) {
      if (pageNum === 1 || pageNum === 2) {
        navigate("/online/test/ex", {
          state: { subjectsNum: pageNum, subjectsName: pageName },
        });
      } else {
        alert("준비중인 서비스입니다.");
      }
    } else {
      navigate("/login");
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <SubjectsListWrapStyle>
      <div className="subjects-list-warp">
        <div className={`wrapper wrapper1`}>
          {subjectsList1.map((item, index) => (
            <div
              className="container"
              id={`c${index}`}
              key={index}
              onClick={() => movePage(index + 1, item)}
            >
              <div className="image">
                <img
                  className="static"
                  src={iconStaticMap[index]}
                  alt="Static Icon"
                />
                <img
                  className="gif"
                  src={iconGifMap[index]}
                  alt="Animated Icon"
                />
              </div>
              <div className="story">
                <div className="info">
                  <p>{item}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`wrapper wrapper2`}>
          {subjectsList2.map((item, index) => (
            <div
              className="container"
              id={`c${index + 3}`}
              key={index}
              onClick={() => movePage(index + 4, item)}
            >
              <div className="image">
                <img
                  className="static"
                  src={iconStaticMap[index + 3]}
                  alt="Static Icon"
                />
                <img
                  className="gif"
                  src={iconGifMap[index + 3]}
                  alt="Animated Icon"
                />
              </div>
              <div className="story">
                <div className="info">
                  <p>{item}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`wrapper wrapper3`}>
          {subjectsList3.map((item, index) => (
            <div
              className="container"
              id={`c${index + 6}`}
              key={index}
              onClick={() => movePage(index + 7, item)}
            >
              <div className="image">
                <img
                  className="static"
                  src={iconStaticMap[index + 6]}
                  alt="Static Icon"
                />
                <img
                  className="gif"
                  src={iconGifMap[index + 6]}
                  alt="Animated Icon"
                />
              </div>
              <div className="story">
                <div className="info">
                  <p>{item}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* {subjectsList.map((item, index) => (
          <div
            key={index}
            className="box"
            onClick={() => movePage(index + 1, item)}
          >
            <a href="#">{item}</a>
          </div>
        ))} */}
      </div>
    </SubjectsListWrapStyle>
  );
};

export default SubjectsListWrap;
