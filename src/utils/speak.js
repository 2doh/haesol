export const speak = tempObj => {
  if ("speechSynthesis" in window) {
    const speech = new SpeechSynthesisUtterance(tempObj.speechword);
    // const speechkr = new SpeechSynthesisUtterance(voca.krword);
    speech.lang = tempObj.speechlang;
    speech.rate = 0.7;
    // speech.pitch = 1;
    // speechkr.lang = "kr";
    // speechkr.rate = 3;
    const speechWord = window.speechSynthesis.speak(speech);
    // window.speechSynthesis.speak(speechkr);
    console.log(speechWord);
    return speechWord;
  } else {
    alert("Sorry, your browser does not support text to speech!");
  }
};
