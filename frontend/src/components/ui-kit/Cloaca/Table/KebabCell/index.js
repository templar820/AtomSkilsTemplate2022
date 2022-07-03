import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import Cell from 'lib-ui/Table/Cell';
import Tooltip from 'lib-ui/Tooltip';

const cellExtraStyles = css`
    overflow: visible;
    position: relative;
`;

const tooltipWrapperStyle = css`
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
`;

const KebabCell = ({ kebabTooltipProps, contextMenuComponent: ContextMenu, ...restProps }) => {
    const tooltipRef = useRef(null);
    const closeMenu = useCallback(() => {
        if (tooltipRef.current && tooltipRef.current['openHandler']) {
            const { openHandler } = tooltipRef.current;
            if (typeof openHandler === 'function') openHandler('close');
        }
    }, [tooltipRef]);
    return (
        <Cell css={cellExtraStyles} {...restProps}>
            <Tooltip
                ref={tooltipRef}
                wrapperStyle={tooltipWrapperStyle}
                iconHeight={'40'}
                iconWidth={'40'}
                icon={'Nothing'}
                isClicked={true}
                closeOnOutsideClick={true}
                tooltip={ContextMenu ? <ContextMenu closeMenu={closeMenu} /> : null}
                tooltipPositionX={'left'}
                tooltipPositionY={'middle'}
                {...kebabTooltipProps}
            />
        </Cell>
    );
};

KebabCell.propTypes = {
    /** render function for context menu component */
    contextMenuComponent: PropTypes.elementType,
    /** Defines props of tooltip */
    kebabTooltipProps: PropTypes.object
};

export default KebabCell;
