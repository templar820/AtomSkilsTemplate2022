import React from 'react';
import { useTranslation } from 'react-i18next';
import { MuiLink, SvgIcons, Tooltip } from 'ui-kit';

import './TableRowActions.scss';

interface TableRowActionsProps {
  handleEditItem: () => void;
  handleDeleteItem: () => void;
}

export default function TableRowActions(props: TableRowActionsProps) {
  const { t } = useTranslation();

  return (
    <span className="TableRowActions d-flex align-items-center">
      <Tooltip title={t('edit')}>
        <MuiLink onClick={() => props.handleEditItem()}>
          <SvgIcons name="edit" width={16} height={16} className="mr-8" />
        </MuiLink>
      </Tooltip>
      <Tooltip title={t('delete')}>
        <MuiLink onClick={() => props.handleDeleteItem()}>
          <SvgIcons name="delete" width={16} height={16} className="mr-8" />
        </MuiLink>
      </Tooltip>
    </span>
  );
}
