import styled from "@emotion/styled";
import { getMyChildInfo } from "api/parents/mychildinfo";
import LogoutButton from "components/common/LogoutButton";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import { getCookie, removeCookie, setCookie } from "utils/cookie";
import ParentsChildProfile from "./ParentsChildProfile";

const ParentsProfileStyle = styled.div`
  position: relative;
  width: 330px;
  height: 300px;
  perspective: 1000px;

  .page {
    position: absolute;
    /* background-color: #f5dec1; */
    box-shadow:
      0 0 2px rgba(0, 0, 0, 0.4),
      -2px 0 2px rgba(0, 0, 0, 0.4);
    width: 100%;
    /* height: 100%; */
  }

  #page1 {
    z-index: 1;
    transform-origin: left center;
    transition-duration: 1s;
    transition-timing-function: ease-in;
  }

  /* #page1:hover {
    transform: rotateY(-180deg);
    opacity: 0;
  } */

  .page1 {
    /* 기본 스타일 */
    transform-origin: left center;
    transition:
      transform 1s ease-in-out,
      opacity 1s ease-in-out,
      visibility 1s ease-in-out;
    /* 초기 상태 */
    transform: rotateY(0deg);
    opacity: 1;
    visibility: visible;
  }

  .page1.animate {
    animation: rotateAndFade 3s ease-in-out;
    animation-fill-mode: forwards;
  }

  @keyframes rotateAndFade {
    0% {
      transform: rotateY(0deg);
      opacity: 1;
      visibility: visible;
    }
    50% {
      transform: rotateY(-180deg);
      opacity: 0;
      visibility: visible;
    }
    100% {
      transform: rotateY(0deg);
      opacity: 0;
      visibility: visible;
    }
  }
  #page2 {
    z-index: 0;
  }

  .content {
    width: 100%;
    height: 100%;
    transition-duration: 1s;
  }

  /* #content1:hover {
    opacity: 0.4;
  } */

  .chainSection {
    position: absolute;
    top: 10px;
    left: 0;
    height: 100%;
    z-index: 10;
  }

  .chain {
    display: flex;
    align-items: center;
    margin: 18px 0;
  }

  .chainFrame {
    width: 20px;
    height: 8px;
    background-color: #616161;
    display: inline-block;
    z-index: 1;
    border-radius: 0 8px 8px 0;
  }

  .chainCircle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    display: inline-block;
    transform: translateX(-8px);
    box-shadow: -1px -1px 3px rgba(0, 0, 0, 0.4) inset;
  }

  /*
    친효애드온 : 포스트잇 모듈 (마크1) 시작
    https://rgy0409.tistory.com
    e-mail : rgy0409@gmail.com
*/
  .menu-rayRostIt {
    * {
      z-index: -10;
    }
  }

  div.rgyPostIt {
    left: 310px;
    /* right: -85px; */
    /* top: 8px; */
    text-wrap: nowrap;

    position: absolute;
    display: inline-block;
    /* padding: 20px 45px 20px 15px; */
    padding: 13px;
    margin: 5px 0;
    border: 1px solid #f8f861;
    border-left: 15px solid #f8f861;
    /* border-bottom-right-radius: 60px 10px; */
    border-bottom-right-radius: 35px 5px;
    font-size: 15px;
    color: #555;
    word-break: break-all;
    background: #ffff88; /* Old browsers */
    background: -moz-linear-gradient(
      -45deg,
      #ffff88 81%,
      #ffff88 82%,
      #ffff88 82%,
      #ffffc6 100%
    ); /* FF3.6+ */
    background: -webkit-gradient(
      linear,
      left top,
      right bottom,
      color-stop(81%, #ffff88),
      color-stop(82%, #ffff88),
      color-stop(82%, #ffff88),
      color-stop(100%, #ffffc6)
    ); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(
      -45deg,
      #ffff88 81%,
      #ffff88 82%,
      #ffff88 82%,
      #ffffc6 100%
    ); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(
      -45deg,
      #ffff88 81%,
      #ffff88 82%,
      #ffff88 82%,
      #ffffc6 100%
    ); /* Opera 11.10+ */
    background: -ms-linear-gradient(
      -45deg,
      #ffff88 81%,
      #ffff88 82%,
      #ffff88 82%,
      #ffffc6 100%
    ); /* IE10+ */
    background: linear-gradient(
      135deg,
      #ffff88 81%,
      #ffff88 82%,
      #ffff88 82%,
      #ffffc6 100%
    ); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffff88', endColorstr='#ffffc6', GradientType=1); /* IE6-9 fallback on horizontal gradient */
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
  }

  div.rgyPostIt::after {
    content: " ";
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: 35px;
    width: 150px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0);
    box-shadow: 2px 35px 5px rgba(0, 0, 0, 0.4);
    -webkit-box-shadow: 2px 35px 5px rgba(0, 0, 0, 0.4);
    transform: matrix(-1, -0.1, 0, 1, 0, 0);
    -webkit-transform: matrix(-1, -0.1, 0, 1, 0, 0);
    -moz-transform: matrix(-1, -0.1, 0, 1, 0, 0);
    -ms-transform: matrix(-1, -0.1, 0, 1, 0, 0);
    -o-transform: matrix(-1, -0.1, 0, 1, 0, 0);
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
  }

  div.rgyPostIt:hover {
    border-bottom-right-radius: 30px 15px;
  }

  div.rgyPostIt:hover::after {
    box-shadow: 2px 37px 7px rgba(0, 0, 0, 0.37);
    -webkit-box-shadow: 2px 37px 7px rgba(0, 0, 0, 0.37);
  }

  div.rgyPostIt > p {
    padding: 5px 0 !important;
  }

  div.rgyPostIt > p::before {
    content: "\f198";
    margin-right: 7px;
    font-family: "FontAwesome";
    font-weight: normal;
    font-size: 20px;
    vertical-align: middle;
  }

  div.rgyPostIt > p > a {
    color: #555;
  }
  /* 포스트잇 모듈 (마크1) 끝 */
  /* .no-transform {
    transform: none !important;
  } */
`;

const ParentsProfile = () => {
  const navigate = useNavigate();
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));

  const [myChildList, setMyChildList] = useState([]);
  const [offUseEffect, setOffUseEffect] = useState(false);

  /** 메뉴 선택 */
  const [countIndex, setCountIndex] = useState(0);

  /** 이전 자녀의 번호 */
  const [prevChildNum, setPrevChildNum] = useState(0);

  /** 메뉴 선택시 selectChildNum 변경 */
  const handleOnClick = (e, idx) => {
    console.log("들어옴.");
    setCountIndex(idx);
    setPrevChildNum(getCookie("studentPk"));
    setCookie("studentPk", idx);

    // 강제로 애니메이션 재시작
    const page1Element = page1Ref.current;
    page1Element.classList.remove("animate");
    void page1Element.offsetWidth; // Reflow
    page1Element.classList.add("animate");
  };

  /** 아이들 정보 불러오기 */
  const myChildInfo = async childNum => {
    const res = await getMyChildInfo();
    // console.log("자녀 정보 : ", res);

    if (res === false) {
      console.log("자녀 없음.");
    }

    const num = childNum;

    if (res) {
      // 자녀 리스트 저장
      setMyChildList(res);

      // 학생 PK 저장
      setCookie("studentPk", res[num].studentPk);

      setOffUseEffect(true);
    }
  };

  useEffect(() => {
    myChildInfo(getCookie("selectChildNum"));
  }, []);

  /** 프로필 html 코드 추가 */
  useEffect(() => {
    const chainSections = document.getElementsByClassName("chainSection");
    const chain = `
          <div class="chain">
          <div class="chainFrame"></div>
          <div class="chainCircle"></div>
          </div>
        `;

    for (let i = 0; i < chainSections.length; i++) {
      const chainSection = chainSections[i];

      for (let j = 0; j < 7; j++) {
        chainSection.innerHTML += chain;
      }
    }
  }, []);

  const page1Ref = useRef();

  // onClick={() => {
  //   asdf213.current.classList = "user-info-wrap page page1";
  // }}

  return (
    <ParentsProfileStyle>
      {/* 자녀 메뉴 - start */}
      {myChildList.map((item, index) => {
        const topPosition = index * 50 + 30; // 인덱스에 따라 left 위치 계산
        // console.log(item);
        return (
          <div
            className="rgyPostIt menu-rayRostIt"
            key={index}
            style={{ top: `${topPosition}px` }}
            onClick={e => {
              handleOnClick(e, index);
            }}
          >
            {item.name}
          </div>
        );
      })}
      {/* 자녀 메뉴 - end */}

      <div className="user-info-wrap page page1" id="page1" ref={page1Ref}>
        <div className="user-info-inner content" id="content1">
          {prevChildNum !== null ? (
            <ParentsChildProfile
              childInfo={myChildList[prevChildNum]}
              childNum={prevChildNum}
            />
          ) : null}
        </div>
        <section className="chainSection"></section>
      </div>

      <div
        className="user-info-wrap page"
        id="page2"
        // ref={asdf213}
        // onClick={() => {
        //   asdf213.current.classList = "user-info-wrap page page2";
        // }}
      >
        <div className="user-info-inner content" id="contents">
          <ParentsChildProfile
            childInfo={myChildList[getCookie("studentPk")]}
            childNum={getCookie("studentPk")}
          />
        </div>
        <section className="chainSection"></section>
      </div>
    </ParentsProfileStyle>
  );
};

export default ParentsProfile;
