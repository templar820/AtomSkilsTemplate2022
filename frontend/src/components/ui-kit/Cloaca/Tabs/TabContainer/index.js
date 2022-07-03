import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'lib-ui/Tabs';

const TabContainer = ({ children, tab, ...restProps }) => {
    return <Tab {...restProps}>{tab}</Tab>;
};

TabContainer.displayName = 'TabContainer';
TabContainer.propTypes = {
    ...Tab.propTypes,
    /** Children of TabContainer */
    children: PropTypes.node,
    /** For title */
    tab: PropTypes.string
};

export default TabContainer;
