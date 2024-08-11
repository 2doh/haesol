import styled from "@emotion/styled";
import React from "react";

type Props = {
  viewContent?: string | React.ReactNode;
  contents?: string | React.ReactNode;
  topBackgroundColor?: string;
  backgroundColor?: string;
  setIsListOpen?: (isOpen: boolean) => void;
};

const Accordion = (props: Props) => {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);
  const [isCollapse, setIsCollapse] = React.useState(false);

  const handleButtonClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (
        parentRef.current === null ||
        childRef.current === null ||
        headerRef.current === null
      ) {
        return;
      }

      const topBackgroundColor = props.topBackgroundColor || "unset"; // 기본값 설정
      const backgroundColor = props.backgroundColor || "unset"; // 기본값 설정

      if (parentRef.current.clientHeight > 0) {
        // 닫힘
        parentRef.current.style.height = "0";
        // parentRef.current.style.background = "white";
        headerRef.current.style.background = "unset";
        parentRef.current.style.background = "unset";
        if (props.setIsListOpen) {
          props.setIsListOpen(false);
        }
      } else {
        // 열림
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
        // parentRef.current.style.background = "lightgray";
        // parentRef.current.style.background = "red";
        headerRef.current.style.background = topBackgroundColor;
        parentRef.current.style.background = backgroundColor;
        if (props.setIsListOpen) {
          props.setIsListOpen(true);
        }
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse],
  );

  //   const parentRefHeight = parentRef.current?.style.height ?? "0px";
  //   const buttonText = parentRefHeight === "0px" ? "열기" : "닫기";

  return (
    <Container>
      <Header onClick={handleButtonClick} ref={headerRef}>
        {props.viewContent}
        {/* <Button>{buttonText}</Button> */}
      </Header>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>{props.contents}</Contents>
      </ContentsWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  cursor: pointer;
`;

// const Button = styled.div`
//   top: 8px;
//   right: 8px;
//   font-size: 14px;
//   position: absolute;
// `;

const ContentsWrapper = styled.div`
  height: 0;
  width: inherit;
  overflow: hidden;
  transition:
    height 0.35s ease,
    background 0.35s ease;
`;

const Contents = styled.div`
  /* padding: 0.1px; */
`;

export default React.memo(Accordion);
