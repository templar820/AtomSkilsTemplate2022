import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { withColors } from 'lib-ui/utils';
import Drawer from 'lib-ui/Drawer';
import Paper from 'lib-ui/Paper';

import TimePanel from '../TimePanel';

const overflowStyle = css`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const curtainStyle = css`
    overflow-y: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const TimeDrawer = ({
    children,
    isOpen: _isOpen,
    colors,
    onOk: _onOk,
    closeOnOk,
    controlledOpen,
    // to remove dropdownControls from rest
    dropdownControls,
    ...rest
}) => {
    const [isOpen, setOpenState] = useState(_isOpen);

    useEffect(() => {
        setOpenState(_isOpen);
    }, [_isOpen]);

    const onOk = useCallback(
        (params) => {
            !controlledOpen && closeOnOk && setOpenState(false);
            _onOk({ ...params, isOpen: false });
        },
        [_onOk, isOpen, controlledOpen]
    );

    return (
        <>
            {children}
            <Drawer
                {...{
                    isOpen,
                    overlay: true,
                    overflowStyle,
                    curtainStyle,
                    size: '100%'
                }}>
                <Paper
                    css={css`
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        min-height: 0;
                    `}>
                    <TimePanel {...rest} {...{ onOk, maxNumberOfVisibleOptions: 0 }} />
                </Paper>
            </Drawer>
        </>
    );
};

TimeDrawer.displayName = 'TimeDrawer';
TimeDrawer.propTypes = {
    /** Defines is it need to close on data choose */
    closeOnOk: PropTypes.bool,
    /** Defines is drawer open or not */
    isOpen: PropTypes.bool,
    /** Defines is drawer open is under parents control */
    controlledOpen: PropTypes.bool,
    /** Callback on okBtn click, func({params, isOpen}) */
    onOk: PropTypes.func
};

TimeDrawer.defaultProps = {
    closeOnOk: true
};

export default withColors(TimeDrawer);
