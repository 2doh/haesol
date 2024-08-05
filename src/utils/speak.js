export const speak = tempObj => {
  if ("speechSynthesis" in window) {
    const speech = new SpeechSynthesisUtterance(tempObj.speechword);
    // const speechkr = new SpeechSynthesisUtterance(voca.krword);
    console.log(speech);
    speech.lang = tempObj.speechlang;
    speech.rate = 0.7;
    // speech.lang = "kr";
    // speech.pitch = 1;
    // speechkr.lang = "kr";
    // speechkr.rate = 3;
    window.speechSynthesis.speak(speech);
  } else {
    alert("해당 브라우저는 음성이 지원되지 않습니다");
  }
};
