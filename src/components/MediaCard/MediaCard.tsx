import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import defaultImage from '../../images/defaultImage.jpg';
import Button from '@mui/material/Button';
import React from 'react';

interface MediaProps {
  imagePath: string | null;
  imageTitle: string;
  actionLabel?: string;
  clickEvent: Function;
}

function truncateString(str: string){
  return (str.length > 30) ? str.slice(0, 29) + '...' : str;
};

export const MediaCard: React.FC<MediaProps> = ({
  imagePath,
  imageTitle,
  actionLabel = "Remove",
  clickEvent,
}) => {
  let imageTitleTruncated = truncateString(imageTitle);
  return (
    <Card sx={{ width: 140, height: 140 }}>
      <CardMedia sx={{ height: 80 }} image={imagePath ? imagePath : defaultImage} title={imageTitle} />
      <CardContent style={{ padding: '0px', height: '32px', display:"flex", alignItems: "center", justifyContent:"center" }}>
        <p style={{ fontWeight: 700 }}>{imageTitleTruncated}</p>
      </CardContent>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CardActions style={{padding: '0px'}}>
          <Button style={{fontSize:'12px'}} onClick={() => clickEvent()} size="small">{actionLabel}</Button>
        </CardActions>
      </div>
    </Card>
  );
};
