import React from 'react';
import styled from '@emotion/styled';

const StyledHamburgerContainer = styled.div`
    height: 32px;
    width: 32px;
    padding: 0 28px;
    margin-bottom: 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
`;

const StyledHamburgerLine = styled.div`
    height: 2px;
    width: ${({ isOpen }) => (isOpen ? '15px' : '20px')};
    border-radius: 2px;
    background: ${({ colors }) => colors.primary};
    transition: all 0.2s ease;
`;

const StyledHamburgerTopLine = styled(StyledHamburgerLine)`
    transform: ${({ isOpen }) => (isOpen ? 'rotate(41.5deg)' : 'none')};
    transform-origin: top left;
    margin-bottom: 3px;
`;
const StyledHamburgerMidLine = styled(StyledHamburgerLine)`
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
    transform: ${({ isOpen }) => (isOpen ? 'translateX' : 'none')};
`;
const StyledHamburgerBottomLine = styled(StyledHamburgerLine)`
    transform: ${({ isOpen }) => (isOpen ? 'translateX(-1px) rotate(-41.5deg)' : 'none')};
    transform-origin: top left;
    margin-top: 3px;
`;

export default ({ isOpen, onClickHamburger, colors }) => {
    return (
        <StyledHamburgerContainer onClick={onClickHamburger}>
            <StyledHamburgerTopLine {...{ colors, isOpen }} />
            <StyledHamburgerMidLine {...{ colors, isOpen }} />
            <StyledHamburgerBottomLine {...{ colors, isOpen }} />
        </StyledHamburgerContainer>
    );
};
