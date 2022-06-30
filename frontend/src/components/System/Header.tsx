import React, { useEffect, useState } from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import {
  Button, IconButton, Menu, MenuItem, Typography,
} from '@mui/material';
import MyTag from '@common/MyTag';
import Colors from '@colors';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Header(props: MOBXDefaultProps) {
  return (
    <header className="w-100 px-2" onClick={() => setAnchorEl(null)}>
      <div className="d-flex justify-content-between align-items-center align-content-center my-2">
        <div className="cities-input">
          <IconButton>
            <MyTag
              withoutBorder
              icon={<Typography variant="h5" color={Colors.black}>{100}</Typography>}
              backgroundColor={Colors.red5}
            >
              <FavoriteIcon color="white" />
            </MyTag>
          </IconButton>

        </div>
      </div>

    </header>
  );
}

export default MobXRouterDecorator(Header);
