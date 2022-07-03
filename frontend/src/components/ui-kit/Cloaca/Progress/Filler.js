import React from 'react';
import PropTypes from 'prop-types';

import { Path, LineFiller } from './units';
import { calcCapsRounds } from 'lib-root/components/Progress/utils';

const Filler = React.forwardRef((props, ref) => {
    const {
        progressType,
        startPosition,
        percent,
        caps,
        invertMarginalCaps,
        fillerColor: color,
        fillerWidth: width,
        fillerStyle: additionalStyles,
        ...restProps
    } = props;
    const capsRounds = calcCapsRounds(startPosition, percent, caps, invertMarginalCaps);
    return progressType === 'line' ? (
        <LineFiller {...{ ref, ...props, capsRounds }} />
    ) : (
        <Path {...{ ref, color, width, startPosition, percent, caps, additionalStyles, ...restProps }} />
    );
});

Filler.displayName = 'Filler';
Filler.propTypes = {
    /** Defines how full the progress bar filled. In range from 0 to 100. Overrides Progress bar's percent */
    percent: PropTypes.number,
    /** Defines the shape of filler caps. Overrides Progress bar's caps */
    caps: PropTypes.oneOf(['round', 'square']),
    /** Overrides Progress' rounding if square caps chosen. Works only with line progresses. */
    capsRadius: PropTypes.number,
    /** Overrides Progress' prop. If filler reaches marginal value (100%), revert caps to opposite value (round -> square and square -> round). The same logic with the start position. */
    invertMarginalCaps: PropTypes.bool,
    /** Overrides width of the filler defined in Progress bar */
    fillerWidth: PropTypes.number,
    /** Overrides color of the filler defined in Progress bar */
    fillerColor: PropTypes.string,
    /** Defines percent, which will be start point for the filler. Doesn't affect end point - it is still equal to the percent. Overrides Progress' value */
    startPosition: PropTypes.number,
    /** Overrides duration of filler position change set in Progress. In ms */
    animationDuration: PropTypes.number,
    /** Overrides Emotion styles for filler set in Progress */
    fillerStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};

export default Filler;
