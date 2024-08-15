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

  // 열려있는 아코디언의 인덱스
  const [openAccordionId, setOpenAccordionId] = useState(null);

  // 열려있는 아코디언의 인덱스를 저장
  const handleAccordionClick = id => {
    setOpenAccordionId(prevId => (prevId === id ? null : id));
  };

  /** 신청 리스트 출력 함수 */
  const getAwaitList = async nowSelectMemu => {
    const res = await getAwaitAcceptList(nowSelectMemu, searchKeyword);
    // console.log("결과 : ", res);
    if (res) setAcceptUserList(res);
  };

  /** 가입한 유저 리스트 출력 함수 */
  const getUserList = async useNum => {
    const res = await getAwaitUserList(useNum, isCheck, searchKeyword);
    // console.log("결과 : ", res);
    if (res) setAcceptUserList(res);
  };

  /** 메뉴 선택시, 모달 종료시 리스트, 체크박스 클릭시 리스트 재출력 */
  const listCall = () => {
    setClickSearchBtn(false);

    // 학부모 : 열려 있는 아코디언 닫기
    setOpenAccordionId(null);

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

  /** 회원가입 신청 모달 호출 */
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

  /** 아코디언 메뉴 : 학부모 1명 정보 */
  const accordionList = item => {
    // console.log("item : ", item);
    // console.log("nowSelectMemu : ", nowSelectMemu);
    const title = (
      <div className="item admin-user-list sing-user-list">
        <div className="grid-inner">
          <div className="grid-inner-item">
            <div className="grid-inner-item-text">{item.state}</div>
          </div>
          <div className="grid-inner-item">
            <div className="grid-inner-item-text">{item.id}</div>
          </div>
          <div className="grid-inner-item">
            <div className="grid-inner-item-text">{item.name}</div>
          </div>
          <div className="grid-inner-item">
            <div className="grid-inner-item-text">
              {moment(item.createdAt).format("YYYY-MM-DD hh:mm:ss")}
            </div>
          </div>
          <div className="grid-inner-item">
            <div className="grid-inner-item-text sign-off-on-buttons">
              {item.state === "활성화" ? (
                <button
                  className="accept-button"
                  onClick={() => {
                    deactivateModal(1, 2, item.pk);
                  }}
                >
                  휴먼 전환
                </button>
              ) : (
                <button
                  className="accept-button"
                  onClick={() => {
                    deactivateModal(1, 1, item.pk);
                  }}
                >
                  활성화
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    /** 아코디언 메뉴 : 학부모 1명의 자녀 리스트 */
    const contents = (
      <div>
        {item.studentList && item.studentList.length > 0 ? (
          item.studentList.map((cItem, cIndex) => (
            <div key={cIndex} className="item admin-user-list sing-user-list">
              <div className="grid-inner">
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">
                    {cItem.studentState}
                  </div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">{cItem.studentId}</div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">
                    {cItem.studentName}
                  </div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text">
                    학생 코드 : {cItem.studentCode}
                  </div>
                </div>
                <div className="grid-inner-item">
                  <div className="grid-inner-item-text sign-off-on-buttons">
                    <button
                      className="rejected-button"
                      onClick={() => {
                        userUpdate(3, cItem);
                      }}
                    >
                      학적 변동
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="item admin-user-list sing-user-list">
            <div className="grid-inner">
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">자녀 없음</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
    return { title, contents };
  };

  // (학생/교직원) 정보 수정 모달 호출
  const userUpdate = (userType, item) => {
    console.log("userType : ", userType);
    console.log("item : ", item);
    let previousData = "";
    let data = "";
    let stnStage = "";

    // 교직원의 경우
    if (userType === 2) {
      // 교직원 활성화 상태에서만 수정가능
      // 1 = "활성화"

      previousData = {
        p: 2,
        pk: item.pk,
        state: 1,
        userName: item.name,
        userGrade: item.grade,
        userClass: item.class,
      };

      data = {
        headerText: "정보 수정",
        buttonText: ["수정", "취소"],
        modalRes: [userType, item, previousData, item.id],
      };
    }

    // 학생의 경우
    if (userType === 3) {
      switch (item.studentState) {
        case "재학중":
          stnStage = 1;
          break;
        case "전학":
          stnStage = 2;
          break;
        case "졸업":
          stnStage = 3;
          break;
        case "퇴학":
          stnStage = 4;
          break;
        default:
          break;
      }

      previousData = {
        p: 3,
        pk: item.studentPK,
        state: stnStage,
        userName: item.studentName,
        userGrade: item.studentGrade,
        userClass: item.studentClass,
      };

      data = {
        headerText: "학적 변동",
        buttonText: ["수정", "취소"],
        modalRes: [userType, item, previousData, item.studentId],
      };
    }

    console.log("data : ", previousData);
    dispatch(updateModalDate(data));
    dispatch(openModal("UserUpdateModal"));
  };

  /** (교직원/학부모) 퇴사/비활성화 복구/활성화 모달 호출 */
  const deactivateModal = (userType, userState, userPk) => {
    let data = "";
    let userDate = {
      p: userType,
      pk: userPk,
      state: userState,
    };

    if (userType === 1 && userState === 1) {
      data = {
        headerText: "계정 상태 변경",
        bodyText: ["계정을 활성화 합니다."],
        buttonText: ["확인", "취소"],
        modalRes: [911, userDate],
      };
    }

    if (userType === 1 && userState === 2) {
      data = {
        headerText: "계정 상태 변경",
        bodyText: ["휴면 계정으로 전환합니다."],
        buttonText: ["확인", "취소"],
        modalRes: [911, userDate],
      };
    }

    if (userType === 2 && userState === 1) {
      data = {
        headerText: "복구 처리",
        bodyText: ["계정을 복구하겠습니까?"],
        buttonText: ["확인", "취소"],
        modalRes: [911, userDate],
      };
    }

    if (userType === 2 && userState === 2) {
      data = {
        headerText: "퇴사 처리",
        bodyText: ["퇴사 처리하겠습니까?\n\n처리 후 계정이 비활성화 됩니다."],
        buttonText: ["확인", "취소"],
        modalRes: [911, userDate],
      };
    }

    dispatch(updateModalDate(data));
    dispatch(openModal("BasicModal"));
  };

  const renderUserList = () => {
    switch (nowSelectMemu) {
      case 0:
      case 1:
        return acceptUserList.map((item, index) => (
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
                  {moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
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
        ));
      case 2:
        return acceptUserList.map((item, index) => {
          return (
            <Accordion
              key={index}
              viewContent={accordionList(item).title}
              contents={accordionList(item).contents}
              isOpen={openAccordionId === index}
              topBackgroundColor={"rgba(222,232,233,0.7)"}
              backgroundColor={"#dee8e9"}
              onClick={() => handleAccordionClick(index)}
            />
          );
        });
      case 3:
        return acceptUserList.map((item, index) => (
          <div className="item" key={index}>
            <div className="grid-inner">
              <div className="grid-inner-item">
                <div className="grid-inner-item-text">{item.state}</div>
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
                  {moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </div>
              </div>
              <div className="grid-inner-item">
                <div className="grid-inner-item-text sign-off-on-buttons">
                  {item.state === "활성화" ? (
                    <>
                      <button
                        className="rejected-button"
                        onClick={() => {
                          userUpdate(2, item);
                        }}
                      >
                        수정
                      </button>
                      <button
                        className="accept-button"
                        onClick={() => {
                          deactivateModal(2, 2, item.pk);
                        }}
                      >
                        퇴사
                      </button>
                    </>
                  ) : (
                    <button
                      className="accept-button"
                      onClick={() => {
                        deactivateModal(2, 1, item.pk);
                      }}
                    >
                      복구
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <UserListStyle>
      <div className="main-core admin-home-core">
        <div className="grid-frame">
          <UserListTop nowSelectMemu={nowSelectMemu} />
          {acceptUserList.length === 0 ? (
            <NoResults>검색결과가 없습니다.</NoResults>
          ) : (
            renderUserList()
          )}
        </div>
      </div>
    </UserListStyle>
  );
};

export default UserList;
