const handlePlaceHolder = (props, state) => {
    const { addPlaceholder, searchPlaceholder, create, isSearchable, placeholder, multi, isValuesControlled } = props;
    const noValues = isValuesControlled
        ? props.values && props.values.length === 0
        : state.values && state.values.length === 0;
    const hasValues = isValuesControlled
        ? props.values && props.values.length > 0
        : state.values && state.values.length > 0;

    if (hasValues && multi && ((searchPlaceholder && isSearchable) || (addPlaceholder && create))) {
        return isSearchable
            ? create
                ? searchPlaceholder + ' или ' + addPlaceholder.toLowerCase()
                : searchPlaceholder
            : addPlaceholder;
    }

    if (noValues) {
        return placeholder;
    }

    return '';
};

const valueExistInSelected = (search, options, { props, state, methods } = {}) =>
    props.valueExistFn
        ? props.valueExistFn(search, options, { props, state, methods })
        : !!options.find((val) => val[props['labelField']].toString() === search.toString());

const getOptionsFromChecked = (options = [], checked) =>
    options.reduce(
        (result, option) => [
            ...result,
            ...(checked[option.value] ? [option] : getOptionsFromChecked(option.childNodes, checked))
        ],
        []
    );

export { handlePlaceHolder, valueExistInSelected, getOptionsFromChecked };
