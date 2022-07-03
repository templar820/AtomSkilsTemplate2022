import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { ColorsContext } from 'lib-root/colors';

import { tabsTemplates } from './utils';
import { setClassName } from 'lib-root/utils/styleMixins';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledTabs = styled.ul`
    display: inline-flex;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    position: relative;
    ${({ colors, template, tabsTemplateConfig, activeRef }) => {
        if (typeof tabsTemplates[template] === 'undefined') template = 'custom';
        return tabsTemplates[template]({ colors, activeRef, tabsTemplateConfig });
    }};
    ${({ css: _css, ...restProps }) => applyEmotionStyle(_css, restProps)};
`;

/**
 * Группа кнопок для переключения вида. Работает по принципу радио-кнопок или вкладок.
 *
 * import { Tabs as TabsComponents } from 'core-lib-react/components';
 *
 * const { Tab, Tabs } = TabsComponents;
 */
const Tabs = React.forwardRef(
    ({ activeTab, className, onTabChange, template, tabTemplateConfig, children, ...restProps }, ref) => {
        const colors = useContext(ColorsContext);
        const [activeRef, setActiveRef] = useState(undefined);
        const handleTabChange = (tab) => onTabChange && onTabChange(tab);

        return (
            <StyledTabs
                {...{ colors, activeRef, template, ref, ...restProps }}
                className={setClassName({ props: { className }, name: 'tabs' })}>
                {React.Children.map(
                    children,
                    (child, index) => {
                        const { tab = index, ...restChildProps } = child.props;
                        return React.cloneElement(child, {
                            handleTabChange: () => handleTabChange(tab),
                            template,
                            tabTemplateConfig,
                            setActiveRef,
                            ...restChildProps,
                            isActive: tab === activeTab
                        });
                    },
                    null
                )}
            </StyledTabs>
        );
    }
);

Tabs.displayName = 'Tabs';
Tabs.propTypes = {
    /** Defines component's active tab */
    activeTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines component's template */
    template: PropTypes.oneOf(['tiles', 'underline', 'custom']),
    /** Defines tabs template config */
    tabsTemplateConfig: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /** Defines tab template config */
    tabTemplateConfig: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /** Defines component's additional className */
    className: PropTypes.string,
    /** Defines tabs that will be placed in a body of the component */
    children: PropTypes.array.isRequired,
    /** Defines component's additional css */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines callback function fires on user changing tab, func(tab) */
    onTabChange: PropTypes.func
};
Tabs.defaultProps = {
    activeTab: 0,
    children: [],
    template: 'tiles'
};

export default Tabs;
