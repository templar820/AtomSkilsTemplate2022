import React from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';

class PortalWithState extends React.Component {
    constructor(props) {
        super(props);
        this.portalNode = null;
        this.state = { active: !!props.defaultOpen };
    }

    componentDidMount() {
        const { closeOnEsc, closeOnOutsideClick } = this.props;
        if (closeOnEsc) {
            document.addEventListener('keydown', this.handleKeydown);
        }
        if (closeOnOutsideClick) {
            document.addEventListener('click', this.handleOutsideMouseClick);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeydown);

        document.removeEventListener('click', this.handleOutsideMouseClick);
    }

    openPortal = (e) => {
        if (this.state.active) {
            return;
        }
        if (e && e.nativeEvent) {
            e.nativeEvent.stopImmediatePropagation();
        }
        this.setState({ active: true }, this.props.onOpen);
    };

    closePortal = () => {
        if (!this.state.active) {
            return;
        }
        this.setState({ active: false }, this.props.onClose);
    };

    wrapWithPortal = (children) => {
        if (!this.state.active) {
            return null;
        }
        return (
            <Portal node={this.props.node} key="react-portal" ref={(portalNode) => (this.portalNode = portalNode)}>
                {children}
            </Portal>
        );
    };

    getPortalNode = () => {
        let portalNode = this.portalNode && this.portalNode.props.node;
        if (typeof portalNode === 'boolean' && portalNode) {
            portalNode = this.portalNode.defaultNode;
        }
        return portalNode;
    };

    handleOutsideMouseClick = (e) => {
        if (!this.state.active) {
            return;
        }
        const root = this.getPortalNode();
        if (!root || root.contains(e.target) || (e.button && e.button !== 0)) {
            return;
        }
        this.closePortal();
    };

    handleKeydown = (e) => {
        if (e.key === 'Escape' && this.state.active) {
            this.closePortal();
        }
    };

    render() {
        return this.props.children({
            openPortal: this.openPortal,
            closePortal: this.closePortal,
            portal: this.wrapWithPortal,
            isOpen: this.state.active
        });
    }
}

PortalWithState.displayName = 'PortalWithState';
PortalWithState.propTypes = {
    /** Defines text or any node that will be placed in a body of the component */
    children: PropTypes.func.isRequired,
    /** Defines whether it's open by default */
    defaultOpen: PropTypes.bool,
    /** Defines node */
    node: PropTypes.any,
    /** Defines whether component should be closed on escape press */
    closeOnEsc: PropTypes.bool,
    /** Defines whether component should be closed on click outside */
    closeOnOutsideClick: PropTypes.bool,
    /** Callback that fires on open */
    onOpen: PropTypes.func,
    /** Callback that fires on close */
    onClose: PropTypes.func
};

PortalWithState.defaultProps = {
    children: () => <div />,
    onOpen: () => {},
    onClose: () => {}
};

export default PortalWithState;
