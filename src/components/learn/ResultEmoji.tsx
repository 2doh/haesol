import React from "react";

// resultState의 가능한 값을 정의하는 타입
type ResultState = "bad" | "good" | "great" | "perfect";

// Props 타입 정의
interface ResultEmojiProps {
  resultState: ResultState;
}

const ResultEmoji: React.FC<ResultEmojiProps> = ({ resultState }) => {
  return (
    <>
      {resultState === "bad" && (
        <img
          className="mt-10"
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png"
          alt="Crying Face"
          width="100"
          height="100"
        />
      )}
      {resultState === "good" && (
        <img
          className="mt-10"
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Slightly%20Smiling%20Face.png"
          alt="Slightly Smiling Face"
          width="100"
          height="100"
        />
      )}
      {resultState === "great" && (
        <img
          className="mt-10"
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png"
          alt="Beaming Face with Smiling Eyes"
          width="100"
          height="100"
        />
      )}
      {resultState === "perfect" && (
        <img
          className="mt-10"
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Hundred%20Points.png"
          alt="Hundred Points"
          width="100"
          height="100"
        />
      )}
    </>
  );
};

export default ResultEmoji;
