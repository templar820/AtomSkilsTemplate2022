import { css } from '@emotion/core';
import { hexToRGBA } from 'lib-root/utils/styleMixins';

const tabTemplates = {
    tiles: ({ colors, isActive, tabTemplateConfig }) => {
        const configType = typeof tabTemplateConfig;
        const config = {
            minWidth: 'initial',
            minHeight: 'initial',
            padding: `15px`,
            borderWidth: '1px',
            ...(configType === 'object' && tabTemplateConfig)
        };

        const styles = css`
            min-width: ${config.minWidth};
            min-height: ${config.minHeight};
            margin-left: -${config.borderWidth};
            padding: ${config.padding};
            border: ${config.borderWidth} solid ${colors.GrayScale_100};
            line-height: 1.1;
            &:hover {
                background-color: ${colors.GrayScale_100};
            }
            &:first-of-type {
                margin-left: 0;
            }
            ${isActive &&
                css`
                    &,
                    &:hover {
                        background-color: ${colors.GrayScale_0};
                    }
                    box-shadow: 0 1px 10px ${hexToRGBA(colors.GrayScale_700, 0.2)};
                    border-color: transparent;
                    z-index: 1;
                `}
            &[disabled] {
                background-color: ${colors.GrayScale_100};
            }
        `;
        const stylesExtension = configType === 'function' && tabTemplateConfig(isActive);
        return css`
            ${styles}
            ${stylesExtension}
        `;
    },
    underline: ({ colors, isActive, tabTemplateConfig }) => {
        const configType = typeof tabTemplateConfig;
        const config = {
            minWidth: '15px',
            padding: `15px`,
            borderWidth: '2px',
            transitionTime: '.3s',
            passiveColor: colors.GrayScale_100,
            activeColor: colors.secondary,
            ...(configType === 'object' && tabTemplateConfig)
        };
        const transitionTime = isActive ? config.transitionTime : '0s';
        const passiveColor = isActive ? config.activeColor : config.passiveColor;
        const styles = css`
            min-width: ${config.minWidth};
            padding: ${config.padding};
            transition: border-bottom 0s steps(1, end) ${transitionTime};
            border-bottom: ${config.borderWidth} solid ${passiveColor};
            line-height: 1.1;
        `;
        const stylesExtension = configType === 'function' && tabTemplateConfig(isActive);
        return css`
            ${styles}
            ${stylesExtension}
        `;
    },
    custom: ({ isActive, tabTemplateConfig }) => {
        try {
            return tabTemplateConfig && tabTemplateConfig(isActive);
        } catch (e) {
            console.warn('Tabs custom template error.', e);
        }
    }
};

export { tabTemplates };
