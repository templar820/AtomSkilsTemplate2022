import { useMemo } from 'react';
import { applyPopperProps, getMainPopperPlacement, positions } from 'lib-root/utils/position';
import { usePopper } from 'react-popper';

const MAX_WIDTH = 364;
const popperWidthModifier = {
    name: 'selectWidth',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn: ({ state }) => {
        let { width } = state.rects.popper;

        if (width > MAX_WIDTH) width = MAX_WIDTH;
        if (state.rects.reference.width > width) width = state.rects.reference.width;

        state.styles.popper.width = `${width}px`;
        state.isOversize = width !== state.rects.reference.width;
    },
    effect: ({ state }) => {
        let { offsetWidth: width } = state.elements.popper;

        if (width > MAX_WIDTH) width = MAX_WIDTH;
        if (state.elements.reference.offsetWidth > width) width = state.elements.reference.offsetWidth;

        state.elements.popper.style.width = `${width}px`;
        state.isOversize = width !== state.elements.reference.offsetWidth;
    }
};

const usePopperConfig = (popperElement, referenceElement, placement, popperProps) => {
    const options = useMemo(() => {
        const basicOptions = {
            placement,
            modifiers: [popperWidthModifier]
        };
        return applyPopperProps(basicOptions, popperProps);
    }, [placement, popperProps]);

    const { styles, state, update } = usePopper(referenceElement, popperElement, options);

    const { isOversize, placement: currentPlacement } = state || {};
    const mainPlacement = getMainPopperPlacement(currentPlacement);
    const { opposite } = positions[mainPlacement] || {};

    return { isOversize, opposite, positionUpdate: update, popperStyles: styles.popper };
};

export { usePopperConfig };
