import React, { memo, useCallback, useContext } from 'react';
import { withProps } from 'hoc-with-props';

import Modal from 'lib-ui/Modal';
import { ResizeContext } from 'lib-root/resize';

import config from '../../config';

const usePickerChangeHandler = (setValues) =>
    useCallback(({ date, range = {}, time = [] }) => {
        const update = date instanceof Date ? { date } : time.length ? { date: time[0] } : range['range1'];
        setValues((prevValues) => ({ ...prevValues, ...update }));
    }, []);

const modalSettings = {
    type: 'normal',
    showHeader: false,
    showButtons: false,
    paperStyle: { maxWidth: '100%', width: 'auto', padding: '0' },
    bodyStyled: { padding: '0' },
    animationDuration: 300
};
const StyledModal = withProps(modalSettings)(Modal);

const DatePickerMemo = memo(({ type, values, setValues, ...props }) => {
    const { component: DatePicker, createPickerValue } = config.types[type];
    const onChange = usePickerChangeHandler(setValues);
    return <DatePicker {...{ ...props, ...createPickerValue(values), onChange }} />;
});

const Picker = memo(({ setIsOpen, ...rest }) => {
    const { width } = useContext(ResizeContext) || {};
    const closePicker = useCallback(() => setIsOpen(false), []);
    const datePicker = <DatePickerMemo {...{ ...rest, closePicker }} />;

    return width < 380 ? (
        <StyledModal isVisible={true} onClose={closePicker}>
            {datePicker}
        </StyledModal>
    ) : (
        datePicker
    );
});

export default Picker;
