const mdProgressWidth = 8;
const smProgressWidth = 6;
const animationDuration = 300;
const mdSvgWidth = 100;
const smSvgWidth = 50;
const mdCaptionFontSize = 15;
const smCaptionFontSize = 12;
const iconBig = 20;
const iconSmall = 16;
const capsRadius = 5;
const offset = 13;
const circleDTemplate = (vars) => {
    const { svgCenter, diameter, radius } = vars;
    return `M ${svgCenter},${svgCenter} m 0,-${radius}a ${radius},
    ${radius} 0 1 1 0,${diameter}a ${radius},${radius} 0 1 1 0,-${diameter}`;
};
const dashboardDTemplate = (vars) => {
    const { svgCenter, diameter, radius } = vars;
    return `M ${svgCenter},${svgCenter} m 0,${radius}a ${radius},
    ${radius} 0 1 1 0,-${diameter}a ${radius},${radius} 0 1 1 0,${diameter}`;
};

export default {
    line: {
        sizes: {
            md: {
                barWidth: mdProgressWidth,
                fillerWidth: mdProgressWidth,
                captionFontSize: mdCaptionFontSize,
                captionIconSize: iconBig,
                capsRadius
            },
            sm: {
                barWidth: smProgressWidth,
                fillerWidth: smProgressWidth,
                captionFontSize: smCaptionFontSize,
                captionIconSize: iconSmall,
                capsRadius
            }
        },
        animationDuration
    },
    circle: {
        sizes: {
            md: {
                barWidth: mdProgressWidth,
                fillerWidth: mdProgressWidth,
                captionFontSize: mdCaptionFontSize,
                captionIconSize: iconBig,
                svgWidth: mdSvgWidth,
                dTemplate: circleDTemplate
            },
            sm: {
                barWidth: smProgressWidth,
                fillerWidth: smProgressWidth,
                captionFontSize: smCaptionFontSize,
                captionIconSize: iconBig,
                svgWidth: smSvgWidth,
                dTemplate: circleDTemplate
            }
        },
        animationDuration
    },
    dashboard: {
        sizes: {
            md: {
                barWidth: mdProgressWidth,
                fillerWidth: mdProgressWidth,
                captionFontSize: mdCaptionFontSize,
                captionIconSize: iconBig,
                svgWidth: mdSvgWidth,
                offset,
                dTemplate: dashboardDTemplate
            },
            sm: {
                barWidth: smProgressWidth,
                fillerWidth: smProgressWidth,
                captionFontSize: smCaptionFontSize,
                captionIconSize: iconBig,
                svgWidth: smSvgWidth,
                offset,
                dTemplate: dashboardDTemplate
            }
        },
        animationDuration
    }
};
