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
import { HiRefresh } from "react-icons/hi";

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

    .search-opction {
      display: flex;
      flex-direction: row;
      gap: 5px;
      /* width: 100%;
      height: 100%; */

      position: absolute;
      right: 0;
      bottom: 0;

      .refresh-icon {
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 25px;
        min-width: 45px;
        & * {
          color: #5d9e88;
        }

        &:hover {
          font-size: 30px;

          svg {
            animation: rotate_image 2s linear infinite;
            transform-origin: 50% 50%;
          }
          @keyframes rotate_image {
            100% {
              transform: rotate(360deg);
            }
          }
        }
      }

      .checkbox-wrapper-4 {
        display: flex;
        align-items: center;

        span {
          font-size: 15px;
          color: #636262;
        }
      }
    }
  }
`;

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  font-size: 30px;
  color: gray;
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

  // 퇴사자 포함 체크박스
  const [isCheck, setIsCheck] = useState(1);

  /** 신청 리스트 출력 함수 */
  const getAwaitList = async nowSelectMemu => {
    const res = await getAwaitAcceptList(nowSelectMemu, searchKeyword);
    setAcceptUserList(res);
  };

  /** 가입한 유저 리스트 출력 함수 */
  const getUserList = async useNum => {
    const res = await getAwaitUserList(useNum, isCheck, searchKeyword);
    setAcceptUserList(res);
  };

  /** 메뉴 선택시, 모달 종료시 리스트, 체크박스 클릭시 리스트 재출력 */
  const listCall = () => {
    setClickSearchBtn(false);

    if (!clickSearchBtn) {
      setSearchKeyword("");
    }

    switch (nowSelectMemu) {
      case 0:
        getAwaitList(1);
        break;
      case 1:
        getAwaitList(2);
        break;
      case 2:
        // 학부모 목록
        getUserList(1);
        break;
      case 3:
        // 교직원 목록
        getUserList(2);
        console.log("4번 메뉴");
        break;
      default:
        break;
    }
  };

  /** 최초 랜더링 시, 리스트 재출력 */
  useEffect(() => {
    listCall(nowSelectMemu);
  }, [nowSelectMemu, modalState.modalRes, clickSearchBtn, isCheck]);

  /** 메뉴 변경시 퇴사자 포함 체크박스 초기화 */
  useEffect(() => {
    setIsCheck(1);
  }, [nowSelectMemu]);

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

  /** 퇴사자 포함 체크박스 확인 */
  const checkBoxCheck = e => {
    if (e.target.checked) {
      setIsCheck(2);
    } else {
      setIsCheck(1);
    }
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
            <div className="search-opction">
              {nowSelectMemu === 2 || nowSelectMemu === 3 ? (
                <div className="checkbox-wrapper-4">
                  <input
                    className="inp-cbx"
                    id="morning"
                    type="checkbox"
                    checked={isCheck === 2 ? true : false}
                    onChange={e => {
                      checkBoxCheck(e);
                    }}
                  />

                  <label className="cbx" htmlFor="morning">
                    <span>
                      <svg width="12px" height="10px">
                        <use href="#check-4"></use>
                      </svg>
                    </span>
                    <span>퇴사자 포함</span>
                  </label>
                  <svg className="inline-svg">
                    <symbol id="check-4" viewBox="0 0 12 10">
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </symbol>
                  </svg>
                </div>
              ) : null}

              <SearchInput
                placeholderText={"아이디 입력"}
                setSearchKeyword={setSearchKeyword}
                setClickSearchBtn={setClickSearchBtn}
              />
              <div
                className="refresh-icon"
                onClick={() => {
                  setSearchKeyword("");
                  listCall();
                }}
              >
                <HiRefresh />
              </div>
            </div>
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
              {acceptUserList.length === 0 ? (
                <NoResults>검색결과가 없습니다.</NoResults>
              ) : (
                acceptUserList.map((item, index) => {
                  return (
                    <div className="item" key={index}>
                      <div className="grid-inner">
                        <div className="grid-inner-item">
                          <div className="grid-inner-item-text">
                            {index + 1}
                          </div>
                        </div>
                        <div className="grid-inner-item">
                          <div className="grid-inner-item-text">{item.id}</div>
                        </div>
                        <div className="grid-inner-item">
                          <div className="grid-inner-item-text">
                            {item.name}
                          </div>
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
                            {moment(item.createdAt).format(
                              "YYYY-MM-DD hh:mm:ss",
                            )}
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
                })
              )}

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
