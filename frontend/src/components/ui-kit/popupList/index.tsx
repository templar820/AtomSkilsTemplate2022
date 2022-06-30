import React, { useEffect, useMemo, useState } from 'react';
import { InputAdornment, SearchIcon, TextField, Typography } from 'ui-kit';
import Colors from '@colors';
import { useTranslation } from 'react-i18next';

import FloatingWindow from '../floatingWindow/FloatingWindow';
import './style.scss';

type ListItem = {
  id: string;
  name: string;
  description: string;
};

interface PopupListProps {
  list: ListItem[];
  open: boolean;
  onClose: () => void;
  onChange: (item: ListItem) => void;
  anchorEl?: Element;
  title?: string;
  isSearch?: boolean;
  isDraggable?: boolean;
}

const PopupList: React.FC<PopupListProps> = ({
  title,
  list,
  isSearch,
  open,
  onClose,
  onChange,
  anchorEl,
  isDraggable,
}) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  const filteredList = useMemo(() => {
    if (!isSearch) return list;
    const searchValueLowered = searchValue.toLocaleLowerCase();
    return list.filter((item) => item.name.toLowerCase().includes(searchValueLowered));
  }, [list, searchValue, isSearch]);

  useEffect(() => {
    if (!open) {
      setSearchValue('');
    }
  }, [open]);

  return (
    <FloatingWindow
      title={title}
      open={open}
      onClose={onClose}
      isDraggable={isDraggable}
      anchorEl={anchorEl}
      width={248}
      height={359}
    >
      <div className="pb-24 popup-list">
        {isSearch && (
          <TextField
            className="px-24 mb-8"
            variant="outlined"
            placeholder={t('search')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="disabled" fontSize="small" />
                </InputAdornment>
              ),
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            fullWidth
          />
        )}
        <div className="popup-list__overflow">
          <div className="px-24">
            {filteredList.map((item, index) => (
              <div
                className="popup-list__item"
                key={`${item.name}-${index}`}
                onClick={() => onChange(item)}
              >
                <Typography variant="body2" className="mb-4">
                  {item.name}
                </Typography>
                <Typography variant="caption" color={Colors.gray6}>
                  {item.description}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FloatingWindow>
  );
};

PopupList.defaultProps = {
  isSearch: true,
  isDraggable: false,
};

export default PopupList;
