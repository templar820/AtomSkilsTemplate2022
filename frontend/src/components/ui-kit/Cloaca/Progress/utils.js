import React from 'react';
import { autoAddPx } from 'lib-root/utils/styleMixins';

function getColor(status) {
    return {
        normal: 'info',
        error: 'errorAccent',
        success: 'primary',
        warning: 'warning'
    }[status];
}

function calcCapsRounds(startPosition, percent, caps, isInverted = false) {
    let leftRounds, rightRounds;
    leftRounds = rightRounds = caps === 'round';
    if (isInverted) {
        if (startPosition <= 0) {
            leftRounds = !leftRounds;
        }
        if (percent >= 100) {
            rightRounds = !rightRounds;
        }
    }
    return [leftRounds, rightRounds];
}

function calcLineCaps(rounds, radius) {
    const [left, right] = rounds.map((round) => (round ? autoAddPx(radius) : 0));
    return `${left} ${right} ${right} ${left}`;
}

function getChildrenFillersProps(children) {
    let childrenFillersProps = React.Children.map(children, (child) => {
        return child.props;
    });
    return childrenFillersProps ? childrenFillersProps : [{}];
}

function getPathTemplateVars(svgWidth, barWidth) {
    const svgCenter = svgWidth / 2;
    const diameter = svgWidth - barWidth;
    const radius = diameter / 2;
    return { svgCenter, diameter, radius };
}

export { getColor, getChildrenFillersProps, calcLineCaps, calcCapsRounds, getPathTemplateVars };
