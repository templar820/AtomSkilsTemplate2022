const createOnChangeHandler = ({ updateFilter, filterOnOptionPick, revertOnCancel, setValue, value }) => (values) => {
    const newValue = values.length ? values[0].label : undefined;
    if (newValue !== value) {
        setValue(newValue);
        filterOnOptionPick && updateFilter(newValue, revertOnCancel);
    }
};

const createOnOkHandler = ({ updateFilter, value, closeOnOk, onOk }) => (e, dropdownControls = {}, meta) => {
    if (typeof onOk === 'function') onOk({ value, meta });
    updateFilter(value, false);
    closeOnOk && dropdownControls.setIsOpenMain && dropdownControls.setIsOpenMain(false);
};

const createClearAllHandler = ({ updateFilter, revertOnCancel, closeOnCancel, stableFilter, onCancel }) => (
    e,
    dropdownControls = {}
) => {
    if (typeof onCancel === 'function') onCancel();
    if (revertOnCancel) {
        updateFilter(stableFilter.current);
        closeOnCancel && dropdownControls.setIsOpenMain && dropdownControls.setIsOpenMain(false);
    }
};

const createOnSearchChangeHandler = ({ updateFilter, filterOnType, revertOnCancel, setValue }) => ({}, { search }) => {
    setValue(search);
    filterOnType && updateFilter(search, revertOnCancel);
};

const getDropdownSettings = (showDropdown) =>
    !showDropdown
        ? {
              dropdownProps: {
                  css: { display: 'none' }
              },
              dropdownRenderer: () => null
          }
        : {};

export {
    createClearAllHandler,
    createOnChangeHandler,
    createOnOkHandler,
    createOnSearchChangeHandler,
    getDropdownSettings
};
