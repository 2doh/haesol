import styled from "@emotion/styled";

const DropDate = ({ children }) => {
  const nowYear = new Date().getFullYear();

  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">{children}(선택)</div>
      </div>
      <DropDateStyle>
        <select className="fields-section-drop">
          <option value="none" hidden>
            년
          </option>
        </select>
        <select className="fields-section-drop">
          <option value="none" hidden>
            월
          </option>
        </select>
        <select className="fields-section-drop">
          <option value="none" hidden>
            일
          </option>
        </select>
      </DropDateStyle>
    </div>
  );
};

export default DropDate;

const DropDateStyle = styled.div`
  display: flex;
  gap: 10px;
`;
