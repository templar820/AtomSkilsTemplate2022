import React from 'react';
import { css } from '@emotion/core';
import { LoaderComponent } from 'lib-ui/utils';

const getLoaderStyles = (currentSwitchSizes) => css`
    background-color: transparent;
    opacity: 0.5;
    transform: scale(${currentSwitchSizes.loaderScale});
`;

export default ({ isLoading, currentSwitchSizes, loaderProps }) => {
    return isLoading ? (
        <LoaderComponent isLoading={isLoading} wrapperStyle={getLoaderStyles(currentSwitchSizes)} {...loaderProps} />
    ) : null;
};
