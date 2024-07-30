import styled from "@emotion/styled";

const ControlButtoStyle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  .btn {
    width: 35px;
    height: 35px;
    background-color: #add2d8;

    border-radius: 10px;
  }
`;

const SlideControlButton = () => {
  return (
    <ControlButtoStyle>
      <div className="btn"></div>
      <div className="btn"></div>
      <div className="btn"></div>
    </ControlButtoStyle>
  );
};

export default SlideControlButton;
