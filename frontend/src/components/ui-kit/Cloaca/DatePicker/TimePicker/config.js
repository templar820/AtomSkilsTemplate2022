import { setHours, setMinutes, setSeconds } from 'date-fns';

// in px
const ITEM_HEIGHT = 50;

const methodsDict = {
    hours: setHours,
    minutes: setMinutes,
    seconds: setSeconds
};

const HOURS_COUNT = 24;
const MINUTES_LENGTH = 60;
const SECONDS_LENGTH = 60;

export { ITEM_HEIGHT, methodsDict, HOURS_COUNT, MINUTES_LENGTH, SECONDS_LENGTH };
