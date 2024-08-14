import styled from "@emotion/styled";
import "../../scss/admin/adminhomestyle.css";
import "react-loading-skeleton/dist/skeleton.css";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import { useEffect, useState } from "react";
import { AdminPageMenu } from "./AdminPageMenu";
import { SearchInput } from "components/common/style/SearchInput";
import { HiRefresh } from "react-icons/hi";
import UserList from "./UserList";

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
  }

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

const AdminHome = () => {
  // 선택된 메뉴 (0, 1, 2, 3....)
  const [nowSelectMemu, setNowSelectMemu] = useState(0);

  // 검색 키워드
  const [searchKeyword, setSearchKeyword] = useState("");
  const [clickSearchBtn, setClickSearchBtn] = useState(false);

  // 퇴사자 포함 체크박스
  const [isCheck, setIsCheck] = useState(1);

  // 리셋버튼 클릭
  const [resetBtn, setResetBtn] = useState(false);

  /** 메뉴 변경시 퇴사자 포함 체크박스 초기화 */
  useEffect(() => {
    setIsCheck(1);
  }, [nowSelectMemu]);

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
                    <span>
                      {nowSelectMemu === 2 ? "휴면 계정 포함" : "퇴사자 포함"}
                    </span>
                  </label>
                  <svg className="inline-svg">
                    <symbol id="check-4" viewBox="0 0 12 10">
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </symbol>
                  </svg>
                </div>
              ) : null}

              <SearchInput
                placeholderText={"이름 입력"}
                setSearchKeyword={setSearchKeyword}
                setClickSearchBtn={setClickSearchBtn}
              />
              <div
                className="refresh-icon"
                onClick={() => {
                  setSearchKeyword("");
                  setResetBtn(!resetBtn);
                }}
              >
                <HiRefresh />
              </div>
            </div>
          </div>

          <UserList
            searchKeyword={searchKeyword}
            isCheck={isCheck}
            setClickSearchBtn={setClickSearchBtn}
            clickSearchBtn={clickSearchBtn}
            setSearchKeyword={setSearchKeyword}
            nowSelectMemu={nowSelectMemu}
            resetBtn={resetBtn}
          />
        </div>
      </AdminMainStyle>
    </AdminHomeStyle>
  );
};

export default AdminHome;
