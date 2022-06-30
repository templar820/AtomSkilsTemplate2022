import { ThemeOptions } from '@mui/material';
import Colors from '@colors';
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
  fontFamily: ['Montserrat'],
  allVariants: {
    fontStyle: 'normal',
    fontWeight: 500,
    textTransform: 'none',
  },
  // Прям название сайта
  h1: {
    fontWeight: 700,
    fontSize: getInPx(32),
    lineHeight: getInPx(36),
  },
  // заголовок 1-го уровня
  h2: {
    fontWeight: 600,
    fontSize: getInPx(20),
    lineHeight: getInPx(22),
  },
  // заголовок 2-го уровня
  subtitle1: {
    fontSize: getInPx(18),
    lineHeight: getInPx(20),
  },
  // заголовок 3 уровня
  subtitle2: {
    fontSize: getInPx(14),
    lineHeight: getInPx(10),
  },
  // Текст в карточках
  body1: {
    fontWeight: 400,
    fontSize: getInPx(14),
    lineHeight: getInPx(20),
  },
  body2: {
    fontWeight: 400,
    fontSize: getInPx(14),
    lineHeight: getInPx(18),
  },
  button: {
    fontWeight: 300,
    fontSize: getInPx(14),
    lineHeight: getInPx(16),
  },
  // лейблы к инпутам
  caption: {
    fontWeight: 300,
    fontSize: getInPx(12),
    lineHeight: getInPx(14),
  },
  
  // Всякие Badge ну тип уведомления
  h5: {
    fontWeight: "bold",
    fontSize: getInPx(12),
    lineHeight: getInPx(14),
  },
  // Тултипчики
  h6: {
    fontSize: getInPx(12),
    lineHeight: getInPx(14),
  },

};

export default typography;
