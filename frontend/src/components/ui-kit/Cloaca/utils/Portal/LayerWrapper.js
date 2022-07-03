import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { layers, LayersContext } from 'lib-root/layers';

const Wrap = styled.div`
    z-index: ${({ zIndex }) => zIndex + layers.step};
`;

const LayersProvider = ({ index, children, roleName }) => {
    const { roles, step, default: defaultIndex } = layers;
    const roleIndex = roles[roleName] !== undefined ? roles[roleName] : defaultIndex;
    const value = index > roleIndex ? index + step : roleIndex + step;
    return <LayersContext.Provider {...{ value }}>{children}</LayersContext.Provider>;
};

export default ({ children, roleName, hasLayerControl }) => {
    const zIndex = useContext(LayersContext);

    const consumer = (
        <LayersContext.Consumer>
            {(index) => <LayersProvider {...{ index, children, roleName }} />}
        </LayersContext.Consumer>
    );

    return hasLayerControl ? <Wrap {...{ zIndex }}>{consumer}</Wrap> : consumer;
};
