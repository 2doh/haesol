import styled from "@emotion/styled";
import { getMyChildInfo } from "api/parents/mychildinfo";
import { allowScroll, preventScroll } from "components/common/ScrollManagement";
import ThreeDimensionsAccordion from "components/common/accordion/ThreeDimensionsAccordion";
import Footer from "components/layout/Footer";
import HeaderMemu from "components/layout/header/HeaderMenu";
import HeaderProfile from "components/layout/header/HeaderProfile";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";
import { getCookie, setCookie } from "utils/cookie";
import SocialLoginIntegration from "./SocialLoginIntegration";
import { useNavigate } from "react-router";

import defaultImg from "../../images/default_pic.png";
import { getParentsInfo } from "api/parents/parentsapi";
import BoxTitle from "components/common/style/BoxTitle";

const PageWrapStyle = styled.div`
  position: relative;
  width: 100vw;
  min-height: calc(100vh - 328px);
  display: flex;
  justify-content: center;
  /* background-color: #f3f9fa; */
  background-color: white;
  .page-inner {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1180px; /* Adjust the max-width as needed */
    margin: 0 auto;
    height: 100%; /* Ensure it adjusts to content height */
    .page-menu-wrap {
      height: 100%;
      width: 185px;
      position: relative;

      .page-name {
        position: absolute;
        z-index: 0;
        top: -30px;
        /* left: -50px; */
        background-color: #f05650;
        border-radius: 50px;
        width: 250px;
        height: 70px;

        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 40px;
        font-size: 25px;
        font-weight: bold;
        color: white;
      }
      .page-menu {
        /* top: 70px;
        left: 25px; */
        top: 160px;
        left: 0px;
        position: absolute;
        z-index: 3;
        width: 250px;
        height: 100%;
      }
    }

    .page-content-wrap {
      flex: 1; /* Take up the remaining space */
      background-color: white;
      border-radius: 50px 0 0 0;
      padding-right: 50px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      overflow: auto; /* Handle overflow if content exceeds the container */
      /* margin-left: 135px; */

      .child-info-inner {
        height: 100%;
        position: relative;
        display: flex;
        padding-top: 50px;
        padding-right: 55px;
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-end;
        gap: 40px;
        z-index: 0;
        background-color: white;
        padding-bottom: 80px;

        .sub-title {
          padding-top: 20px;
          width: 600px;
        }

        .child-info-div,
        .no-child-info-div {
          box-shadow:
            0 19px 38px rgba(0, 0, 0, 0.3),
            0 15px 12px rgba(0, 0, 0, 0.22);

          position: relative;
          min-height: 220px;

          height: fit-content;
          overflow: hidden;
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
                position: relative;
                width: 140px;
                height: 140px;
                border-radius: 50%;

                img {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .child-info {
              width: 67%;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: center;
              gap: 15px;

              .child-info-text {
                font-size: 15px;
              }
            }
          }

          .child-btn-wrap {
            width: 100%;
            /* background-color: cadetblue; */
            display: flex;
            flex-direction: row;
            bottom: 0;
            position: absolute;

            grid-template-columns: 1fr 1fr 1fr;

            & button {
              min-width: 33%;
              flex-grow: 1;
              background-color: #ff8a8a;
              font-size: 15px;

              height: 50px;
              border-top: 1px solid #d9381e;
              border-right: 1px solid #d9381e;

              &:hover {
                background-color: #ff5c5c;
                color: white;
                /* font-weight: bold; */
              }
              &:last-of-type {
                border-right: 0;
              }
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

          min-height: 500px;
          max-width: 750px;
        }

        .child-add-div {
          height: 100%;

          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          cursor: pointer;

          .child-add-icon {
            width: 33%;
            display: flex;
            justify-content: center;
            align-items: center;

            .child-img {
              position: relative;
              width: 100px;
              height: 100px;
              /* border-radius: 50%; */

              .button_plus {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;

                background: #fff;
                cursor: pointer;
                border: 2px solid #095776;

                /* Mittig */
                /* top: 50%; */
                /* left: 50%; */
              }

              .button_plus:after {
                content: "";
                position: absolute;
                transform: translate(-50%, -50%);
                height: 4px;
                width: 50%;
                background: #095776;
                top: 50%;
                left: 50%;
              }

              .button_plus:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #095776;
                height: 50%;
                width: 4px;
              }

              .button_plus:hover:before,
              .button_plus:hover:after {
                background: #fff;
                transition: 0.2s;
              }

              .button_plus:hover {
                background-color: #095776;
                transition: 0.2s;
              }
            }
          }
          .child-add-text {
            font-size: 25px;
          }
        }
      }
    }
  }

  .parents-info-div {
    padding: 0 20px;
    min-height: 390px !important;

    .parents-info-wrap {
      flex-direction: column !important;
      position: static !important;
      border-radius: 20px;
      width: 100%;
      /* height: auto !important; */
      padding: 30px;
      background-color: lightgoldenrodyellow;

      gap: 35px;
    }

    .parents-info {
      width: 100% !important;
      flex-wrap: wrap !important;
      flex-direction: row !important;
      justify-content: left !important;

      .child-info-text:first-of-type,
      .child-info-text:nth-of-type(2) {
        max-width: 48%;
        width: 48%;
      }
      .child-info-text:last-of-type,
      .child-info-text:nth-of-type(3) {
        max-width: 100%;
        width: 100%;
      }
    }

    .child-info-text {
      display: flex;
      flex-direction: row;

      & p:first-of-type {
        font-size: 18px;
        padding-right: 10px;
      }
      & p:last-of-type {
      }

      .no-data {
        color: #949494;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .page-inner {
      .page-content-wrap {
        /* background-color: red !important; */
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
  const navigate = useNavigate();

  const [myInfoData, setMyInfoData] = useState("");
  const [myChildList, setMyChildList] = useState([]);
  const [offUseEffect, setOffUseEffect] = useState(false);

  const dispatch = useDispatch();

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

  const myInfo = async () => {
    const res = await getParentsInfo();

    if (res) {
      setMyInfoData(res);
      console.log("부모 데이터 : ", res);
    }
  };

  useEffect(() => {
    myChildInfo(getCookie("selectChildNum"));
    myInfo();
  }, []);

  useEffect(() => {
    console.log("새로고침 : ", myChildList);
  }, [myChildList]);

  const addChild = () => {
    const data = {
      headerText: "자녀 추가",
      buttonText: ["추가", "취소"],
      modalRes: [14],
    };

    // addChildModal

    dispatch(updateModalDate(data));
    dispatch(openModal("AddChildModal"));
  };

  const movePage = (pageNum, item) => {
    console.log("item : ", item);
    // navigate("/parents/studentinfo");
    setCookie("studentPk", item.studentPk);

    switch (pageNum) {
      case 1:
        navigate("/parents/studentinfo");
        break;
      case 2:
        navigate(`/grade/${item.studentPk}`);
        break;
      default:
        break;
    }
  };

  // const childImg = item => {
  //   if (item) {
  //   }
  // };

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
            <div className="page-name">자녀 목록</div>
            <div className="page-menu">
              {myChildList.length !== 0 ? (
                <ThreeDimensionsAccordion menuList={myChildList} />
              ) : null}
            </div>
          </div>
          <div className="page-content-wrap">
            <div className="child-info-inner">
              {myInfoData === "" ? null : (
                <div className="child-info-div parents-info-div">
                  <div className="child-info-wrap parents-info-wrap">
                    <div className="child-info parents-info">
                      <div className="child-info-text">
                        <p>학부모 명 : </p>
                        {myInfoData.nm ? (
                          <p>{myInfoData.nm}</p>
                        ) : (
                          <p className="no-data">미등록</p>
                        )}
                      </div>
                      <div className="child-info-text">
                        <p>전화번호 : </p>
                        {myInfoData.phone ? (
                          <p>{myInfoData.phone}</p>
                        ) : (
                          <p className="no-data"> 미등록</p>
                        )}
                      </div>
                      <div className="child-info-text">
                        <p>이메일 :&nbsp;</p>
                        {myInfoData.email ? (
                          <p>{myInfoData.email}</p>
                        ) : (
                          <p className="no-data">미등록</p>
                        )}
                      </div>
                      <div className="child-info-text">
                        <p>주소 :</p>

                        {myInfoData.zoneCode ? `(${myInfoData.email})` : null}
                        {myInfoData.addr ? (
                          <p>{myInfoData.addr}</p>
                        ) : (
                          <p className="no-data">미등록</p>
                        )}
                      </div>
                    </div>
                    <SocialLoginIntegration />
                  </div>
                </div>
              )}
              <div className="sub-title">
                <BoxTitle>자녀 목록</BoxTitle>
              </div>
              {myChildList.length !== 0 ? (
                myChildList.map((item, index) => {
                  console.log(item);
                  return (
                    <div className="child-info-div" key={index}>
                      {/* <div className="child-info-div"> */}

                      <div className="child-info-wrap">
                        <div className="child-img-wrap">
                          <div className="child-img">
                            {item.pic === null ? (
                              <img src={defaultImg} />
                            ) : (
                              <img
                                src={`http://192.168.0.144:5121/pic/student/${item.parentsPK}/${item.pic}`}
                              />
                            )}
                          </div>
                        </div>
                        <div className="child-info">
                          <div className="child-info-text">
                            자녀 이름 : {item.name}
                          </div>
                          <div className="child-info-text">
                            생년월일 : {item.birth} ({item.age}세)
                          </div>
                          <div className="child-info-text">
                            학급 : {item.classId.split(" ")[0]} 학년{" "}
                            {item.classId.split(" ")[1]} 반
                          </div>
                          <div className="child-info-text">
                            담임 선생 : {item.teacherName}
                          </div>
                        </div>
                      </div>
                      <div className="child-btn-wrap">
                        <button
                          onClick={() => {
                            movePage(1, item);
                          }}
                        >
                          상세정보
                        </button>
                        <button
                          onClick={() => {
                            movePage(2, item);
                          }}
                        >
                          성적확인
                        </button>
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
                <div
                  className="child-info-div child-add-div"
                  onClick={() => {
                    addChild();
                  }}
                >
                  {/* <div className="child-info-div"> */}

                  <div className="child-add-icon">
                    <div className="child-img">
                      <div className="button_plus"></div>
                    </div>
                  </div>
                  <div className="child-add-text">자녀 추가하기</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </PageWrapStyle>

      <Footer />
    </>
  );
};

export default MyChildList;
