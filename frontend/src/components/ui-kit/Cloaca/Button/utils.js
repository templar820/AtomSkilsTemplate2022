import { lighten } from 'lib-root/utils/styleMixins';

const btnSizes = () => {
    return {
        lg: {
            iconBtnWidth: '60px',
            iconSize: '32px',
            vPadding: '30px',
            height: '60px'
        },
        md: {
            iconBtnWidth: '48px',
            iconSize: '32px',
            vPadding: '24px',
            height: '48px'
        },
        sm: {
            iconBtnWidth: '32px',
            iconSize: '16px',
            vPadding: '16px',
            height: '32px'
        },
        xs: {
            iconBtnWidth: '24px',
            iconSize: '16px',
            height: '24px'
        }
    };
};

const spinnerModes = {
    primary: 'secondary',
    secondary: 'primary',
    white: 'default',
    outline: 'default'
};

const _lighten = (color, { colorDiff = 20 }) => {
    return lighten(color, colorDiff);
};

export { btnSizes, _lighten, spinnerModes };
