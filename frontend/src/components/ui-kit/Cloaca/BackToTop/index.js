import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { debounce } from 'lib-root/utils';
import Button from 'lib-ui/Button';
import { setClassName } from 'lib-root/utils/styleMixins';

const ARROW_ROTATE = {
    toBottom: 0,
    toTop: 180,
    toRight: -90,
    toLeft: 90
};

const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Компонент скроллящий в начало страницы в заданом направлении
 */
class BackToTop extends Component {
    lastScrollTop = 0;

    state = {
        isHidden: true,
        windowBounding: canUseDOM ? document.body.getBoundingClientRect() : {},
        isRendered: false
    };

    getBoundingClientRect = (element, parent) => {
        if (element === document.body) {
            return element.getBoundingClientRect();
        }

        parent = parent || document.body;

        const elementRect = element.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        return {
            x: elementRect.x - parentRect.x,
            y: elementRect.y - parentRect.y,
            top: elementRect.top - parentRect.top,
            right: elementRect.right - parentRect.right,
            bottom: elementRect.bottom - parentRect.bottom,
            left: elementRect.left - parentRect.left
        };
    };

    scrollFunction = (scrollTo, scrollFactor, axis) => {
        const { easing, animationDuration, cancelAnimation } = this.props;

        let startTime = 0;
        const time = Math.max(0.1, Math.min(Math.abs(scrollFactor - scrollTo) / animationDuration, 0.8));

        const easingEquations = {
            easeOutSine: (pos) => Math.sin(pos * (Math.PI / 2)),
            easeInOutSine: (pos) => -0.5 * (Math.cos(Math.PI * pos) - 1),
            easeInOutQuint: (pos) => {
                const newPos = pos / 0.5;

                if (newPos < 1) {
                    return 0.5 * newPos ** 5;
                }

                return 0.5 * (newPos - 2) ** 5 + 2;
            }
        };

        const tick = () => {
            startTime += 1 / 60;

            const p = startTime / time;
            const t = easingEquations[easing](p);
            const { direction } = this.props;
            const animationPathPoint = cancelAnimation ? scrollTo : scrollFactor + (scrollTo - scrollFactor) * t;

            if (p < 1) {
                this.scrollWindow.requestAnimFrame(tick);

                if (direction === 'toTop' || direction === 'toBottom')
                    this.scrollWindow.scrollTo(axis, animationPathPoint);
                if (direction === 'toRight' || direction === 'toLeft')
                    this.scrollWindow.scrollTo(animationPathPoint, axis);
            } else {
                if (direction === 'toTop' || direction === 'toBottom') this.scrollWindow.scrollTo(axis, scrollTo);
                if (direction === 'toRight' || direction === 'toLeft') this.scrollWindow.scrollTo(scrollTo, axis);
            }
        };

        tick();
    };

    handleVisible = () => {
        const { showAt, direction, showOnScroll } = this.props;
        const { windowBounding } = this.state;

        const scrollStatus = {
            toBottom: Math.abs(windowBounding.top),
            toTop: Math.abs(windowBounding.top),
            toRight: Math.abs(windowBounding.left),
            toLeft: Math.abs(windowBounding.left)
        };

        const isAtRange = scrollStatus[direction] >= showAt;

        const lastScrollDirections = {
            toBottom: showOnScroll && scrollStatus[direction] < this.lastScrollTop,
            toTop: showOnScroll && scrollStatus[direction] > this.lastScrollTop,
            toRight: showOnScroll && scrollStatus[direction] < this.lastScrollTop,
            toLeft: showOnScroll && scrollStatus[direction] > this.lastScrollTop
        };

        this.setState({
            isHidden: !isAtRange || lastScrollDirections[direction]
        });

        this.lastScrollTop = scrollStatus[direction] <= 0 ? 0 : scrollStatus[direction];
    };

    setWindowBounding = () => {
        this.setState({
            windowBounding: canUseDOM ? this.getBoundingClientRect(this.scrollBody, this.scrollWindow) : {}
        });
    };

    scrolling = () => {
        const { direction, refProp } = this.props;

        const { windowBounding } = this.state;
        const { scrollFunction } = this;

        let axis;
        let scrollFactor;
        let scrollTo;

        this.props.onClick && this.props.onClick();

        const isRefScroll = refProp && refProp.current;

        switch (direction) {
            case 'toTop':
                if (isRefScroll) {
                    scrollTo = this.getBoundingClientRect(refProp.current, this.scrollBody).top;
                    scrollFactor = Math.abs(windowBounding.y);
                    axis = Math.abs(windowBounding.x);
                } else {
                    scrollTo = this.getBoundingClientRect(this.scrollBody).top;
                    scrollFactor = Math.abs(windowBounding.y);
                    axis = Math.abs(windowBounding.x);
                }

                break;

            case 'toBottom':
                if (isRefScroll) {
                    scrollTo =
                        this.getBoundingClientRect(refProp.current, this.scrollBody).top + refProp.current.offsetHeight;
                    scrollFactor = Math.abs(windowBounding.y);
                    axis = Math.abs(windowBounding.x);
                } else {
                    scrollTo = this.scrollBody.scrollHeight;
                    scrollFactor = Math.abs(windowBounding.y);
                    axis = Math.abs(windowBounding.x);
                }

                break;
            case 'toRight':
                if (isRefScroll) {
                    scrollTo =
                        this.getBoundingClientRect(refProp.current, this.scrollBody).left + refProp.current.offsetWidth;
                    scrollFactor = Math.abs(windowBounding.x);
                    axis = Math.abs(windowBounding.top);
                } else {
                    scrollTo = this.scrollBody.scrollWidth;
                    scrollFactor = Math.abs(windowBounding.x);
                    axis = Math.abs(windowBounding.top);
                }

                break;
            case 'toLeft':
                if (isRefScroll) {
                    scrollTo = this.getBoundingClientRect(refProp.current, this.scrollBody).left;
                    scrollFactor = Math.abs(windowBounding.x);
                    axis = Math.abs(windowBounding.y);
                } else {
                    scrollTo = this.scrollBody.offsetLeft;
                    scrollFactor = Math.abs(windowBounding.x);
                    axis = Math.abs(windowBounding.top);
                }

                break;
            default:
                break;
        }

        scrollFunction(scrollTo, scrollFactor, axis);
    };

    updateScrollListener = debounce(this.setWindowBounding, 50);
    updateHandleVisible = debounce(this.handleVisible, 50);

    componentDidUpdate = (_, prevState) => {
        if (!prevState.isRendered) {
            if (canUseDOM) {
                this.scrollWindow =
                    this.props.windowRefProp && this.props.windowRefProp.current
                        ? this.props.windowRefProp.current
                        : window;

                this.scrollBody =
                    this.props.bodyRefProp && this.props.bodyRefProp.current
                        ? this.props.bodyRefProp.current
                        : document.body;

                this.scrollWindow.requestAnimFrame = (() => {
                    const clb = (callback) => {
                        window.setTimeout(callback, 1000 / 60);
                    };

                    return (
                        this.scrollWindow.requestAnimationFrame ||
                        this.scrollWindow.webkitRequestAnimationFrame ||
                        this.scrollWindow.mozRequestAnimationFrame ||
                        clb
                    );
                })();

                this.setWindowBounding();
                this.handleVisible();
                this.scrollWindow.addEventListener('scroll', this.updateScrollListener);
                this.scrollWindow.addEventListener('scroll', this.updateHandleVisible);

                this.setState({
                    windowBounding: this.getBoundingClientRect(this.scrollBody, this.scrollWindow)
                });
            }
        }
    };

    componentDidMount = () => {
        this.setState({
            isRendered: true
        });
    };

    componentWillUnmount = () => {
        if (canUseDOM) {
            this.scrollWindow.removeEventListener('scroll', this.updateHandleVisible);
            this.scrollWindow.removeEventListener('scroll', this.updateScrollListener);
        }
    };

    render() {
        const { style, direction, ...rest } = this.props;
        const { isHidden } = this.state;

        if (!canUseDOM) {
            return null;
        }

        return (
            <Button
                className={setClassName({ props: this.props, name: 'back-to-top' })}
                onClick={this.scrolling}
                icon={'Triangle'}
                iconStyle={css`
                    transform: rotate(${ARROW_ROTATE[direction]}deg);
                    width: 40px;
                    min-width: 40px;
                    height: 40px;
                `}
                css={css`
                    opacity: ${isHidden ? 0 : 1};
                    visibility: ${isHidden ? 'hidden' : 'visible'};
                `}
                style={style}
                {...rest}
            />
        );
    }
}

BackToTop.displayName = 'BackToTop';
BackToTop.propTypes = {
    /** send the ref if you need scroll to some element */
    refProp: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    /** window ref in which the element will scroll */
    windowRefProp: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    /** body ref which will scroll */
    bodyRefProp: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    /** Show on scroll  */
    showOnScroll: PropTypes.bool,
    /** Canceling of animation  */
    cancelAnimation: PropTypes.bool,
    /** Scroll direction */
    direction: PropTypes.oneOf(['toBottom', 'toTop', 'toRight', 'toLeft']),
    /** easing */
    easing: PropTypes.string,
    /** Callback that fires on mouse click */
    onClick: PropTypes.func,
    /** Show at some height or width */
    showAt: PropTypes.number,
    /** Animation speed */
    animationDuration: PropTypes.number,
    /** Style */
    style: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};

BackToTop.defaultProps = {
    refProp: undefined,
    direction: 'toTop',
    cancelAnimation: false,
    showOnScroll: false,
    easing: 'easeInOutSine',
    showAt: 1000,
    animationDuration: 2000,
    style: {
        position: 'fixed',
        left: 50,
        bottom: 50
    }
};

export default BackToTop;
