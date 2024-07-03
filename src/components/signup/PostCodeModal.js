import styled from "@emotion/styled";
import DaumPostcode from "react-daum-postcode";

const PostCodeModal = () => {
  return (
    <ModalWrapStyle>
      <PostCodeStyle>
        <DaumPostcode />
      </PostCodeStyle>
    </ModalWrapStyle>
  );
};

export default PostCodeModal;

const ModalWrapStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  background: rgba(0, 0, 0, 0.7);
`;

const PostCodeStyle = styled.div`
  width: 50%;
  height: 50%;
`;
