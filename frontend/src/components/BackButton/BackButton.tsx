import React from "react";
import { useNavigate } from "react-router-dom";

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <React.Fragment>
      <p
        onClick={handleClick}
        style={{
          paddingLeft: "20px",
          alignSelf: "baseline",
          color: "blue",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        ← back
      </p>
    </React.Fragment>
  );
};
