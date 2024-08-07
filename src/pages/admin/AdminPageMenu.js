import styled from "@emotion/styled";
import React, { useRef, useState } from "react";

const AdminPageMenuStyle = styled.div`
  .mini-menu-tap {
    display: flex;
    flex-direction: row;

    & > div {
      cursor: pointer;
      width: 160px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;

      & > div {
        font-size: 16px;
      }
    }
  }

  /* menuType = "bottom-type-menu" */
  .bottom-type-menu {
    & > div {
      border: solid 1px #b3b3b3;
      border-radius: 0px 0px 10px 10px;
      background-color: #ffffff;
      border-top: none;
    }
    & > div:not(:first-of-type) {
      border-left: 1px;
    }

    /* 선택 된 메뉴 */
    .select-menu {
      box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.34) inset,
        0 2px 0 -1px rgba(0, 0, 0, 0.13),
        0 3px 0 -1px rgba(0, 0, 0, 0.08),
        0 3px 13px -1px rgba(0, 0, 0, 0.21);
    }

    /* 선택 안 된 메뉴 */
    .outer-menu {
      background-color: #e4e4e4;

      & > div {
        color: #8f8f8f;
      }
    }
  }

  /* menuType = "top-type-menu" */
  .top-type-menu {
    & > div {
      border: solid 2px #886348;
      border-radius: 10px 10px 0px 0px;
      background-color: #e7d9d9;
      border-bottom: none;
    }
    & > div:not(:first-of-type) {
      margin-left: -2px;
    }

    /* 선택 된 메뉴 */
    .select-menu {
    }

    /* 선택 안 된 메뉴 */
    .outer-menu {
      background-color: #fbfaf9;

      & > div {
        color: #8f8f8f;
      }
    }
  }

  .info-button {
    display: flex;
    gap: 15px;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 25px;
      background: #e7d9d9;
      border-radius: 5px;
      // border: solid 2px #886348;
    }
  }
`;

export const AdminPageMenu = ({
  menuLabelList,
  menuType,
  setNowSelectMemu,
}) => {
  // 현재 선택된 메뉴
  const [selectMenu, setSelectMenu] = useState(0);

  /** 메뉴 변경 */
  const changeAccerptMenu = menuNum => {
    setSelectMenu(menuNum);
    setNowSelectMemu(menuNum);
  };

  return (
    <AdminPageMenuStyle>
      <div className={`${menuType} mini-menu-tap`}>
        {menuLabelList.map((item, index) => {
          return (
            <div
              key={index}
              className={selectMenu === index ? `select-menu` : `outer-menu`}
              onClick={() => {
                changeAccerptMenu(index);
              }}
            >
              <div className="menu-label">{menuLabelList[index]}</div>
            </div>
          );
        })}
      </div>
    </AdminPageMenuStyle>
  );
};
