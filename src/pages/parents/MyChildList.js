import styled from "@emotion/styled";
import { getMyChildInfo } from "api/parents/mychildinfo";
import ThreeDimensionsAccordion from "components/common/accordion/ThreeDimensionsAccordion";
import Footer from "components/layout/Footer";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderProfile from "components/layout/header/HeaderProfile";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "utils/cookie";

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

const PageWrapStyle = styled.div`
  position: relative;
  width: 100vw;
  min-height: calc(100vh - 328px);
  display: flex;
  justify-content: center;
  /* background-color: #f3f9fa; */
  background-color: white;

  .page-inner {
    position: absolute;
    height: 100%;
    min-width: 955px;

    display: flex;
    flex-direction: row;

    z-index: 1;

    .page-menu-wrap {
      .page-name {
        position: absolute;
        z-index: 0;
        top: -30px;
        left: -50px;
        background-color: yellow;
        border-radius: 50px;
        width: 250px;
        height: 85px;

        display: flex;
        /* justify-content: center; */
        align-items: center;
        padding: 0 40px;
        font-size: 20px;
        font-weight: bold;
      }
      .page-menu {
        top: 70px;
        left: -20px;
        position: absolute;
        z-index: 3;
        width: 200px;
        height: 200px;
      }
    }

    .page-content-wrap {
      position: absolute;
      right: 0;
      width: 90%;
      height: 100%;
      background-color: white;
      border-radius: 50px 0 0 0;
      z-index: 2;

      padding-right: 50px;

      .child-info-inner {
        height: 100%;
        position: relative;
        display: flex;
        padding-top: 50px;
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-end;
        gap: 40px;
        padding-bottom: 40px;

        .child-info-div,
        .no-child-info-div {
          position: relative;
          min-height: 220px;

          height: fit-content;
          overflow: hidden;
          background-color: gray;
          max-width: 600px;
          width: 100%;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .child-info-wrap {
            display: flex;
            flex-direction: row;
            width: 100%;
            position: absolute;
            height: calc(100% - 50px);
            top: 0;

            .child-img-wrap {
              width: 33%;
              /* padding: 20px; */
              display: flex;
              justify-content: center;
              align-items: center;

              .child-img {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background-color: green;
              }
            }
            .child-info {
              width: 67%;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: center;
              gap: 10px;

              .child-info-text {
                font-size: 15px;
              }
            }
          }

          .child-btn-wrap {
            width: 100%;
            background-color: cadetblue;
            display: flex;
            flex-direction: row;
            bottom: 0;
            position: absolute;

            grid-template-columns: 1fr 1fr 1fr;

            & button {
              border: 1px solid;
              min-width: 33%;
              flex-grow: 1;

              height: 50px;
            }
          }
        }

        .no-child-info-div {
          height: 95%;
          background-color: lightgray;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 25px;
          color: gray;
        }

        .child-add-div {
          height: 100%;

          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          gap: 20px;

          .child-add-icon {
            width: 33%;
            /* padding: 20px; */
            display: flex;
            justify-content: center;
            align-items: center;

            .child-img {
              width: 120px;
              height: 120px;
              border-radius: 50%;
              background-color: green;
            }
          }
          .child-add-text {
            font-size: 25px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .page-inner {
      .page-content-wrap {
        background-color: red !important;
      }
    }
  }
`;

const TopDiv = styled.div`
  background-color: #e8f2f4;
  height: 50px;
  @media screen and (max-width: 1023px) {
    padding-top: 140px;
  }
`;

const MyChildList = () => {
  const [myChildList, setMyChildList] = useState([]);
  const [offUseEffect, setOffUseEffect] = useState(false);

  /** 아이들 정보 불러오기 */
  const myChildInfo = async childNum => {
    const res = await getMyChildInfo();
    console.log("자녀 정보 : ", res);

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

  useEffect(() => {
    console.log("새로고침 : ", myChildList);
  }, [myChildList]);

  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <HeaderProfile />
      {/* 여백용 */}
      <TopDiv></TopDiv>
      <PageWrapStyle>
        <div className="page-inner">
          <div className="page-menu-wrap">
            <div className="page-name">나의 공간</div>
            <div className="page-menu">
              <ThreeDimensionsAccordion />
            </div>
          </div>
          <div className="page-content-wrap">
            <div className="child-info-inner">
              {myChildList.length !== 0 ? (
                myChildList.map((item, index) => {
                  return (
                    <div className="child-info-div" key={index}>
                      {/* <div className="child-info-div"> */}

                      <div className="child-info-wrap">
                        <div className="child-img-wrap">
                          <div className="child-img"></div>
                        </div>
                        <div className="child-info">
                          <div className="child-info-text">
                            자녀 이름 : {item.name}
                          </div>
                          <div className="child-info-text">
                            생년월일(나이) : {item.birth}( {item.age})
                          </div>
                          <div className="child-info-text">
                            학생 연락처 : {item.phone}
                          </div>
                          <div className="child-info-text">
                            학부모 연락처(성함) : {item.parentPhonme}({" "}
                            {item.parentName})
                          </div>
                          <div className="child-info-text">
                            학급(담임 선생님) : {item.classId.split(" ")[0]}{" "}
                            학년 {item.classId.split(" ")[1]} 반 (
                            {item.teacherName} )
                          </div>
                        </div>
                      </div>
                      <div className="child-btn-wrap">
                        <button>상세정보</button>
                        <button>성적확인</button>
                        <button
                          onClick={() => {
                            setCookie("studentPk", item.studentPk);
                          }}
                        >
                          자녀 선택
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-child-info-div">
                  자녀 정보를 불러오지 못했습니다.
                </div>
              )}

              {myChildList.length !== 0 ? (
                <div className="child-info-div child-add-div">
                  {/* <div className="child-info-div"> */}

                  <div className="child-add-icon">
                    <div className="child-img"></div>
                  </div>
                  <div className="child-add-text">자녀 추가하기</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </PageWrapStyle>

      {/* <MyChildListStyle>
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
      </MyChildListStyle> */}
      <Footer />
    </>
  );
};

export default MyChildList;
