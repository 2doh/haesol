import styled from "@emotion/styled";
import { getAwaitAcceptList } from "api/admin/adminapi";
import { useEffect, useRef, useState } from "react";
import "../../scss/admin/adminhomestyle.css";
import { useDispatch, useSelector } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";

const AdminHomeStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

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
`;

const AdminHome = () => {
  const [selectUserId, setSelectUserId] = useState(1);
  // const [modalNum, setModalNum] = useState(null);
  const [isSignupAcceptModal, setIsSignupAcceptModal] = useState(false);

  const [acceptUserList, setAcceptUserList] = useState([]);
  const [userListType, setUserListType] = useState(1);

  const parentsRef = useRef();
  const teacherRef = useRef();

  const showSignupAcceptModal = ({ selectUserId }, btNum) => {
    // console.log("선택한 유저Id : ", { selectUserId });
    // console.log("버튼 번호 : ", { btNum });
    setSelectUserId({ selectUserId });
    // setModalNum({ btNum });
    setIsSignupAcceptModal(true);
  };

  const signupAcceptModalCancel = e => {
    setIsSignupAcceptModal(false);
  };

  const getAwaitList = async ({ userListType }) => {
    const res = await getAwaitAcceptList(userListType);
    // console.log("axios 결과값 : ", res);
    setAcceptUserList(res);
  };

  /** 최초 랜더링 시 */
  useEffect(() => {
    getAwaitList({ userListType });
  }, []);

  useEffect(() => {
    // console.log("acceptUserList : ", acceptUserList);
  }, [acceptUserList]);

  useEffect(() => {
    getAwaitList({ userListType });
  }, [userListType]);

  /** 메뉴 변경 */
  const changeAccerptMenu = menuNum => {
    if (menuNum === 1) {
      parentsRef.current.className = "frame";
      teacherRef.current.className = "div-wrapper";
      console.log("학부모입니다 : ", menuNum);
    }
    if (menuNum === 2) {
      parentsRef.current.className = "div-wrapper";
      teacherRef.current.className = "frame";
      console.log("교직원입니다 : ", menuNum);
    }
    setUserListType(menuNum);
  };

  const modalState = useSelector(state => state.modalSlice);
  const dispatch = useDispatch();

  /** 모달 호출 */
  const showModal = (selectBtn, selectUserId, selectUserName, selectUserPk) => {
    /** (선택) 들어갈 내용 수정 */
    const data = {
      headerText: [selectBtn],
      bodyTextLabel: ["ID", "이름"],
      bodyText: [selectUserId, selectUserName, selectUserPk, userListType],
      buttonText: [selectBtn, "취소"],
    };
    /** (선택) 위와 아래는 세트 */
    dispatch(updateModalDate(data));

    /**(고정) 모달 활성화 */
    const modalRes = dispatch(openModal("ArrValueModal"));
    // console.log("모달 결과 출력 내용 확인 : ", modalRes);
  };

  // useEffect(() => {
  //   first;

  //   return () => {
  //     second;
  //   };
  // }, [third]);

  return (
    <>
      {/* <NotBgClickModal /> */}
      <AdminHomeStyle>
        <div className="main-core admin-home-core">
          <div className="user-info-wrap">
            <div className="user-info-tap">
              <div className="property">
                <div
                  ref={parentsRef}
                  className="frame"
                  onClick={() => {
                    changeAccerptMenu(1);
                  }}
                >
                  <div className="text-wrapper">학부모</div>
                </div>
                <div
                  ref={teacherRef}
                  className="div-wrapper"
                  onClick={() => {
                    changeAccerptMenu(2);
                  }}
                >
                  <div className="info-subtitle">교직원</div>
                </div>
              </div>
            </div>
          </div>
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

            {acceptUserList.map((item, index) => {
              // console.log(item);
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
                      <div className="grid-inner-item-text">{item.grade}</div>
                    </div>
                    <div className="grid-inner-item">
                      <div className="grid-inner-item-text">{item.class}</div>
                    </div>
                    <div className="grid-inner-item">
                      <div className="grid-inner-item-text">
                        {item.createdAt}
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
      </AdminHomeStyle>
    </>
  );
};

export default AdminHome;
