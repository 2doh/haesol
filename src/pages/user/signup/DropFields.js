import styled from "@emotion/styled";

const DropFields = ({ children, setUserConnet }) => {
  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">{children}</div>
      </div>
      <OptionStyle>
        <select
          className="fields-section-drop"
          onChange={e => setUserConnet(e.target.value)}
        >
          <option value="none" hidden>
            가족관계
          </option>
          <option value="부">부</option>
          <option value="모">모</option>
          <option value="조부">조부</option>
          <option value="조모">조모</option>
          <option value="기타">기타</option>
        </select>
      </OptionStyle>
    </div>
  );
};

export default DropFields;

const OptionStyle = styled.div`
  width: 50%;
`;
