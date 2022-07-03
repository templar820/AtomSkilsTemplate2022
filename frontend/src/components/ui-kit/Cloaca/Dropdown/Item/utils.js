import config from '../config';

const getPlacementPrecise = (position) => {
    switch (position) {
        case 'left':
        case 'top':
            return '-start';
        case 'right':
        case 'bottom':
            return '-end';
        default:
            return '';
    }
};
const mapPlacement = ({
    childDropdownPlacement: placement,
    childDropdownVerticalPosition: y,
    dropDownUnderChild: under,
    childDropDownSide: x
}) => {
    if (!x && !y && typeof under !== 'boolean') return placement;

    // setting defaults and dealing with mistakes
    if (x !== 'right' && x !== 'left') x = 'auto';
    if (y !== 'middle' && y !== 'bottom') y = 'top';

    if (under) {
        return `bottom${getPlacementPrecise(x)}`;
    } else {
        return (x === 'auto' ? 'right' : x) + getPlacementPrecise(y);
    }
};

const getOffset = ({ placement }) => {
    switch (placement) {
        case 'right-start':
        case 'left-start':
            return [-config.dropdownPadding];
        case 'right-end':
        case 'left-end':
            return [config.dropdownPadding];
        default:
            return [];
    }
};

export { mapPlacement, getOffset };
