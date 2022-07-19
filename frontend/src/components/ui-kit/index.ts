/* eslint-disable no-multi-spaces */
// CORE
export {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  Link as MuiLink,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popper,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Switch as MuiSwitch,
  Tab,
  Tabs,
  TextField,
  Tooltip as MaterialTooltip,
  Typography,
  createTheme,
} from '@mui/material';

// ICONS
export {
  PlusOne as PlusOneIcon,
  Star as StarIcon,
  MoreVert as MoreVertIcon,
  CompareArrows as CompareArrowsIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  AccountCircle as AccountCircleIcon,
  Add as AddIcon,
  Link as LinkIcon,
  FolderOpen as FolderOpenIcon,
  GetApp as GetAppIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Menu as MenuIcon,
  Remove as RemoveIcon,
  Fullscreen as FullscreenIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayArrowIcon,
  BugReport as BugReportIcon,
  Visibility as VisibilityIcon,
  HelpOutline as HelpOutlineIcon,
  ExpandMore as ExpandMoreIcon,
  FileCopy as FileCopyIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  FilterList as FilterListIcon,
  Settings as SettingsIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  FullscreenExit as FullscreenExitIcon,
  Error as MyErrorIcon,
  Warning as WarningIcon,
  MenuBook as MenuBookIcon,
  VpnKey as VpnKeyIcon,
  Done as DoneIcon,
} from '@mui/icons-material';

export { makeStyles, withStyles, ThemeProvider } from '@mui/styles';

export { ErrorIcon } from './icons';

// ROUTER
export { Link, Switch, Route } from 'react-router-dom';

// WITH PARAMS
export * from './dialog';
export { Alert } from './alert';
export * from './popupMenu';
export * from './autocomplete';
export * from './chips';
export * from './table';

// REACT ICONS
// export { DiJavascript1, DiCss3Full, DiHtml5, DiReact } from 'react-icons/di';

// REACT ICONS
// export {
//   AiOutlineFile,
//   AiOutlineFileText,
//   AiOutlineFolderAdd,
//   AiOutlineFileAdd,
//   AiOutlineDelete,
//   AiOutlineEdit,
//   AiTwotoneFolder,
//   AiTwotoneFolderOpen,
//   AiFillDiff,
//   AiOutlineMore,
// } from 'react-icons/ai';

// COLORS...
export { green, grey } from '@mui/material/colors';

// LAB
export {
  Autocomplete,
  TreeView,
  TreeItem, // Alert
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/lab';

export { default as SvgIcons } from './svg';

export { default as DataBeautifier } from './dataBeautifier';

export { default as Tooltip } from './tooltip';

export { default as StyledCheckbox } from './checkbox';
