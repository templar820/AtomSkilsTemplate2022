import React, { useState, useMemo, useRef, useEffect } from 'react';
import { LoaderComponent, EmptyStates, withColors } from 'lib-ui/utils';
import PropTypes from 'prop-types';
import { resolveProps } from 'lib-root/utils';

import {
    StyledPanelInner,
    StyledPanelHead,
    StyledPanelContent,
    StyledContentCollapse,
    LoaderComponentWrapper,
    EmptyStatesWrapper
} from '../units';
import { setClassName } from 'lib-root/utils/styleMixins';
import { useStateDelayer } from 'lib-root/utils';

const Collapse = ({
    title,
    children: _children,
    onExpand,
    expanded,
    onClick,
    isOpen,
    childKey,
    isLoading,
    isDisabled,
    disabled: propDisabled,
    emptyState,
    emptyStateProps,
    loaderProps,
    onExpandValues,
    isControlled,
    colors,
    styles,
    ...restProps
}) => {
    const disabled = resolveProps(propDisabled, isDisabled);

    const refCollapse = useRef(null);

    const [expandedState, setExpandedState] = useState(expanded);
    const [contentHeight, setContentHeight] = useState(0);

    const control = isControlled || isOpen;

    useEffect(() => {
        setContentHeight(refCollapse.current.scrollHeight);
    });

    useEffect(() => {
        setExpandedState(expanded);
    }, [expanded]);

    const children = useMemo(() => {
        if (typeof _children === 'function' && expanded) return _children();
        return _children;
    }, [_children, expanded]);

    const animateDelay = useStateDelayer({ state: expandedState, appear: 300, disappear: 0 });
    const expandedDelay = useStateDelayer({ state: expandedState, appear: 0, disappear: 300 });
    const onClickHandler = (e) => {
        if (disabled) return false;

        control ? onClick && onClick(childKey) : setExpandedState(!expandedState);

        onExpand && onExpand(e, onExpandValues);
    };

    const preparedTitle =
        typeof title === 'function'
            ? title({
                  expandedState,
                  setExpandedState,
                  contentHeight,
                  setContentHeight,
                  refCollapse,
                  animateDelay,
                  disabled
              })
            : title;
    return (
        <StyledPanelInner
            styles={styles.PanelInner}
            {...restProps}
            className={setClassName({ props: restProps, name: 'accordion_panel' })}>
            <StyledPanelHead
                styles={styles.PanelHead}
                {...{ colors, disabled }}
                expanded={expandedState}
                onClick={(e) => onClickHandler(e)}>
                {preparedTitle}
            </StyledPanelHead>
            <StyledContentCollapse
                styles={styles.ContentCollapse}
                expanded={expandedState}
                contentHeight={contentHeight}
                animated={animateDelay}>
                <StyledPanelContent styles={styles.PanelContent} ref={refCollapse}>
                    {isLoading ? (
                        <LoaderComponentWrapper styles={styles.LoaderWrapper}>
                            <LoaderComponent isLoading={true} {...loaderProps} />
                        </LoaderComponentWrapper>
                    ) : !children || emptyState ? (
                        <EmptyStatesWrapper styles={styles.EmptyStatesWrapper}>
                            <EmptyStates {...emptyStateProps} />
                        </EmptyStatesWrapper>
                    ) : expandedDelay ? (
                        children
                    ) : null}
                </StyledPanelContent>
            </StyledContentCollapse>
        </StyledPanelInner>
    );
};

Collapse.displayName = 'Collapse';
Collapse.propTypes = {
    /** Prop for control group of collapses */
    isOpen: PropTypes.bool,
    /** Controlled or uncontrolled */
    isControlled: PropTypes.bool,
    /** Expand collapse */
    expanded: PropTypes.bool,
    /** Add loader component */
    isLoading: PropTypes.bool,
    /** Text or component that will be put as heading of the Collapse. Always visible part */
    title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    /** Disable collapse
     * isDisabled will be deprecated in future versions
     */
    disabled: PropTypes.bool,
    /** Children */
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    /** Callback fires then collapse expands, func(e, onExpandValues) */
    onExpand: PropTypes.func,
    /** Defines whether "No data" message should be shown  */
    emptyState: PropTypes.bool,
    /** Props of emptyState component */
    emptyStateProps: PropTypes.object,
    /** Props for Loader subcomponent */
    loaderProps: PropTypes.object,
    /** Styling object for all specific units (except emptyStates and loader) */
    styles: PropTypes.shape({
        PanelInner: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        PanelHead: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        PanelContent: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        ContentCollapse: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        LoaderWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        EmptyStatesWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
    })
};
Collapse.defaultProps = {
    isLoading: false,
    disabled: false,
    onExpand: () => undefined,
    styles: {}
};

export default withColors(Collapse);
