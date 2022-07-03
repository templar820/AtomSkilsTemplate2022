import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { OutsideEventContainer } from 'react-on-outside-event';

import { Portal, AnimationTransition } from 'lib-ui/utils';
import { useRefCallback, useStateDelayer } from 'lib-root/utils';
import { ColorsContext } from 'lib-root/colors';
import { LayersContext } from 'lib-root/layers';

import { Container, StyledPaper, Body, Header, Buttons, ScrollPreventer } from './units';
import { handleClose } from './utils';

import allConfigs from './config';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * Используется для создания модального окна.
 */
const Modal = React.forwardRef(
    (
        {
            children,
            isVisible,
            animationDuration,
            experimentalNode,
            type,
            showHeader,
            headerText,
            icon,
            iconProps,
            showButtons,
            mainButton,
            mainButtonProps,
            secondaryButton,
            secondaryButtonProps,
            closeIcon,
            onClose,
            onMainButtonClick,
            onSecondaryButtonClick,
            preventScroll,
            paperStyle,
            headerStyle,
            bodyStyle,
            buttonsStyle,
            animationTransitionProps,
            ...restProps
        },
        forwardedRef
    ) => {
        const colors = useContext(ColorsContext);
        const zIndex = useContext(LayersContext);
        const config = allConfigs.type[type];

        // handle click outside
        const { ref: containerNode, initRef } = useRefCallback({ ref: forwardedRef });
        const inDOM = useStateDelayer({ state: isVisible, appear: 0, disappear: animationDuration });

        if (!inDOM) return null;
        return (
            <Portal {...{ node: experimentalNode, roleName: 'modal' }}>
                <ScrollPreventer active={preventScroll && !experimentalNode} />
                <AnimationTransition
                    animationStateOnMount={true}
                    animationState={isVisible}
                    {...animationTransitionProps}>
                    {(animationStyles) => (
                        <Container
                            {...{
                                colors,
                                isVisible,
                                experimentalNode,
                                ref: initRef,
                                zIndex,
                                animationStyles,
                                ...restProps
                            }}
                            className={setClassName({ props: restProps, name: 'modal' })}>
                            {containerNode.current && (
                                <OutsideEventContainer callback={(e) => handleClose(onClose, e, 'backdropClick')}>
                                    <StyledPaper {...{ paperStyle }}>
                                        <Header
                                            {...{
                                                showHeader,
                                                onClose,
                                                closeIcon,
                                                icon,
                                                iconProps,
                                                config,
                                                headerStyle
                                            }}>
                                            {headerText}
                                        </Header>
                                        <Body {...{ bodyStyle }}>
                                            {typeof children === 'function' ? children() : children}
                                        </Body>
                                        <Buttons
                                            {...{
                                                showButtons,
                                                mainButton,
                                                mainButtonProps,
                                                secondaryButton,
                                                secondaryButtonProps,
                                                onClose,
                                                onMainButtonClick,
                                                onSecondaryButtonClick,
                                                config,
                                                buttonsStyle
                                            }}
                                        />
                                    </StyledPaper>
                                </OutsideEventContainer>
                            )}
                        </Container>
                    )}
                </AnimationTransition>
            </Portal>
        );
    }
);

Modal.displayName = 'Modal';
Modal.propTypes = {
    /** Defines text or any node the will be placed in a body of the Modal.
     * Also could be a render function returning ReactNode */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /** Defines whether the modal should be shown */
    isVisible: PropTypes.bool,
    /** NOTE: experimental feature. Defines where to render modal if needed to be placed in specific node. Does not support overflow preventing in parent node. And could overflow parent node by itself*/
    experimentalNode: PropTypes.any,
    /** Defines where to place modal window by x axis. Got alias x*/
    horizontalPosition: PropTypes.oneOf(['left', 'center', 'right']),
    /** Alias for horizontalPosition prop */
    x: PropTypes.oneOf(['left', 'center', 'right']),
    /** Defines where to place modal window by y axis. Got alias y*/
    verticalPosition: PropTypes.oneOf(['top', 'center', 'bottom']),
    /** Alias for verticalPosition prop */
    y: PropTypes.oneOf(['top', 'center', 'bottom']),
    /** Defines options preset for modal */
    type: PropTypes.oneOf(['normal', 'confirm', 'success', 'delete', 'info', 'error', 'warning']),
    /** Defines whether header should be shown */
    showHeader: PropTypes.bool,
    /** Defines the text that will be shown in header */
    headerText: PropTypes.node,
    /** Defines icon node. If undefined uses config for current Modal type. If null removes icon */
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.func]),
    /** Defines props that will extend and overwrite default config props for icon. Receives all props acceptable for InlineIcon component */
    iconProps: PropTypes.object,
    /** Defines whether buttons sections should be shown */
    showButtons: PropTypes.bool,
    /** Defines main button content. If undefined uses config for current Modal type. If null removes button */
    mainButton: PropTypes.node,
    /** Defines props that will extend and overwrite default config props for main button. Receives all props acceptable for Button component */
    mainButtonProps: PropTypes.object,
    /** Defines callback that will be executed on main button click */
    onMainButtonClick: PropTypes.func,
    /** Defines secondary button content. If undefined uses config for current Modal type. If null removes button */
    secondaryButton: PropTypes.node,
    /** Defines props that will extend and overwrite default config props for secondary button. Receives all props acceptable for Button component */
    secondaryButtonProps: PropTypes.object,
    /** Defines callback that will be executed on secondary button click. If undefined will be executed onClose function */
    onSecondaryButtonClick: PropTypes.func,
    /** Defines close icon. If undefined uses config for current Modal type. If null removes button */
    closeIcon: PropTypes.node,
    /** Defines callback that will be executed on close. Callback will receive event object and close reason */
    onClose: PropTypes.func,
    /** Defines whether it is possible to scroll page when modal is active */
    preventScroll: PropTypes.bool,
    /** Emotion styles for Paper component*/
    paperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles for Header section component*/
    headerStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles for Body component (wraps Modal children)*/
    bodyStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles for Buttons section component*/
    buttonsStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Emotion styles for backdrop (Container) component*/
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Props for AnimationTransition component. Look AnimationTransition spec.  */
    animationTransitionProps: PropTypes.object
};
Modal.defaultProps = {
    isVisible: false,
    horizontalPosition: 'center',
    verticalPosition: 'center',
    type: 'normal',
    showHeader: true,
    showButtons: true,
    preventScroll: true
};

export default Modal;
