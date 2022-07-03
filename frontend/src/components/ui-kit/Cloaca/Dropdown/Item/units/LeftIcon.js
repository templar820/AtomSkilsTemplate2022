import React from 'react';
import styled from '@emotion/styled';

const StyledLeftIconWrapper = styled.span`
    display: inline-block;
    vertical-align: middle;
    margin-right: 18.7455px;
`;

const LeftIcon = ({ leftIcon }) => (!leftIcon ? null : <StyledLeftIconWrapper {...{ children: leftIcon }} />);

export default LeftIcon;
