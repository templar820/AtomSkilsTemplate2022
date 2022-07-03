import React, { useContext } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { ColorsContext } from 'lib-root/colors';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

import Button from 'lib-ui/Button';
import { handleClose } from '../utils';

const marginStyle = css`
    &:not(:first-of-type) {
        margin-left: 10px;
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 14px;
    padding: 0 28px;
    ${({ buttonsStyle, ...restProps }) => applyEmotionStyle(buttonsStyle, restProps)};
`;

const calcButtonProps = (children, defaultProps, userProps, colors, ...restProps) => {
    const { css: _cssDefault, color: _defaultPropsColor, ...restDefaultProps } = defaultProps;
    const { css: _cssUser, color: _userPropsColor, ...restUserProps } = userProps;
    return {
        children,
        css: css`
            ${marginStyle};
            ${_cssDefault};
            ${applyEmotionStyle(_cssUser, { children, defaultProps, userProps, colors, ...restProps })};
        `,
        color: colors[_userPropsColor] || _userPropsColor || colors[_defaultPropsColor] || _defaultPropsColor,
        ...restDefaultProps,
        ...restUserProps
    };
};

const getBtn = (btn, configBtn, btnProps, configBtnProps, onClick, colors) => {
    const _btn = btn === undefined ? configBtn : btn;
    if (_btn === null) return null;
    return <Button {...{ ...calcButtonProps(_btn, configBtnProps, btnProps, colors), onClick, fontSize: '12px' }} />;
};

export default ({
    showButtons,
    mainButton,
    mainButtonProps = {},
    secondaryButton,
    secondaryButtonProps = {},
    onClose,
    onMainButtonClick,
    onSecondaryButtonClick,
    buttonsStyle,
    config: {
        mainButton: configMainButton,
        secondaryButton: configSecondaryButton,
        secondaryButtonProps: configSecondaryButtonProps = {},
        mainButtonProps: configMainButtonProps = {}
    }
}) => {
    if (!showButtons) return null;

    const colors = useContext(ColorsContext);

    // define click handlers
    const _onMainButtonClick = (e) => {
        if (onMainButtonClick) onMainButtonClick(e);
    };
    const _onSecondaryButtonClick = (e) => {
        if (onSecondaryButtonClick) {
            onSecondaryButtonClick(e);
        } else {
            handleClose(onClose, e, 'secondaryBtnClick');
        }
    };

    // define button nodes
    const _mainButton = getBtn(
        mainButton,
        configMainButton,
        mainButtonProps,
        configMainButtonProps,
        _onMainButtonClick,
        colors
    );
    const _secondaryButton = getBtn(
        secondaryButton,
        configSecondaryButton,
        secondaryButtonProps,
        configSecondaryButtonProps,
        _onSecondaryButtonClick,
        colors
    );

    // render
    return (
        <Container {...{ buttonsStyle }}>
            {_secondaryButton}
            {_mainButton}
        </Container>
    );
};
