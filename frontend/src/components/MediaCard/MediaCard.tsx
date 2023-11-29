import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import defaultImage from "../../images/defaultImage.jpg";
import Button from "@mui/material/Button";
import { MealMenu } from "../Menu/MealMenu";
import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";

interface MediaProps {
  imagePath: string | null;
  imageTitle: string;
  actionLabel?: string;
  clickEvent: Function;
  deleteClickEvent?: Function;
}

function truncateString(str: string) {
  return str.length > 30 ? str.slice(0, 29) + "..." : str;
}

export const MediaCard: React.FC<MediaProps> = ({
  imagePath,
  imageTitle,
  actionLabel = "Remove",
  clickEvent,
  deleteClickEvent = () => {},
}) => {
  let imageTitleTruncated = truncateString(imageTitle);
  let navigate = useNavigate();
  let isManagementCard = actionLabel === "Add";

  const handleViewClickEvent = () => {
    navigate(`/mealview?meal=${imageTitle}`);
  };

  return (
    <Card sx={{ width: 140, height: 140, position: "relative" }}>
      <CardMedia
        sx={{ height: 80 }}
        image={imagePath ? imagePath : defaultImage}
        title={imageTitle}
      />
      {isManagementCard && (
        <div style={{ position: "absolute", top: "5px", right: "5px" }}>
          <MealMenu
            viewClickEvent={() => handleViewClickEvent()}
            deleteClickEvents={() => deleteClickEvent()}
          />
        </div>
      )}
      <CardContent
        style={{
          padding: "0px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontWeight: 700 }}>{imageTitleTruncated}</p>
      </CardContent>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardActions style={{ padding: "0px" }}>
          <Button
            style={{ fontSize: "12px" }}
            onClick={() => clickEvent()}
            size="small"
          >
            {actionLabel}
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};
