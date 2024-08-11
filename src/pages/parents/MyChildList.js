import styled from "@emotion/styled";
import Footer from "components/layout/Footer";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderProfile from "components/layout/header/HeaderProfile";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import React from "react";

const MyChildListStyle = styled.div`
  /* max-width: 1180px; */
  /* width: 1180px; */
  /* background-color: #f3f9fa; */
  margin: 0 auto;
  min-height: calc(100vh - 328px);

  display: flex;
  flex-direction: column;

  /* & > div { */
  /* height: 100%; */
  /* } */
  .top-div {
    background-color: #e8f2f4;
    height: 80px;
  }

  .child-list-wrap {
    position: relative;
    width: 1180px;
    margin: 0 auto;
    z-index: 1;
    min-height: 600px;

    .child-list-inner {
      position: relative;
      z-index: 99999;
      width: 100%;
      height: 100%;
      background-color: green;

      .menu-list {
        position: relative;
        height: 100%;
        width: 100%;
        z-index: 1;

        h1 {
          position: absolute;
          z-index: -1;
          background-color: blue;
          width: 200px;
          height: 80px;
          color: white;
          top: -40px;
          border-radius: 50px;
        }
      }
    }
  }
`;

const MyChildList = () => {
  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <HeaderProfile />
      <MyChildListStyle>
        <div className="top-div"></div>

        <div className="child-list-wrap">
          <div className="child-list-inner">
            <div className="menu-list">
              <h1>나의 공간</h1>
              <ul>
                <li>자녀 목록</li>
              </ul>
            </div>
          </div>
        </div>
      </MyChildListStyle>
      <Footer />
    </>
  );
};

export default MyChildList;
