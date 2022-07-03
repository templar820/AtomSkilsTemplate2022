import React from 'react';
import PropTypes from 'prop-types';
import { TabsPanelWrapper } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';
import { useStateController } from 'lib-root/utils';
import { Tabs } from 'lib-ui/Tabs';

const TabsPanel = ({
    activeTab: activeTabProp,
    children,
    onTabChange,
    className,
    classNameTabs,
    isControlled,
    tabsPanelWrapperStyle,
    ...restProps
}) => {
    const tabs = React.Children.toArray(children);

    const { value: activeTab, handler: setActiveTab } = useStateController({
        value: activeTabProp,
        callback: onTabChange,
        isControlled: isControlled
    });

    const activeContainer = Array.isArray(tabs) && tabs.find((tab) => activeTab === tab.props.tab);

    return (
        <TabsPanelWrapper
            {...{ tabsPanelWrapperStyle }}
            className={setClassName({ props: { className }, name: 'TabsPanel' })}>
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} className={classNameTabs} {...restProps}>
                {children}
            </Tabs>
            {activeContainer && React.isValidElement(activeContainer.props.children) && activeContainer.props.children}
        </TabsPanelWrapper>
    );
};

TabsPanel.displayName = 'TabsPanel';
TabsPanel.propTypes = {
    ...Tabs.propTypes,
    /** Additional style for children component Tabs */
    classNameTabs: PropTypes.string,
    /** Controlled or uncontrolled */
    isControlled: PropTypes.bool,
    /** Additional style for TabsPanelWrapper */
    tabsPanelWrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};

TabsPanel.defaultProps = {
    ...Tabs.defaultProps,
    isControlled: false
};

export default TabsPanel;
