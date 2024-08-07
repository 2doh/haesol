import styled from "@emotion/styled";

const AnswerStyled = styled.input`
  width: 50%;
  height: 50px;
  text-align: center;
`;
const TestInputAnswer = ({ placeholder, setWord }) => {
  const wordChange = e => {
    // console.log("입력 내용 : ", e.target.value);
    setWord(e.target.value);
  };

  return (
    <AnswerStyled
      type="text"
      placeholder={placeholder}
      onChange={e => {
        wordChange(e);
      }}
    ></AnswerStyled>
  );
};

export default TestInputAnswer;
