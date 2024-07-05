import React, { useState } from "react";
import "../../scss/admin/adminhomestyle.css";
import styled from "@emotion/styled";
import NotBgClickModal from "components/modal/NotBgClickModal";

const AdminHomeStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const AdminHome = () => {
  const [selectUserId, setSelectUserId] = useState(1);
  const [modalNum, setModalNum] = useState(null);
  const [isSignupAcceptModal, setIsSignupAcceptModal] = useState(false);
  const showSignupAcceptModal = ({ selectUserId }, btNum) => {
    // console.log("선택한 유저Id : ", { selectUserId });
    // console.log("버튼 번호 : ", { btNum });
    setSelectUserId({ selectUserId });
    setModalNum({ btNum });
    setIsSignupAcceptModal(true);
  };
  const signupAcceptModalCancel = e => {
    setIsSignupAcceptModal(false);
  };

  return (
    <>
      {/* <NotBgClickModal /> */}
      <AdminHomeStyle>
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
          <div className="item">
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
          </div>
          <div className="item">
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
                  <button
                    className="accept-button"
                    onClick={() => {
                      showSignupAcceptModal({ selectUserId }, 1);
                    }}
                  >
                    승인
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
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
                  <button className="rejected-button btn-two rounded">
                    반려
                  </button>
                  <button className="accept-button">승인</button>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="item">
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
                  <button className="rejected-button btn-two rounded">
                    반려
                  </button>
                  <button className="accept-button">승인</button>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="item">
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
                  <button className="rejected-button btn-two rounded">
                    반려
                  </button>
                  <button className="accept-button">승인</button>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="item">
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
                  <button className="rejected-button btn-two rounded">
                    반려
                  </button>
                  <button className="accept-button">승인</button>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="item">
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
                  <button className="rejected-button btn-two rounded">
                    반려
                  </button>
                  <button className="accept-button">승인</button>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="item">
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
                  <button className="rejected-button btn-two rounded">
                    반려
                  </button>
                  <button className="accept-button">승인</button>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="item">
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
                  <button className="rejected-button btn-two rounded">
                    반려
                  </button>
                  <button className="accept-button">승인</button>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="item">
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
                  <button className="rejected-button btn-two rounded">
                    반려
                  </button>
                  <button className="accept-button">승인</button>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="item">
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
                  <button className="rejected-button btn-two rounded">
                    반려
                  </button>
                  <button className="accept-button">승인</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminHomeStyle>
    </>
  );
};

export default AdminHome;
