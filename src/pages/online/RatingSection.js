import React, { useState } from "react";
import styled from "@emotion/styled";
import { AiFillStar } from "react-icons/ai";

const RatingContainer = styled.div`
  display: flex;
  text-align: center;
  margin: 13px 0px;
  .rating-star.inactive {
    color: gray;
  }
  .rating-star.active {
    color: coral;
  }
`;

const RatingStar = styled(AiFillStar)`
  cursor: pointer;
`;

const PIndex = styled.p`
  margin: 0 5px;
`;

const RatingSection = () => {
  const [ratingIndex, setRatingIndex] = useState(0);
  const ArrayIndexes = [1, 2, 3, 4, 5];

  return (
    <RatingContainer>
      {ArrayIndexes.map((arrayindex, index) => (
        <RatingStar
          size={35}
          key={`rating_${index}`}
          className={`rating-star ${arrayindex <= ratingIndex ? "active" : "inactive"}`}
          onClick={() => setRatingIndex(arrayindex)}
        />
      ))}
      <PIndex>
        {ratingIndex === 5
          ? "최상"
          : ratingIndex === 4
            ? "상"
            : ratingIndex === 3
              ? "중상"
              : ratingIndex === 2
                ? "중"
                : "하"}
      </PIndex>
    </RatingContainer>
  );
};

export default RatingSection;
