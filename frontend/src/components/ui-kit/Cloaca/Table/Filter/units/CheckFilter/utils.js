const createOnCheckHandler = ({
    updateFilter,
    filterOnOptionPick,
    revertOnCancel,
    uniques,
    setValue,
    onChange,
    customRender
}) => (id) => {
    if (customRender && typeof onChange === 'function') return onChange(id);

    setValue((prevValue = uniques) => {
        const value = prevValue.includes(id) ? prevValue.filter((item) => item !== id) : [...prevValue, id];
        filterOnOptionPick && updateFilter(value, revertOnCancel);
        return value;
    });
};

const createOnOkHandler = ({ updateFilter, value, closeOnOk, onOk }) => ({ setIsOpenMain }) => {
    if (typeof onOk === 'function') onOk({ value });
    updateFilter(value, false);
    closeOnOk && setIsOpenMain(false);
};

const createOnCancelHandler = ({ updateFilter, revertOnCancel, closeOnCancel, stableFilter, onCancel }) => ({
    setIsOpenMain
}) => {
    if (typeof onCancel === 'function') onCancel();
    if (revertOnCancel) updateFilter(stableFilter.current);
    if (closeOnCancel) setIsOpenMain(false);
};

export { createOnCheckHandler, createOnCancelHandler, createOnOkHandler };
