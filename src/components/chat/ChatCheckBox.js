import styled from "@emotion/styled";

const CheckboxWrapper = styled.div`
  position: relative;
  display: block;
  overflow: hidden;

  input[type="checkbox"] {
    visibility: hidden;
    display: none;
  }

  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  .check {
    width: 50px;
    height: 50px;
    position: absolute;
    opacity: 0;
  }

  .label svg {
    vertical-align: middle;
  }

  .path1 {
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
    transition: 0.5s all;
  }

  input[type="checkbox"]:checked + .label svg g path {
    stroke-dashoffset: 0;
  }
`;

const ChatCheckBox = ({ checked, onChange, id }) => {
  return (
    <CheckboxWrapper>
      <input
        type="checkbox"
        className="check"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="label">
        <svg viewBox="0 0 65 65" height="30" width="30">
          <rect x="7" y="7" width="50" height="50" stroke="black" fill="none" />
          <g transform="translate(-23,-967.36216)" id="layer1-60">
            <path
              id="path4146"
              d="m 55,978 c -73,19 46,71 15,2 C 60,959 13,966 30,1007 c 12,30 61,13 46,-23"
              fill="none"
              stroke="black"
              strokeWidth="3"
              className="path1"
            />
          </g>
        </svg>
      </label>
    </CheckboxWrapper>
  );
};

export default ChatCheckBox;
