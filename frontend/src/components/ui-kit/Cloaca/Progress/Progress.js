import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { ColorsContext } from 'lib-root/colors';
import { autoAddPx, hexToRGBA } from 'lib-root/utils/styleMixins';

import allConfigs from './config';
import { getColor, getChildrenFillersProps, getPathTemplateVars } from './utils';
import { StyledWrapper, Bar, Caption, Fillers } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * Используется для отображения текущего значения относительно 100%.
 *
 * import { Progress as ProgressComponents } from 'core-lib-react/components';
 *
 * const { Progress, ProgressFiller } = ProgressComponents;
 */
const Progress = React.forwardRef(
    (
        {
            className,
            percent,
            barWidth,
            svgWidth,
            dashboardOffset,
            fillerWidth,
            barColor,
            fillerColor,
            caption,
            captionFontSize,
            captionIconSize,
            progressType,
            capsRadius,
            size,
            status,
            showCaption,
            preserveHeight,
            startPosition,
            wrapperStyle,
            barStyle,
            fillerStyle,
            children,
            ...restProps
        },
        ref
    ) => {
        const colors = useContext(ColorsContext);
        barColor = colors[barColor] || barColor || hexToRGBA(colors.GrayScale_100, 0.5);
        const globalColor = colors[getColor(status)] || getColor(status);
        const config = allConfigs[progressType].sizes[size];
        const _percent = percent > 100 ? 100 : percent < 0 ? 0 : percent;
        const _barWidth = barWidth || config.barWidth;
        const _fillerWidth = fillerWidth || config.fillerWidth;
        const _captionFontSize = captionFontSize || config.captionFontSize;
        const _captionIconSize = captionIconSize || config.captionIconSize;
        const minHeight = preserveHeight ? autoAddPx(Math.max(_captionIconSize, _captionFontSize, _barWidth)) : 'auto';

        const _svgWidth = progressType === 'line' ? undefined : svgWidth || config.svgWidth;
        const circumference = progressType === 'line' ? undefined : (_svgWidth - _barWidth) * Math.PI;
        const pathD = progressType === 'line' ? undefined : config.dTemplate(getPathTemplateVars(_svgWidth, _barWidth));
        const _capsRadius = progressType !== 'line' ? undefined : capsRadius || config.capsRadius;
        const offset =
            progressType !== 'dashboard' ? undefined : (circumference * (dashboardOffset || config.offset)) / 100;

        const fillersProps = getChildrenFillersProps(children);

        return (
            <StyledWrapper
                {...{ ref, globalColor, progressType, minHeight, wrapperStyle, ...restProps }}
                className={setClassName({ props: { className }, name: 'progress' })}>
                <Bar
                    {...{
                        barWidth: _barWidth,
                        barColor,
                        showCaption,
                        progressType,
                        barStyle,
                        startPosition,
                        capsRadius: _capsRadius,
                        percent: _percent,
                        svgWidth: _svgWidth,
                        pathD,
                        offset,
                        circumference,
                        ...restProps
                    }}>
                    <Fillers
                        {...{
                            barWidth: _barWidth,
                            fillersProps,
                            percent: _percent,
                            fillerColor,
                            fillerWidth: _fillerWidth,
                            progressType,
                            startPosition,
                            capsRadius: _capsRadius,
                            fillerStyle,
                            svgWidth: _svgWidth,
                            pathD,
                            offset,
                            circumference,
                            ...restProps
                        }}
                    />
                </Bar>
                {showCaption && (
                    <Caption
                        {...{
                            status,
                            percent: _percent,
                            caption,
                            progressType,
                            captionFontSize: _captionFontSize,
                            captionIconSize: _captionIconSize,
                            ...restProps
                        }}
                    />
                )}
            </StyledWrapper>
        );
    }
);

Progress.displayName = 'Progress';
Progress.propTypes = {
    /** Defines shape of the progress bar */
    progressType: PropTypes.oneOf(['line', 'circle', 'dashboard']),
    /** Defines progress bar size template */
    size: PropTypes.oneOf(['md', 'sm']),
    /** If progress type is circle or dashboard, defines width and height of the component */
    svgWidth: PropTypes.number,
    /** If progress type is dashboard, defines percent of empty space */
    dashboardOffset: PropTypes.number,
    /** Defines how full the progress bar filled. In range from 0 to 100 */
    percent: PropTypes.number,
    /** Defines percent, which will be start point for fillers. Doesn't affect end point - it is still equal to the percent */
    startPosition: PropTypes.number,
    /** Defines width of the bar */
    barWidth: PropTypes.number,
    /** Defines width of child fillers */
    fillerWidth: PropTypes.number,
    /** Defines the shape of line caps */
    caps: PropTypes.oneOf(['round', 'square']),
    /** Defines rounding if square caps chosen. Works only with line progresses. */
    capsRadius: PropTypes.number,
    /** If percent reaches marginal value (100), revert caps to opposite value (round -> square and square -> round). The same logic with the start position. */
    invertMarginalCaps: PropTypes.bool,
    /** Defines bar's background */
    barColor: PropTypes.string,
    /** Defines color of child fillers. By default defined through status color */
    fillerColor: PropTypes.string,
    /** Defines default color of filler and the caption's view. Normally shows percent or success icon when percent equal to 100 */
    status: PropTypes.oneOf(['normal', 'error', 'success', 'warning']),
    /** Defines whether caption will be shown or not */
    showCaption: PropTypes.bool,
    /** Defines whether the min-height of the component will be set by maximal possible height of the children */
    preserveHeight: PropTypes.bool,
    /** Overrides caption defined by status */
    caption: PropTypes.node,
    /** Defines font-size of the caption if not overwritten */
    captionFontSize: PropTypes.number,
    /** Defines icon size of the caption if not overwritten */
    captionIconSize: PropTypes.number,
    /** Duration of filler position change. In ms */
    animationDuration: PropTypes.number,
    /** Emotion styles for component's wrapper */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles for bar */
    barStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles for fillers*/
    fillerStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};
Progress.defaultProps = {
    percent: 0,
    progressType: 'line',
    size: 'md',
    caps: 'round',
    invertMarginalCaps: false,
    fillerColor: 'currentColor',
    status: 'normal',
    showCaption: true,
    preserveHeight: true,
    startPosition: 0,
    caption: undefined,
    animationDuration: 450
};

export default Progress;
