import React from 'react';
import createHOC from 'lib-root/utils/createHOC';
import { ColorsContext } from 'lib-root/colors';

const renderFunctionCreator = (Component) => (props, ref) => (
    <ColorsContext.Consumer>{(colors) => <Component {...{ ...props, colors, ref }} />}</ColorsContext.Consumer>
);

export default createHOC({ name: 'withColors', renderFunctionCreator });
