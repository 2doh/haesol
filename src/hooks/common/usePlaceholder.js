import React, { useState } from "react";

const usePlaceholder = initPlaceholder => {
  const [placeholder, setPlaceholder] = useState(initPlaceholder);

  const handleFocus = () => setPlaceholder("");
  const handleBlur = () => setPlaceholder(initPlaceholder);

  return { handleFocus, handleBlur, placeholder };
};

export default usePlaceholder;
