import styled from "@emotion/styled";
import { postSign } from "api/student/studentapi";
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

const Signature = ({ studentPk, latestSemester, latestYear }) => {
  const [showSignature, setShowSignature] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const canvasRef = useRef(null);

  const handleSignSave = () => {
    const image = canvasRef.current.getTrimmedCanvas().toDataURL("image/png");
    const currentDate = new Date();
    const fileName = `sign_image_${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}_${currentDate.getHours().toString().padStart(2, "0")}${currentDate.getMinutes().toString().padStart(2, "0")}${currentDate.getSeconds().toString().padStart(2, "0")}.png`;

    // 데이터 URL을 Blob으로 변환
    const dataURLToBlob = dataURL => {
      const byteString = atob(dataURL.split(",")[1]);
      const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    };

    const imageBlob = dataURLToBlob(image);

    // FormData에 추가
    const formData = new FormData();
    formData.append("pic", imageBlob, fileName);

    const reqData = JSON.stringify({
      studentPk: studentPk,
      year: latestYear,
      semester: latestSemester,
      examSign: "1",
    });

    const reqBlob = new Blob([reqData], { type: "application/json" });

    formData.append("req", reqBlob);

    // Axios로 서버에 전송
    postSign(formData);
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
            <button disabled={!isSigned} onClick={() => handleSignSave()}>
              확인
            </button>
          </ButtonWrapStyle>
        </CanvasInnerStyle>
      )}
    </ParentCheckStyle>
  );
};

export default Signature;
