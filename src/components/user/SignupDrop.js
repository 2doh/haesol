import styled from "@emotion/styled";

const SignupDrop = ({ setUserConnet, children, register }) => {
  return (
    <WrapStyle>
      <TitleWrap>
        <TitleStyle>{children}</TitleStyle>
      </TitleWrap>
      <SelectStyle
        className="fields-section-drop"
        onChange={e => {
          setUserConnet(e.target.value);
          register("connet").onChange(e);
        }}
        {...register("connet")}
      >
        <option value="none" hidden>
          가족관계
        </option>
        <option value="부">부</option>
        <option value="모">모</option>
        <option value="조부">조부</option>
        <option value="조모">조모</option>
        <option value="기타">기타</option>
      </SelectStyle>
    </WrapStyle>
  );
};

const WrapStyle = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  width: 100%;
`;

const TitleStyle = styled.div`
  display: flex;
  font-size: 20px;
  white-space: nowrap;
`;

const SelectStyle = styled.select`
  border-radius: 5px;
  border: 1px solid #886348;
  width: 100%;
  height: 40px;
  padding-left: 5px;
  color: #2a1b07;
  width: 100%;
`;

export default SignupDrop;
