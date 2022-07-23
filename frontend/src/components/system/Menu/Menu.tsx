import React, {useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import {
  ListItem, ListItemIcon, ListItemText, SvgIcon,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Colors from '@colors';
import { MOBXDefaultProps } from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { SvgIcons, Tooltip } from 'ui-kit';
import logo from '@images/logo3.png';
import menuContents from "@components/system/Menu/menuContents";

// const drawerWidth = 190;

const openedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingRight: theme.spacing(1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflow: 'auto',
    boxSizing: 'border-box',
    '& .MuiPaper-root': {
      borderRight: 'none',
      position: 'static',
    },
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const useStyles = makeStyles(theme => ({
  clearPadding: {
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
    padding: '0px !important',
    marginLeft: 0,
    backgroundColor: 'transparent !important'
  },
  MuiTreeItemRoot: {
    border: 'none',
    borderLeft: `4px solid transparent`,
    minHeight: '40px',

    backgroundColor: `${Colors.menuBackgroundColor} !important`,
    "&[aria-selected='true']": {
      borderLeft: `4px solid ${Colors.primary}`,
      backgroundColor: Colors.menuBackgroundColor,
    },
  },
  MuiTreeItemLabelRoot: {
    margin: 0,
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    minHeight: '28px',
    backgroundColor: 'transparent !important',
    '& *': {
      backgroundColor: 'transparent !important',
    },
    color: Colors.menuTextColor,
    marginTop: 6,
    marginBottom: 6,
    paddingRight: 16,
    '&:hover': {
      '& .MuiListItemText-primary': {
        color: `${Colors.white} !important`
      },
      '& *': {
        color: `${Colors.white} !important`,
        fill: `${Colors.white} !important`
      },
      '& .MuiListItemIcon-root': {
        color: `${Colors.white} !important`
      }
    },
  },
}));

function Menu(props: MOBXDefaultProps) {
  const classes = useStyles();
  const appStore = props.AppStore;
  const userStore = props.UserStore;
  const open = appStore.openMenu;
  const currentPath = useLocation().pathname;
  const [openNodes, setOpenNodes] = useState<string[]>([]);

  useEffect(() => {
    const role = userStore.user?.role;
    if (!role) return;
    appStore.setMainMenu(menuContents[role]);
  }, [userStore.user?.role]);

  const getChildren = array => {
    if (!(array && array.length)) return null;

    return array.map((item, index) => (
      <TreeItem
        key={item.id}
        nodeId={item.id}
        classes={{
          label: classes.MuiTreeItemLabelRoot,
          root: classes.MuiTreeItemRoot,
          content: classes.clearPadding,
        }}
        label={(
          <ListItem className={classes.clearPadding}>
            <ListItemText primary={item.name} />
          </ListItem>
        )}
        onClick={() => {
          props.history.push(item.path);
        }}
        aria-selected={currentPath.includes(item.path)}
      >
        {getChildren(item.children)}
      </TreeItem>
    ));
  };

  const getMenu = menuList => (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon className="me-1" />}
      defaultExpandIcon={<ChevronRightIcon className="me-1" />}
      expanded={open ? openNodes : []}
    >
      {menuList.map((item, index) => (
        <TreeItem
          key={item.id}
          nodeId={item.name}
          classes={{
            label: classes.MuiTreeItemLabelRoot,
            root: classes.MuiTreeItemRoot,
            content: classes.clearPadding,
          }}
          label={
            (
              <div className="d-flex flex-row align-items-center justify-content-start">
                {open ? (
                  <>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText className="ms-4" primary={<Typography variant="subtitle2" component="span">{item.name}</Typography>} />
                  </>
                ) : (
                  <Tooltip title={item.name} arrow placement="right">
                    <ListItemIcon>{item.icon}</ListItemIcon>
                  </Tooltip>
                )}
              </div>
            )
          }
          onClick={() => {
            if (item.children) {
              if (!open) appStore.changeMenu();
            } else {
              props.history.push(item.path);
            }
            let arr = [...new Set(openNodes)] as string[];
            // @ts-ignore
            if (arr.includes(item.name) && open) {
              arr = arr.filter(el => el !== item.name);
            } else {
              arr.push(item.name as string);
            }
            setOpenNodes(arr);
          }}
          aria-selected={!!currentPath.includes(item.path)}
        >
          {getChildren(item.children)}
        </TreeItem>
      ))}
    </TreeView>
  );

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader className="d-flex justify-content-start">
        <div className="ms-2 d-flex justify-content-center align-items-center">
          <img src={logo} alt="logo" width={64} />
          {open ? (
            <Typography variant="h2">
              <b>ROS</b>
              АТОМ
            </Typography>
          ) : null}
        </div>
      </DrawerHeader>
      <div className="h-auto">
        {getMenu(appStore.mainMenu)}
      </div>
      <div className="mt-auto mb-4">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon className="me-1" />}
          defaultExpandIcon={<ChevronRightIcon className="me-1" />}
          expanded={open ? openNodes : []}
        >
          <TreeItem
            key="menu_change"
            nodeId="menu_change"
            classes={{
              label: classes.MuiTreeItemLabelRoot,
              root: classes.MuiTreeItemRoot,
              content: classes.clearPadding,
            }}
            label={(
              <div className="d-flex flex-row align-items-center justify-content-start">
                {open ? (
                  <>
                    <ListItemIcon>
                      <SvgIcons name="logout" />
                    </ListItemIcon>
                    <ListItemText className="ms-4" primary={<Typography variant="subtitle2" component="span">Свернуть меню</Typography>} />
                  </>
                ) : (
                  <Tooltip title="Развернуть меню" arrow placement="right">
                    <div>
                      <SvgIcons name="logout" />
                    </div>
                  </Tooltip>
                )}
              </div>
            )}
            onClick={() => {
              appStore.changeMenu();
            }}
            aria-selected={false}
          />
        </TreeView>
      </div>
    </Drawer>

  );
}

export default MobXRouterDecorator(Menu);
