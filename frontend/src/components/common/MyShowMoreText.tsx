import React from 'react';
import ShowMoreText from 'react-show-more-text';
import { Typography } from '@mui/material';

function MyShowMoreText({
  value, variant, textAlign, lines
}) {
  return (
    <div className="myShowMoreText">
      <Typography
        component="span"
        variant={variant}
        textAlign={textAlign || 'left'}
      >
        <ShowMoreText
          lines={lines || 4}
          more="Показать ещё"
          less="Свернуть"
          className="w-100"
          keepNewLines={false}
        >
          {value}
        </ShowMoreText>
      </Typography>
    </div>

  );
}

export default MyShowMoreText;
