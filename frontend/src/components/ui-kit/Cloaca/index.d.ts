import * as React from 'react';

import { SerializedStyles } from '@emotion/core';

// Here are some common extra types
export type CustomRenderType<T = any> = React.ReactNode | ((props: T) => React.ReactNode);

export type PopperPlacementType =
    | 'auto'
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'auto-start'
    | 'auto-end'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end';

export type EmotionStylesType<T = object> =
    | React.CSSProperties
    | SerializedStyles
    | string
    | ((props?: T) => React.CSSProperties | SerializedStyles | string);

export type ColorsType = { [key: string]: string };

export type TransitionStateType = 'entered' | 'exiting' | 'exited' | 'entering';

export type DatePickerRangeShape = {
    /** Start date of range */
    startDate?: object;
    /** End date of range */
    endDate?: object;
    /** Specific color for current range */
    color?: string;
    /** Key for range to search and rerender */
    key?: string;
    /** if true then calendar focused on this range */
    autoFocus?: boolean;
    /** If true when current range can't move and can't be changed */
    disabled?: boolean;
    /** If true when current inputs of ranges not showing */
    showDateDisplay?: boolean;
};

export type DatePickerPreview = {
    /** Start of preview */
    startDate?: object | number;
    /** End of preview */
    endDate?: object | number;
};

export type TimePanelCall = (obj: {
    event: React.MouseEvent;
    day: object;
    displayMode: 'dateRange' | 'date';
    date: object;
    ranges: Array<object>;
}) => void;

// Here are components exports

import * as Accordion from './Accordion';
import AuthorizationForm from './AuthorizationForm';
import BackToTop from './BackToTop';
import Badge from './Badge';
import BreadCrumbs from './BreadCrumbs';
import Button from './Button';
import Checkbox from './Checkbox';
import Chips from './Chips';
import Curtain from './Curtain';
import * as DatePicker from './DatePicker';
import DatePickerField from './DatePickerField';
import Drawer from './Drawer';
import * as Dropdown from './Dropdown';
import Field from './Field';
import FileUploader from './FileUploader';
import * as Grid from './Grid';
import InlineIcons from './InlineIcons';
import Logotype from './Logotype';
import MaskedField from './MaskedField';
import Menu from './Menu';
import Modal from './Modal';
import * as Navigation from './Navigation';
import * as Notification from './Notification';
import Paginator from './Paginator';
import Paper from './Paper';
import * as Progress from './Progress';
import Radio from './Radio';
import SearchFilter from './SearchFilter';
import SearchFilterDropdown from './SearchFilterDropdown';
import Select from './Select';
import SideMenu from './SideMenu';
import Slider from './Slider';
import Spinner from './Spinner';
import Switch from './Switch';
import * as Table from 'lib-ui/Table';
import * as Tabs from './Tabs';
import * as TimeLine from './TimeLine';
import Tooltip from './Tooltip';
import TooltipConfirm from './TooltipConfirm';
import * as Tree from './Tree';
import * as Utils from './utils';

export {
    Accordion,
    AuthorizationForm,
    BackToTop,
    Badge,
    BreadCrumbs,
    Button,
    Checkbox,
    Chips,
    Curtain,
    DatePicker,
    DatePickerField,
    Drawer,
    Dropdown,
    Field,
    FileUploader,
    Grid,
    InlineIcons,
    Logotype,
    MaskedField,
    Menu,
    Modal,
    Navigation,
    Notification,
    Paginator,
    Paper,
    Progress,
    Radio,
    SearchFilter,
    SearchFilterDropdown,
    Select,
    SideMenu,
    Slider,
    Spinner,
    Switch,
    Table,
    Tabs,
    TimeLine,
    Tooltip,
    TooltipConfirm,
    Tree,
    Utils
};
