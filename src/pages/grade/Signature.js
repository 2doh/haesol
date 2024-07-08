import styled from "@emotion/styled";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const ParentCheckStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-end;
  margin-bottom: 100px;
  button {
    width: 120px;
    height: 30px;
    background: #fbfaf9;
    border: solid 2px #886348;
    font-size: 18px;
    &:hover {
      background: #dd838f;
      border: solid 2px #a8172a;
      color: #efece8;
    }
  }
`;

const CanvasInnerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const CanvasWrapStyle = styled.div`
  width: 400px;
  height: 200px;
  border: solid 2px #886348;
  background: #fbfaf9;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CanvasPlaceholderStyle = styled.div`
  position: absolute;
`;

const ButtonWrapStyle = styled.div`
  display: flex;
  gap: 10px;
`;

const Signature = () => {
  const [showSignature, setShowSignature] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const canvasRef = useRef(null);

  const save = () => {
    const image = canvasRef.current.getTrimmedCanvas().toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    // 기본 저장 이름 변경 필요!!!!!!
    link.download = "sign_image.png";
    link.click();
  };

  return (
    <ParentCheckStyle>
      <button
        onClick={() => {
          setShowSignature(true);
        }}
      >
        학부모 확인
      </button>
      {showSignature && (
        <CanvasInnerStyle>
          <CanvasWrapStyle>
            {!isSigned && (
              <CanvasPlaceholderStyle>
                여기에 서명을 해주세요.
              </CanvasPlaceholderStyle>
            )}
            <SignatureCanvas
              ref={canvasRef}
              onBegin={() => {
                setIsSigned(true);
              }}
              canvasProps={{ className: "signature-canvas" }}
              clearOnResize={false}
            />
          </CanvasWrapStyle>

          <ButtonWrapStyle>
            <button
              onClick={() => {
                canvasRef.current.clear(); // 리셋
                setIsSigned(false);
              }}
            >
              서명 초기화
            </button>
            <button
              disabled={!isSigned} // 버튼 disabled
              onClick={() => save()}
            >
              다운로드
            </button>
          </ButtonWrapStyle>
        </CanvasInnerStyle>
      )}
    </ParentCheckStyle>
  );
};

export default Signature;
