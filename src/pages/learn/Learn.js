import React from "react";
import Vocabulary from "./Vocabulary";
import VocaLearn from "./VocaLearn";
import styled from "@emotion/styled";
import Footer from "components/layout/Footer";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import { RiSpeakFill } from "react-icons/ri";
import { TbWriting } from "react-icons/tb";
import { MdHearing } from "react-icons/md";
import "../../scss/learn/learn.scss";
import { useNavigate } from "react-router";

const Learn = () => {
  const initItem = [
    { title: "말하기", pic: RiSpeakFill, id: 1 },
    { title: "듣기", pic: MdHearing, id: 2 },
    { title: "쓰기", pic: TbWriting, id: 3 },
  ];
  const navi = useNavigate();

  const onNavi = data => {
    navi("/learn/voca", { state: { type: data } });
  };

  return (
    <>
      <GreenHeaderNoOption />
      <WrapStyle>
        <SelectWrapStyle>
          {initItem.map(item => (
            <div className="learn-nav-box" key={item.id}>
              <div
                className="learn-nav-box-navi"
                onClick={() => {
                  onNavi(item.title);
                }}
              >
                <item.pic size={100} />
              </div>
              <span className="learn-nav-box-title">{item.title}</span>
            </div>
          ))}
        </SelectWrapStyle>
      </WrapStyle>
      <Footer />
      {/* <VocaLearn></VocaLearn> */}
    </>
  );
};

export default Learn;

const WrapStyle = styled.div`
  width: 100%;
  max-width: 1180px;
  height: 100vh;
  margin: 0 auto;
  background-color: #f3f9fa;
  display: flex;
  align-items: center;
`;

const SelectWrapStyle = styled.div`
  width: 100%;
  height: 350px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;
