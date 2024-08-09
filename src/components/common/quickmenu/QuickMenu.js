import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";

const QuickMenuStyle = styled.div`
  position: fixed;
  right: 0;
  width: 88px;
  height: 167px;
  padding-top: 0;
  border-radius: 25px 25px 0 0;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
  z-index: 99999;

  transform: translateY(-50%);
  transition: top 0.7s ease-out;

  .quick_wrap {
    .userquick_tit {
      position: relative;
      display: flex;
      height: 35px;
      justify-content: center;
      align-items: center;
      border-radius: 25px 0 0 0;
      text-align: center;
      background-color: #6ea1ff;
    }
    .quick_btns {
      display: flex;
      box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
      position: relative;
      width: 88px;
      height: 167px;
      border-radius: 0 0 0 10px;
      padding: 12px 0;
      flex-direction: column;
      justify-content: space-between;
      background: #fff;
      box-sizing: border-box;

      .btn {
        position: relative;
        margin-bottom: 1px;
        width: auto;

        .qk {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          position: relative;
          line-height: normal;
          box-sizing: border-box;
          width: 76px;
          height: 44px;
          margin: 0 auto;
          border-radius: 5px;
          text-align: center;
          overflow: hidden;

          .hidden {
            overflow: hidden;
            height: 0;
            width: 0;
            line-height: 0;
            font-size: 0;
            text-indent: -9999999px;
          }
        }

        .qk::before {
          content: "";
          display: block;
          width: 0;
          height: 70px;
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 5;
          transition: 0.8s;
          color: #fff;
          line-height: normal;
          text-align: center;
        }
      }
    }
  }
`;

const QuickMenu = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [boxOffsetTop, setBoxOffsetTop] = useState(0);
  const [quickMenuHeight, setQuickMenuHeight] = useState(0);

  const boxRef = useRef(null);
  const quickMenuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (boxRef.current) {
        setBoxHeight(boxRef.current.clientHeight);
        setBoxOffsetTop(
          boxRef.current.getBoundingClientRect().top + window.scrollY,
        );
      }
      if (quickMenuRef.current) {
        setQuickMenuHeight(quickMenuRef.current.clientHeight);
      }
    };

    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    handleResize(); // Initial call to set dimensions

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (quickMenuRef.current) {
      const point =
        scrollTop < boxOffsetTop
          ? 0
          : scrollTop > boxHeight - quickMenuHeight
            ? boxHeight - quickMenuHeight
            : scrollTop - boxOffsetTop;

      quickMenuRef.current.style.top = `${point}px`;
    }
  }, [scrollTop, boxHeight, boxOffsetTop, quickMenuHeight]);

  return (
    <QuickMenuStyle ref={quickMenuRef}>
      <div className="quick_wrap">
        <p className="userquick_tit">111</p>
        <ul className="quick_btns">
          <li className="btn">
            <a href="/" className="qk qk01" data-num="01">
              <span className="hidden">학생</span>
            </a>
            <div className="quick_box qb01">
              <div className="qbox">
                <ul className="clear_fix"></ul>
                <p className="qk_bt_tit">
                  <img src="" alt="학생 퀵메뉴" />
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </QuickMenuStyle>
  );
};

export default QuickMenu;
