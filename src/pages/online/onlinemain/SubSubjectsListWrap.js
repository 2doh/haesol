import styled from "@emotion/styled";

const SubSubjectsListWrapStyle = styled.div`
  min-height: 150px;
  padding: 0 100px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  gap: 80px;

  & button {
    width: 100%;
    height: 130px;
  }
`;

const SubSubjectsListWrap = () => {
  return (
    <SubSubjectsListWrapStyle>
      <button className="button-36" role="button">
        <span className="text">Button 36</span>
      </button>
      <button className="button-36" role="button">
        <span className="text">Button 36</span>
      </button>
      <button className="button-36" role="button">
        <span className="text">Button 36</span>
      </button>

      {/* <div className="sub-subjects">SubSubjectsListWrap</div>
      <div className="sub-subjects">SubSubjectsListWrap</div> */}
    </SubSubjectsListWrapStyle>
  );
};

export default SubSubjectsListWrap;
