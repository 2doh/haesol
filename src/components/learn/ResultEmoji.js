import React from "react";

const ResultEmoji = ({ resultState }) => {
  return (
    <>
      {resultState === "bad" && (
        <img
          className=" mt-10"
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png"
          alt="Crying Face"
          width="100"
          height="100"
        />
      )}
      {resultState === "good" && (
        <img
          className=" mt-10"
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Slightly%20Smiling%20Face.png"
          alt="Slightly Smiling Face"
          width="100"
          height="100"
        />
      )}
      {resultState === "great" && (
        <img
          className=" mt-10"
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png"
          alt="Beaming Face with Smiling Eyes"
          width="100"
          height="100"
        />
      )}
      {resultState === "perfect" && (
        <img
          className=" mt-10"
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
