import styled from "@emotion/styled";
import Rating from "@mui/material/Rating";
import { useState } from "react";

const CustomRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ffc107", // 여기에 원하는 색상으로 변경
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47", // 여기에 원하는 색상으로 변경
  },
});

export default function BasicRating() {
  const [value, setValue] = useState("");

  return (
    <CustomRating
      name="size-large"
      // defaultValue={1}
      size="large"
      value={value}
      onChange={(event, newValue) => {
        // setValue(event.target.value);
        setValue(newValue);
      }}
    />
  );
}
