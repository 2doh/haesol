import styled from "@emotion/styled";
import React from "react";

type Props = {
  viewContent?: string | React.ReactNode;
  contents?: string | React.ReactNode;
  topBackgroundColor?: string;
  backgroundColor?: string;
  isOpen?: boolean;
  onClick?: () => void;
};

const Accordion = (props: Props) => {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (props.isOpen && childRef.current && parentRef.current) {
      parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      headerRef.current!.style.background = props.topBackgroundColor || "unset";
      parentRef.current.style.background = props.backgroundColor || "unset";
    } else {
      parentRef.current!.style.height = "0";
      headerRef.current!.style.background = "unset";
      parentRef.current!.style.background = "unset";
    }
  }, [props.isOpen, props.topBackgroundColor, props.backgroundColor]);

  return (
    <Container>
      <Header onClick={props.onClick} ref={headerRef}>
        {props.viewContent}
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

const ContentsWrapper = styled.div`
  height: 0;
  width: inherit;
  overflow: hidden;
  transition:
    height 0.35s ease,
    background 0.35s ease;
`;

const Contents = styled.div``;

export default React.memo(Accordion);
