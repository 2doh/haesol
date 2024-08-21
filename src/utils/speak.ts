// tempObj의 타입 정의
interface SpeechOptions {
  speechword: string;
  speechlang: string;
  speechvolume: number;
}

// speak 함수의 타입 정의
export const speak = (
  tempObj: SpeechOptions,
  onEndCallback?: () => void,
  listen?: boolean,
): void => {
  if ("speechSynthesis" in window) {
    // 음성 중단
    if (listen) {
      window.speechSynthesis.cancel();
      return; // 음성을 중단한 후 함수 종료
    }

    // 새 음성을 생성
    const speech = new SpeechSynthesisUtterance(tempObj.speechword);
    speech.lang = tempObj.speechlang;
    speech.rate = 0.7;
    speech.volume = tempObj.speechvolume;

    // 음성 종료 시 호출될 콜백
    speech.onend = () => {
      if (onEndCallback) {
        onEndCallback();
      }
    };

    // 음성 재생
    window.speechSynthesis.speak(speech);
  } else {
    alert("해당 브라우저는 음성을 지원하지 않습니다");
  }
};
