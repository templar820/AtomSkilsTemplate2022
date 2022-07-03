import { css, keyframes } from '@emotion/core';
import { autoAddPx } from 'lib-root/utils/styleMixins';

const tabsTemplates = {
    tiles: ({ activeRef, tabsTemplateConfig }) => {
        if (typeof tabsTemplateConfig === 'function') {
            return tabsTemplateConfig(activeRef);
        }
    },
    underline: ({ colors, activeRef, tabsTemplateConfig }) => {
        const configType = typeof tabsTemplateConfig;
        let styles = css``;
        const stylesExtension = configType === 'function' && tabsTemplateConfig(activeRef);

        if (activeRef) {
            const config = {
                width: activeRef.offsetWidth,
                left: activeRef.offsetLeft,
                bottom: 0,
                height: '2px',
                activeColor: colors.secondary,
                transitionTime: '.3s',
                ...(configType === 'object' && tabsTemplateConfig)
            };
            const getKeyframes = (left) => keyframes`0% { visibility: visible; ${left} } 100% { visibility: hidden; }`;
            styles = css`
                &:after {
                    content: '';
                    position: absolute;
                    transition-property: width, left;
                    transition-duration: ${config.transitionTime};
                    animation: ${getKeyframes(activeRef.offsetLeft)} ${config.transitionTime} linear forwards;
                    background: ${config.activeColor};
                    height: ${config.height};
                    bottom: ${autoAddPx(config.bottom)};
                    left: ${autoAddPx(config.left)};
                    width: ${autoAddPx(config.width)};
                }
            `;
        }

        return css`
            ${styles}
            ${stylesExtension}
        `;
    },
    custom: ({ activeRef, tabsTemplateConfig }) => {
        try {
            return tabsTemplateConfig && tabsTemplateConfig(activeRef);
        } catch (e) {
            console.warn('Tabs custom template error.', e);
        }
    }
};

export { tabsTemplates };
