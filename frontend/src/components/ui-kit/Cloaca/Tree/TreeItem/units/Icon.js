import React from 'react';
import { IconContainer, IconPositioner, DefaultLoadingIcon, DefaultIcon } from './units';

function fitByIconType(icon) {
    return typeof icon === 'function' ? icon : () => icon;
}

function pickProperIcon(isLoading, icon, loadingIcon) {
    return isLoading ? fitByIconType(loadingIcon || DefaultLoadingIcon) : fitByIconType(icon || DefaultIcon);
}

function Icon({ icon, loadingIcon, isLoading, hasSubtree, expanded, handleExpanding, id, ...restProps }) {
    const IconForRendering = pickProperIcon(isLoading, icon, loadingIcon);
    return (
        <IconContainer>
            <IconPositioner onClick={() => hasSubtree && handleExpanding && handleExpanding({ [id]: !expanded })}>
                <IconForRendering {...{ hasSubtree, expanded, ...restProps }} />
            </IconPositioner>
        </IconContainer>
    );
}

export default Icon;
