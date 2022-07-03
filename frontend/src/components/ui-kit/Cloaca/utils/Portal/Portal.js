import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { layers } from 'lib-root/layers';
import LayerWrapper from './LayerWrapper';

const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
const isDefaultPortal = (node) => typeof node === 'boolean' && node;

const Portal = ({ children, node, roleName, hasLayerControl }) => {
    if (!canUseDOM) return null;

    const wrappedChildren = <LayerWrapper {...{ roleName, hasLayerControl }}>{children}</LayerWrapper>;

    return !node
        ? wrappedChildren
        : ReactDOM.createPortal(wrappedChildren, isDefaultPortal(node) ? document.body : node);
};

Portal.displayName = 'Portal';
Portal.propTypes = {
    children: PropTypes.node.isRequired,
    /** if false - portal render to parent node */
    node: PropTypes.oneOfType([PropTypes.bool, PropTypes.instanceOf(Element)]),
    /** Defines how must behave Portal in the stacking context */
    roleName: PropTypes.oneOf([...Object.keys(layers.roles), 'default']),
    /** If true - creates <div/> above the Portal with z-index = current 'LayersContext' value */
    hasLayerControl: PropTypes.bool
};

Portal.defaultProps = {
    children: <div />,
    node: true,
    roleName: 'default',
    hasLayerControl: true
};

export default Portal;
