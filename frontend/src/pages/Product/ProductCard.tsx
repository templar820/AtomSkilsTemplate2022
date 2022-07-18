import React, { useState } from 'react';
import {
  MoreVertIcon, PopupMenuGroup, SvgIcons
} from 'ui-kit';
import { useTranslation } from 'react-i18next';
import {
  CardContent, CardHeader, Menu, MenuItem, Typography,
} from '@mui/material';
import './index.scss';
import { makeStyles } from '@mui/styles';
import ProductModel from '../../model/Product.model';

const useStyles = makeStyles({
  headerCardPadding: {
    padding: '24px 16px 8px 24px',
  },
  bodyCardPadding: {
    padding: '0px 8px 8px 24px',
  },
});

interface ProductCardProps {
  product: ProductModel;
}

function ProductCard(props: ProductCardProps) {
  const { t } = useTranslation();

  const boxRef = React.useRef(null);

  const classes = useStyles();

  const {
    product
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | Element>(null);

  const handleOpenSettingsMenu = (e) => {
    e.stopPropagation();

    if (e.currentTarget) setAnchorEl(e.currentTarget);
  };

  const handleCloseSettingsMenu = (e: MouseEvent) => {
    e.stopPropagation();

    boxRef.current.classList.remove('selected');
    setAnchorEl(null);
  };

  return (
    <div key={product.id} className="productCard cursor-pointer my-2" tabIndex={product.id}>
      <div
        className="h-100 d-flex justify-content-between flex-column"
        onMouseEnter={() => {
          boxRef.current.classList.add('selected');
        }}
        onMouseLeave={() => {
          boxRef.current.classList.remove('selected');
        }}
        ref={boxRef}
      >
        <CardHeader
          classes={{
            root: classes.headerCardPadding,
          }}
          className="topPanel"
          title={(
            <Typography variant="subtitle1" color="textPrimary" component="p">
              {product.id}
            </Typography>
          )}
          action={<MoreVertIcon className="subMenuIco" width onClick={handleOpenSettingsMenu} />}
        />
        <CardContent
          className="flex-grow-1 flex-shrink-1"
          classes={{
            root: classes.bodyCardPadding,
          }}
        >
          <div className="d-flex flex-row h-100 justify-content-between align-items-end">
            <div className="d-flex w-75 h-100 flex-column justify-content-between">
              <Typography variant="caption" color="textSecondary" component="p">
                {product.substance.name}
              </Typography>
              <Typography variant="button" color="textPurple" component="p">
                {product.name}
              </Typography>
            </div>
            <SvgIcons name="card-pattern" className="cardPattern" />
          </div>
          <Menu
            id="simple-menu"
            keepMounted={false}
            open={Boolean(anchorEl)}
            onClose={handleCloseSettingsMenu}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <PopupMenuGroup>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseSettingsMenu(e);
                }}
              >
                {t('edit')}
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                }}
                data-testing-class="button"
                data-testing-value="projectDownload"
              >
                {t('commonComponents:filePicker.download')}
              </MenuItem>
            </PopupMenuGroup>

            <MenuItem
              className="deleteProjectMenuLink"
              onClick={(e) => {
                e.stopPropagation();

                handleCloseSettingsMenu(e);
              }}
            >
              {t('delete')}
            </MenuItem>
          </Menu>
        </CardContent>
      </div>
    </div>
  );
}

export default ProductCard;
