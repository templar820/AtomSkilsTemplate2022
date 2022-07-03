import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Divider, ListItem, ListItemIcon, ListItemText,
  Tooltip
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Colors from '@colors';

// @ts-ignore
import logo from '@icons/favicon.png';
import { MOBXDefaultProps } from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';

const drawerWidth = 240;

const openedMixin = theme => ({
  width: drawerWidth,
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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    boxSizing: 'border-box',
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
    marginLeft: 0,
    backgroundColor: 'transparent !important'
  },
  MuiTreeItemRoot: {
    "&[aria-selected='true']": {
      borderLeft: `4px solid ${Colors.primary}`,
      backgroundColor: Colors.menuBackgroundColor
    },
  },
  MuiTreeItemLabelRoot: {
    marginLeft: 0,
    backgroundColor: 'transparent !important',
    '& *': {
      backgroundColor: 'transparent !important',
    },
    padding: 8,
    '&:hover': {
      '& .MuiListItemText-primary': {
        color: Colors.white
      },
      '& .MuiListItemIcon-root': {
        color: Colors.white
      }
    },
  },
}));

function Menu(props: MOBXDefaultProps) {
  const classes = useStyles();
  const appStore = props.AppStore;
  const open = appStore.openMenu;
  const currentPath = useLocation().pathname;
  const [openNodes, setOpenNodes] = useState<string[]>([]);
  
  
  const getChildren = array => {
    if (!(array && array.length)) return null;
    
    return array.map((item, index) => (
      <TreeItem
        key={item.key}
        nodeId={item.key}
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
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
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
              <div className="d-flex flex-row align-items-center">
                {open ? (
                  <>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
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
      {/*<DrawerHeader className="d-flex justify-content-center">*/}
      {/*  {open ? <UserProfileCard user={props.UserStore.currentUser!} />*/}
      {/*    : <img src={logo} alt="logo" width={64} height={64} />}*/}
      {/*</DrawerHeader>*/}
      <Divider className="d-block mt-2" />
      <div className="h-auto" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {getMenu(appStore.mainMenu)}
      </div>
      <Divider />
      <div className="mt-auto mb-4">
        <Divider />
        {getMenu(appStore.botMenu)}
      </div>
    </Drawer>
  
  );
}

export default MobXRouterDecorator(Menu);
