import React from "react";

export const TestPreviewImage = ({ imgUrl, imgPk }) => {
  console.log(
    `http://112.222.157.156:5113/pic/pic/onlineKorMat/${imgPk}/${imgUrl}`,
  );
  return (
    <img
      src={`http://112.222.157.156:5121/pic/onlineKorMat/${imgPk}/${imgUrl}`}
      // alt={`preview-${index}`}
    />
  );
};
