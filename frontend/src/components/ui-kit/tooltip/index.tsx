import React from 'react';

import { MaterialTooltip } from 'ui-kit';

import { TooltipProps } from '@mui/material';

const MAX_LENGTH_TWO_LINE_TOOLTIP = 70;
const DEFAULT_PROPS_TOOLTIP_CONFIG = { arrow: true };

interface CustomTooltip extends TooltipProps {
  isToggled: boolean;
  popperClassName?: string;
}

export default function Tooltip(props: CustomTooltip) {
  const mode =
    typeof props.title === 'string' && props.title.length > MAX_LENGTH_TWO_LINE_TOOLTIP
      ? 'multiLine'
      : 'twoLine';

  return (
    <>
      {!props.isToggled ? (
        <MaterialTooltip
          {...{ ...DEFAULT_PROPS_TOOLTIP_CONFIG, ...props }}
          PopperProps={{
            className: `MuiTooltip-popper MuiTooltip-popperArrow ${
              props.popperClassName ? props.popperClassName : ''
            }  ${mode}`,
          }}
        >
          {React.cloneElement(props.children)}
        </MaterialTooltip>
      ) : (
        <>{React.cloneElement(props.children)}</>
      )}
    </>
  );
}
