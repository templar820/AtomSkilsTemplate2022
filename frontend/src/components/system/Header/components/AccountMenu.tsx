import React from 'react';
import MobXRouterDecorator from "@components/HOC/MobXRouterDecorator";
import {AccountCircleRounded, ExitToApp, KeyboardArrowDown} from "@mui/icons-material";
import {Menu} from "@mui/material";
import {Typography} from "ui-kit";
import {Dropdown} from "react-bootstrap";
import {makeStyles} from "@mui/styles";
import {Roles} from "@services/Auth.service";
import Colors from '@colors';
import {MOBXDefaultProps} from "@globalTypes";

const useStyles = makeStyles(theme => ({
  account: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& svg': {
      color: Colors.menuTextColor,
    },
    '&:hover svg': {
      color: Colors.white,
    }
  },
  openAccount: {
    '& svg': {
      color: Colors.white,
    },
  },
  menu: {
    padding: '0 !important',
    boxShadow: '0 3px 8px rgba(5, 6, 36, 0.15) !important',
    width: '160px',
    right: '21px !important',
    left: 'auto !important',
    '& .MuiList-root': {
      paddingTop: 0,
    }
  },
  dropDownItem: {
    '&:active': {
      color: 'inherit',
      background: 'rgb(233, 236, 239)'
    }
  }
}));

const AccountMenu = (props: MOBXDefaultProps & {headerRef: any}) => {
  const userStore = props.UserStore;
  const authService = props.services.authService;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  if (!userStore.user) return null;

  const roles = {
    [Roles.ADMIN]: "Администратор",
    [Roles.USER]: "Пользователь",
  }

  return (
    <>
      <div className={`${classes.account} ${open ? classes.openAccount : ''}`} onClick={() => setOpen(true)}>
        <AccountCircleRounded fontSize="large"/>
        <KeyboardArrowDown className='ms-1'/>
      </div>
      <Menu
        anchorEl={props.headerRef.current}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          className: classes.menu
        }}
      >
        <div className="p-3 pb-1">
          <Typography variant="subtitle1" className="mb-1">{userStore.user.email}</Typography>
          <Typography variant="body1">{roles[userStore.user.role]}</Typography>
        </div>
        <Dropdown.Divider/>
        <Dropdown.Item
          onClick={() => {
            authService.logout();
          }}
          className={classes.dropDownItem}
        >
          <div className="d-flex align-items-center">
            <ExitToApp className="me-1" color="primary"/>
            <Typography variant="body2">Выйти</Typography>
          </div>
        </Dropdown.Item>
      </Menu>
    </>
  )
}

export default MobXRouterDecorator(AccountMenu);