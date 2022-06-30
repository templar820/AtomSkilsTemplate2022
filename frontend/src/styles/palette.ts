import Colors from '@colors';

const palette = {};
for (const [key, value] of Object.entries(Colors)) {
  palette[key] = {
    main: value
  };
}
type paletteType = typeof Colors;
type IPalette = Record<keyof paletteType, true>

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides extends IPalette{
  }
}


export default palette;
