import { ThemeOptions } from '@material-ui/core/styles/createTheme';

// Добавили в createTheme
// declare module '@material-ui/core/styles/createTypography' {
//   interface TypographyOptions {
//     caption2: CSSProperties;
//     caption3: CSSProperties;
//   }
//   interface Typography {
//     caption2: CSSProperties;
//     caption3: CSSProperties;
//   }
// }

const getInPx = (number: number) => `${number}px`;

const typography: ThemeOptions['typography'] = {
  fontFamily: ['Ubuntu'],
  allVariants: {
    fontStyle: 'normal',
    fontWeight: 500,
    textTransform: 'none',
  },
  h1: {
    fontSize: getInPx(32),
    lineHeight: getInPx(36),
  },
  h2: {
    fontSize: getInPx(20),
    lineHeight: getInPx(22),
  },
  subtitle1: {
    fontSize: getInPx(18),
    lineHeight: getInPx(20),
  },
  subtitle2: {
    fontSize: getInPx(16),
    lineHeight: getInPx(18),
  },
  body1: {
    fontWeight: 400,
    fontSize: getInPx(14),
    lineHeight: getInPx(20),
  },
  body2: {
    fontWeight: 400,
    fontSize: getInPx(14),
    lineHeight: getInPx(16),
  },
  button: {
    fontSize: getInPx(14),
    lineHeight: getInPx(16),
  },
  caption: {
    fontWeight: 400,
    fontSize: getInPx(12),
    lineHeight: getInPx(14),
  },
  // caption-2
  h5: {
    fontWeight: 700,
    fontSize: getInPx(14),
    lineHeight: getInPx(16),
  },
  // caption-3
  h6: {
    fontSize: getInPx(12),
    lineHeight: getInPx(14),
  },
};

export default typography;
