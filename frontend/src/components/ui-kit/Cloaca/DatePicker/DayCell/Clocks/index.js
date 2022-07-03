import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import InlineIcons from 'lib-ui/InlineIcons';
import Tooltip from 'lib-ui/Tooltip';
import { withColors } from 'lib-ui/utils';

import { StyledOuter, StyledInner, StyledClocksIcon, StyledTooltipOuter, StyledTooltipDate } from './units';

const ClocksTooltip = ({ range = {}, date, dateOptions, clocksRef }) => {
    return (
        <StyledTooltipOuter ref={clocksRef}>
            {date ? (
                <StyledTooltipDate>{date && format(date, 'dd MMM HH:mm:ss', dateOptions)}</StyledTooltipDate>
            ) : (
                <>
                    <StyledTooltipDate>
                        {range.startDate && format(range.startDate, 'dd MMM HH:mm:ss', dateOptions)}
                    </StyledTooltipDate>
                    <StyledTooltipDate>
                        {range.endDate && format(range.endDate, 'dd MMM HH:mm:ss', dateOptions)}
                    </StyledTooltipDate>
                </>
            )}
        </StyledTooltipOuter>
    );
};

const Clocks = ({ colors, color, onClick, onMouseDown, onMouseUp, range, date, dateOptions, clocksRef, ...rest }) => {
    return (
        <StyledOuter {...{ colors, onClick, onMouseDown, onMouseUp, ref: clocksRef }}>
            <Tooltip
                tooltip={<ClocksTooltip {...{ date, range, dateOptions }} />}
                disable={!range && !date}
                portalStyle={{ zIndex: 100, pointerEvents: 'none' }}
                openDelay={350}
                paperStyle={{ padding: '8px 16px' }}>
                <StyledInner {...{ colors, color }}>
                    <StyledClocksIcon {...rest} />
                </StyledInner>
            </Tooltip>
        </StyledOuter>
    );
};

Clocks.displayName = 'Clocks';
Clocks.propTypes = {
    ...InlineIcons.propTypes,
    /** There is an opportunity to throw a custom icon https://megawiki.megafon.ru/pages/viewpage.action?pageId=580035528 */
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    /** Callback fires then click on Clocks */
    onClick: PropTypes.func
};

Clocks.defaultProps = {};

export default withColors(Clocks);
