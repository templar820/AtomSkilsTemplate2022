import React, { ReactElement, useMemo, useState } from 'react';
import { Menu, MenuItem, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './style.scss';
import { MenuProps } from '@mui/material';

/**
 * button - рендерится, отвечает за открытие меню
 * onChange - вызывается при изменении состояния меню (открытии, закрытии)
 * children - ребенком PopupMenu могут быть PopupMenuGroup (разделяет группы чертой) или PopupMenuItem
 */

interface PopupMenuProps extends Partial<MenuProps> {
  button: ReactElement;
  onChange?: (isOpen: boolean) => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ button, onChange, children, ...rest }) => {
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);

  const classes = makeStyles({
    menu: {
      '& .MuiPaper-root': {
        minWidth: '170px',
        boxShadow: '0px 5px 15px rgba(47, 47, 70, 0.15)',
        borderRadius: '6px',
        padding: '8px',
        '& .MuiMenuItem-root': {
          padding: '8px',
          borderRadius: '3px',
        },
      },
    },
    divider: {
      margin: '8px 0',
    },
  })();

  const handleOpenSettingsMenu = (e: MouseEvent) => {
    e.stopPropagation();
    if (onChange) onChange(true);

    if (e.currentTarget) setAnchorEl(e.currentTarget as Element);
  };

  const handleCloseSettingsMenu = () => {
    if (onChange) onChange(false);

    setAnchorEl(null);
  };

  const lastElementIndex = useMemo(() => {
    const childrenArr = React.Children.toArray(children);
    const lastIndex = childrenArr.reduce<number>((acc, child, index) => {
      if (React.isValidElement(child)) return index;
      return acc;
    }, 0);
    return lastIndex;
  }, [children]);

  return (
    <>
      {React.cloneElement(button, { onClick: handleOpenSettingsMenu })}
      <Menu
        anchorEl={anchorEl}
        keepMounted={false}
        open={Boolean(anchorEl)}
        onClose={handleCloseSettingsMenu}
        className={classes.menu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
        {...rest}
      >
        {React.Children.map(children, (child, index) => {
          let noDivider = false;
          if (!Array.isArray(children) || index === lastElementIndex) {
            noDivider = true;
          }
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { handleCloseSettingsMenu, noDivider });
          }
          return child;
        })}
      </Menu>
    </>
  );
};

const PopupMenuGroup: React.FC<{ handleCloseSettingsMenu?: () => void; noDivider?: boolean }> = ({
  noDivider,
  children,
  handleCloseSettingsMenu,
}) => {
  const classes = makeStyles({
    divider: {
      margin: '8px 0',
    },
  })();
  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { handleCloseSettingsMenu });
      })}
      {!noDivider && <Divider className={classes.divider} />}
    </>
  );
};

const PopupMenuItem: React.FC<{
  handleCloseSettingsMenu?: () => void;
  onClick?: () => void;
  variant?: 'red';
  icon?: ReactElement;
  wrapperDataset?: { [key: string]: string };
}> = ({ handleCloseSettingsMenu, children, variant, onClick, icon, wrapperDataset }) => {
  const dataset = wrapperDataset || {};
  return (
    <MenuItem
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
        handleCloseSettingsMenu(e);
      }}
      className={variant === 'red' ? 'popup-menu-item_red' : ''}
    >
      <div className="popup-menu__item">
        {icon && <div className="popup-menu__icon">{icon}</div>}
        <div
          className={`popup-menu__title ${variant === 'red' ? 'popup-menu__title_red' : ''}`}
          {...dataset}
        >
          {children}
        </div>
      </div>
    </MenuItem>
  );
};

export { PopupMenu, PopupMenuGroup, PopupMenuItem };
