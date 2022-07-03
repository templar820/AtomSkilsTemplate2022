import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './Navigation';

import config from './config';

/**
 * Компонент `Navigation` с предустановками
 *
 * import { Navigation as NavigationComponents } from 'core-lib-react/components';
 *
 * const { Navigation, NavigationWithPreset, Item } = NavigationComponents;
 */
const NavigationWithPreset = React.forwardRef(({ preset, ...restProps }, ref) => (
    <Navigation {...{ ref, ...config.presets[preset], ...restProps }} />
));

NavigationWithPreset.propTypes = {
    /** Defines what set of props will be chosen from presets. This props will be extended through other component's props identical to Navigation's */
    preset: PropTypes.oneOf(['normal', 'narrow']),
    ...Navigation.propTypes
};

NavigationWithPreset.defaultProps = {
    preset: 'narrow'
};

NavigationWithPreset.displayName = 'NavigationWithPreset';
export default NavigationWithPreset;
