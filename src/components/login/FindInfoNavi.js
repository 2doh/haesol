import React, { useState } from 'react'

const FindInfoNavi = ({naviState,setNaviState,setUserNum,setUserName,tempState}) => {
    const FindInfoStyle = {
        width: "100%",
        borderLeft: "1px solid #886348",
        borderTopLeftRadius: "10px",
        borderRight: "0",
      };
  return (
    <div className="login-wrap-navi br10">
      <div
        className={naviState === "parent" ? "selectednavi" : "unselectednavi"}
        onClick={() => {
          if(tempState===false){
          setNaviState("parent");
          setUserNum("");
          setUserName("");
          }
        }}
      >
        학부모
      </div>
      <div
        className={
          naviState === "teacher" ? "selectednavi" : "unselectednavi"
        }
        onClick={() => {
          if(tempState === false){
          setNaviState("teacher");
          setUserNum("");
          setUserName("");}
        }}
        style={naviState === "teacher" ? FindInfoStyle : null}
      >
        교직원
      </div>
    </div>
  )
}

export default FindInfoNavi