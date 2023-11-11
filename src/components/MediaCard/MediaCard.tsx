import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

interface MediaProps {
  imagePath: string;
  imageTitle: string;
  imageDescription: string;
}
export const MediaCard: React.FC<MediaProps> = ({
  imagePath,
  imageTitle,
  imageDescription
}) => {
  return (
    <Card sx={{ width: 140 }}>
      <CardMedia sx={{ height: 80 }} image={imagePath} title={imageTitle} />
      <CardContent style={{ padding: '0px' }}>
        <p style={{ fontWeight: 700 }}>{imageTitle}</p>
      </CardContent>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CardActions>
          <Button size="small">Remove</Button>
        </CardActions>
      </div>
    </Card>
  );
};
