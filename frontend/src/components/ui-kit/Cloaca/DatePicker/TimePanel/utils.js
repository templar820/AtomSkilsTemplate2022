import { debounce } from 'lib-root/utils';

const FOCUSED_ELEMENT_NAME = ['prevArrow', 'nextArrow', 'hours', 'minutes', 'seconds'];

const timePanelElementChoiceFunc = ({ elementNum, setElementNum }) => ({
    event,
    focusedPicker,
    onArrowClick,
    timeValues,
    visiblePickers,
    prev,
    next
}) => {
    if (event.nativeEvent.code === 'ArrowRight' && elementNum <= 3) {
        debounce(() => setElementNum(elementNum + 1), 50)();
    }
    if (event.nativeEvent.code === 'ArrowLeft' && elementNum >= 1) {
        debounce(() => setElementNum(elementNum - 1), 50)();
    }
    if (event.nativeEvent.code === 'Enter') {
        prev && focusedPicker > 0 && onArrowClick({ direction: 'left' });

        next && focusedPicker < timeValues.length - visiblePickers && onArrowClick({ direction: 'right' });
    }
};

const onFocusElementFunc = ({ setElementNum }) => ({ elNum }) => {
    setElementNum(elNum);
};

export { timePanelElementChoiceFunc, onFocusElementFunc, FOCUSED_ELEMENT_NAME };
