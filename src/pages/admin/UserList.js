import styled from "@emotion/styled";
import { getAwaitAcceptList, getAwaitUserList } from "api/admin/adminapi";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";
import UserListTop from "./UserListTop";
import moment from "moment";
import Accordion from "components/common/accordion/Accordion";

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  font-size: 30px;
  color: gray;
`;

const UserListStyle = styled.div`
  .admin-user-list {
    background-color: unset !important;
    border: 0px !important;

    & :hover {
      background-color: #dee8e9;
    }
  }
`;

const UserList = ({
  searchKeyword,
  isCheck,
  setClickSearchBtn,
  clickSearchBtn,
  setSearchKeyword,
  nowSelectMemu,
  resetBtn,
}) => {
  const modalState = useSelector(state => state.modalSlice);
  const dispatch = useDispatch();

  // 출력되는 리스트 저장
  const [acceptUserList, setAcceptUserList] = useState([]);

  /** 신청 리스트 출력 함수 */
  const getAwaitList = async nowSelectMemu => {
    console.log("네?");
    const res = await getAwaitAcceptList(nowSelectMemu, searchKeyword);
    console.log("결과 : ", res);
    if (res) setAcceptUserList(res);
  };

  /** 가입한 유저 리스트 출력 함수 */
  const getUserList = async useNum => {
    const res = await getAwaitUserList(useNum, isCheck, searchKeyword);
    if (res) setAcceptUserList(res);
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
        break;
      default:
        break;
    }
  };

  /** 최초 랜더링 시, 리스트 재출력 */
  useEffect(() => {
    listCall(nowSelectMemu);
  }, [nowSelectMemu, modalState.modalRes, clickSearchBtn, isCheck, resetBtn]);

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

  // 리스트

  const contents = (
    <div className="item admin-user-list sing-user-list">
      <div className="grid-inner">
        <div className="grid-inner-item">
          <div className="grid-inner-item-text">재학중</div>
        </div>
        <div className="grid-inner-item">
          <div className="grid-inner-item-text">acahe1d3123</div>
        </div>
        <div className="grid-inner-item">
          <div className="grid-inner-item-text">길만기</div>
        </div>
        <div className="grid-inner-item">
          <div className="grid-inner-item-text">학생 코드 : 000000000</div>
        </div>
        <div className="grid-inner-item">
          <div className="grid-inner-item-text sign-off-on-buttons">
            <button className="rejected-button">신청</button>
            <button className="accept-button">학적 변동</button>
          </div>
        </div>
      </div>
    </div>
  );

  const title = (
    <div className="item admin-user-list sing-user-list">
      <div className="grid-inner">
        <div className="grid-inner-item">
          <div className="grid-inner-item-text">활성화</div>
        </div>
        <div className="grid-inner-item">
          <div className="grid-inner-item-text">acahe1d3</div>
        </div>
        <div className="grid-inner-item">
          <div className="grid-inner-item-text">길형태</div>
        </div>
        <div className="grid-inner-item">
          <div className="grid-inner-item-text">2024.06.28</div>
        </div>
        <div className="grid-inner-item">
          <div className="grid-inner-item-text sign-off-on-buttons">
            <button className="accept-button">휴먼 전환</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <UserListStyle>
      <div className="main-core admin-home-core">
        <div className="grid-frame">
          <UserListTop nowSelectMemu={nowSelectMemu} />

          <Accordion
            viewContent={title}
            contents={contents}
            topBackgroundColor={"rgba(222,232,233,0.7)"}
            backgroundColor={"#dee8e9"}
          />

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
    </UserListStyle>
  );
};

export default UserList;
