import React from "react";
import "../../scss/common/textinput.scss";

const TextInput = ({ onAnswer, setOnAnswer }) => {
  return (
    <input
      className="textinput-size-s"
      value={onAnswer}
      onChange={e => {
        setOnAnswer(e.target.value);
      }}
    />
  );
};

export default TextInput;
