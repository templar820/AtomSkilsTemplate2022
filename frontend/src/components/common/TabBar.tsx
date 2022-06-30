import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SvgIcons from '@svg-icons';

interface TabBarProps{
  hideLike?: boolean
  hideNext?: boolean
  hideDislike?: boolean
  hidePrevious?: boolean;
  onClickNext: (reactions) => void
  onClickPrevious: () => void
}

function TabBar(props: TabBarProps) {
  return (
    <footer className="w-100 d-flex justify-content-center align-items-center flex-row">
      {!props.hidePrevious && (
        <IconButton
          onClick={() => {
            props.onClickPrevious();
          }}
          className="btn rounded p-3"
        >
          <ArrowBackIosNewIcon color="black" fontSize="small" />
        </IconButton>
      )}
      {!props.hideDislike && (
        <IconButton
          onClick={() => {
            props.onClickNext('DISLIKE');
          }}
          className="mx-3 btn rounded p-3"
        >
          <SvgIcons name="clear" height={35} width={35} />
        </IconButton>
      )}
      {!props.hideLike && (
        <IconButton
          onClick={() => {
            props.onClickNext('LIKE');
          }}
          className="me-3 btn rounded p-3"
        >
          <FavoriteIcon fontSize="large" color="green6" />
        </IconButton>
      )}
      {!props.hideNext && (
        <IconButton
          onClick={() => {
            props.onClickNext('SKIP');
          }}
          className="btn rounded p-3"
        >
          <ArrowForwardIosIcon color="black" fontSize="small" />
        </IconButton>
      )}
    </footer>
  );
}

export default TabBar;
