import { hexToRGBA } from 'lib-root/utils/styleMixins';

const switchSizes = {
    md: {
        wrapperWidth: '62px',
        wrapperHeight: '32px',
        thumbWidth: '30px',
        fontSize: '15px',
        defaultIconSize: '20px',
        loaderScale: '0.5'
    },
    sm: {
        wrapperWidth: '42px',
        wrapperHeight: '22px',
        thumbWidth: '20px',
        fontSize: '10px',
        defaultIconSize: '16px',
        loaderScale: '0.4'
    }
};

const getColorScheme = (colors) => ({
    main: hexToRGBA(colors.primary, 0.9),
    border: colors.primary,
    additional: colors.GrayScale_0,
    inactive: colors.GrayScale_50,
    inactiveAccent: colors.GrayScale_200,
    inactiveBorder: colors.GrayScale_100,
    thumbShadow: hexToRGBA(colors.GrayScale_700, 0.25)
});

const iconConfig = {
    checked: {
        position: 'left',
        numeric: '1',
        iconName: 'Success'
    },
    unchecked: {
        position: 'right',
        numeric: '0',
        iconName: 'Cross_exit'
    }
};

function handleKeyUp(key, cb) {
    if (key === 'ArrowLeft') cb(false);
    if (key === 'ArrowRight') cb(true);
}

export { switchSizes, getColorScheme, iconConfig, handleKeyUp };
