import styled from "@emotion/styled";
import { getAwaitAcceptList, getAwaitUserList } from "api/admin/adminapi";
import { useEffect, useRef, useState } from "react";
import "../../scss/admin/adminhomestyle.css";
import { useDispatch, useSelector } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";
import { AdminPageMenu } from "./AdminPageMenu";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import moment from "moment";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SearchInput } from "components/common/style/SearchInput";
import { switchCase } from "@babel/types";

const AdminHomeStyle = styled.div`
  width: 100vw;
  background-color: #fbfaf9;

  & > div:first-of-type {
    position: absolute;
    width: 100%;
  }
`;

const AdminMainStyle = styled.div`
  position: relative;

  max-width: 1180px;
  width: 1180px;
  margin: 0 auto;
  background-color: #f3f9fa;
  padding: 65px 80px;
  height: 100vh;
  max-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .admin-home-wrap {
    width: 100%;
    height: 100%;
    /* position: absolute; */
    /* background-color: gray; */
  }
  /* border-radius */

  .admin-home-core {
    .user-info-wrap {
      position: absolute;
      top: 80px;
      margin: 0;
      .user-info-tap {
        .property {
          & > div {
            border-radius: 0px 0px 10px 10px;
            border-top: none;
            border-bottom: solid 2px #886348;
          }
        }
      }
    }

    .grid-frame {
      margin-top: 40px;

      .grid-inner {
        grid-template-columns: 80px 200px 130px 80px 80px 1fr 1fr;
      }
    }
  }

  /* 수정중 */
  .skeleton-grid-inner-item {
    height: 25px;
    width: 70%;
    /* background-color: red; */
  }

  .search-input-wrap {
    position: relative;
    height: 70px;

    & > div {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
`;

const AdminHome = () => {
  const modalState = useSelector(state => state.modalSlice);
  const dispatch = useDispatch();

  // 출력되는 리스트 저장
  const [acceptUserList, setAcceptUserList] = useState([]);
  // 선택된 메뉴 (0, 1, 2, 3....)
  const [nowSelectMemu, setNowSelectMemu] = useState(0);

  // 검색 키워드
  const [searchKeyword, setSearchKeyword] = useState("");
  const [clickSearchBtn, setClickSearchBtn] = useState(false);

  /** 신청 리스트 출력 함수 */
  const getAwaitList = async nowSelectMemu => {
    const res = await getAwaitAcceptList(nowSelectMemu);
    setAcceptUserList(res);
    console.log("신청 : ", res);
  };

  /** 신청 리스트 출력 함수 */
  const getUserList = async useNum => {
    const res = await getAwaitUserList(useNum);
    setAcceptUserList(res);
  };

  // /api/admin/list

  /** 최초 랜더링 시, 메뉴 선택시, 모달 종료시 리스트 재출력 */
  useEffect(() => {
    switch (nowSelectMemu) {
      case 0:
        getAwaitList(nowSelectMemu + 1);
        break;
      case 1:
        getAwaitList(nowSelectMemu + 1);
        break;
      case 2:
        console.log("3번 메뉴");
        // 학부모 목록
        getUserList(1);
        break;
      case 3:
        // 교직원 목록
        getAwaitList(2);
        console.log("4번 메뉴");

        // getAwaitList(nowSelectMemu + 1);
        break;
      default:
        break;
    }
  }, [nowSelectMemu, modalState.modalRes]);

  /** 모달 호출 */
  const showModal = (selectBtn, selectUserId, selectUserName, selectUserPk) => {
    /** (선택) 들어갈 내용 수정 */
    const data = {
      headerText: [selectBtn],
      bodyTextLabel: ["ID", "이름"],
      bodyText: [selectUserId, selectUserName, selectUserPk, nowSelectMemu],
      buttonText: [selectBtn, "취소"],
    };

    /** (선택) 위와 아래는 세트 */
    dispatch(updateModalDate(data));
    /**(고정) 모달 활성화 */
    dispatch(openModal("ArrValueModal"));
  };

  return (
    <AdminHomeStyle>
      <GreenHeaderNoOption />

      <AdminMainStyle>
        <div className="admin-home-wrap">
          <AdminPageMenu
            menuLabelList={[
              "신청(학부모)",
              "신청(교직원)",
              "학부모 목록",
              "교직원 목록",
            ]}
            menuType={"bottom-type-menu"}
            setNowSelectMemu={setNowSelectMemu}
          ></AdminPageMenu>

          <div className="search-input-wrap">
            <SearchInput
              setSearchKeyword={setSearchKeyword}
              setClickSearchBtn={setClickSearchBtn}
            />
          </div>

          <div className="main-core admin-home-core">
            <div className="grid-frame">
              <div className="item">
                <div className="grid-inner">
                  <div className="grid-inner-item">
                    <div className="grid-inner-item-text">구분</div>
                  </div>
                  <div className="grid-inner-item">
                    <div className="grid-inner-item-text">아이디</div>
                  </div>
                  <div className="grid-inner-item">
                    <div className="grid-inner-item-text">이름</div>
                  </div>
                  <div className="grid-inner-item">
                    <div className="grid-inner-item-text">학년</div>
                  </div>
                  <div className="grid-inner-item">
                    <div className="grid-inner-item-text">학급</div>
                  </div>
                  <div className="grid-inner-item">
                    <div className="grid-inner-item-text">승인 신청일</div>
                  </div>
                  <div className="grid-inner-item">
                    <div className="grid-inner-item-text">반려 / 승인</div>
                  </div>
                </div>
              </div>
              {/* {test ? null : (
                <div className="item">
                  <div className="grid-inner">
                    <Skeleton className="grid-inner-item">
                      <div className="grid-inner-item-text skeleton-grid-inner-item">
                        1111
                      </div>
                    </Skeleton>
                    <Skeleton className="grid-inner-item">
                      <div className="grid-inner-item-text skeleton-grid-inner-item"></div>
                    </Skeleton>
                    <Skeleton className="grid-inner-item">
                      <div className="grid-inner-item-text skeleton-grid-inner-item"></div>
                    </Skeleton>
                    <Skeleton className="grid-inner-item ">
                      <div className="grid-inner-item-text skeleton-grid-inner-item"></div>
                    </Skeleton>
                    <Skeleton className="grid-inner-item">
                      <div className="grid-inner-item-text skeleton-grid-inner-item"></div>
                    </Skeleton>
                    <Skeleton className="grid-inner-item">
                      <div className="grid-inner-item-text skeleton-grid-inner-item"></div>
                    </Skeleton>
                    <Skeleton className="grid-inner-item">
                      <div className="grid-inner-item-text sign-off-on-buttons skeleton-grid-inner-item">
                        <button
                          className="rejected-button"
                          onClick={() => {
                            showModal("반려", item.id, item.name, item.pk);
                          }}
                        >
                          반려
                        </button>
                        <button
                          className="accept-button"
                          onClick={() => {
                            showModal("승인", item.id, item.name, item.pk);
                          }}
                        >
                          승인
                        </button>
                      </div>
                    </Skeleton>
                  </div>
                </div>
              )} */}
              {acceptUserList.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <div className="grid-inner">
                      <div className="grid-inner-item">
                        <div className="grid-inner-item-text">{index + 1}</div>
                      </div>
                      <div className="grid-inner-item">
                        <div className="grid-inner-item-text">{item.id}</div>
                      </div>
                      <div className="grid-inner-item">
                        <div className="grid-inner-item-text">{item.name}</div>
                      </div>
                      <div className="grid-inner-item">
                        <div className="grid-inner-item-text">
                          {item.grade === null ? (
                            <div className="admin-no-list-style">미입력</div>
                          ) : (
                            item.grade
                          )}
                        </div>
                      </div>
                      <div className="grid-inner-item">
                        <div className="grid-inner-item-text">
                          {item.class === null ? (
                            <div className="admin-no-list-style">미입력</div>
                          ) : (
                            item.class
                          )}
                        </div>
                      </div>
                      <div className="grid-inner-item">
                        <div className="grid-inner-item-text">
                          {moment(item.createdAt).format("YYYY-MM-DD hh:mm:ss")}
                        </div>
                      </div>
                      <div className="grid-inner-item">
                        <div className="grid-inner-item-text sign-off-on-buttons">
                          <button
                            className="rejected-button"
                            onClick={() => {
                              showModal("반려", item.id, item.name, item.pk);
                            }}
                          >
                            반려
                          </button>
                          <button
                            className="accept-button"
                            onClick={() => {
                              showModal("승인", item.id, item.name, item.pk);
                            }}
                          >
                            승인
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* 참고 */}
              {/* <div className="item">
              <div className="grid-inner">
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">학부모</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">acahe1d3</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">길형태</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">4</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">2</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">2024.06.28</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text sign-off-on-buttons">
                    <button className="rejected-button">반려</button>
                    <button className="accept-button">승인</button>
                  </div>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </AdminMainStyle>
    </AdminHomeStyle>
  );
};

export default AdminHome;
