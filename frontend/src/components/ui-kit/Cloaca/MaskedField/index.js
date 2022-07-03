import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Masked from 'react-text-mask';

import Field from '../Field';

class MaskedField extends Component {
    maskRef = React.createRef();
    fieldRef = React.createRef();

    // тяжело проверить нормализацию, придется допилить в рабочих условиях
    normalizeValue = () => {
        const masks = typeof this.props.mask === 'function' ? this.props.mask(this.props.value) : this.props.mask;
        const values = this.props.value.split('');

        const checkValueElement = (mask, index) => {
            if (typeof mask === 'string' && values[index] === mask) {
                values.splice(index, 1, 'deleted');
            }
        };
        masks.every(checkValueElement);
        this.normalValue = values.filter((char) => char !== this.props.placeholderChar && char !== 'deleted').join('');
    };

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.normalizeValue();
        }
    }

    defaultRender = (ref, props) => {
        return (
            <Field
                ref={(field) => {
                    ref(field ? field.inputRef.current : null);
                    this.fieldRef.current = field;
                }}
                {...props}
            />
        );
    };

    render() {
        const { inputRenderer, onChange: onChangeProp, ...rest } = this.props;
        const onChange = (e) => {
            e.persist();
            onChangeProp(e, this.normalValue);
        };
        return (
            <Masked
                ref={this.maskRef}
                {...rest}
                {...{ onChange }}
                render={inputRenderer ? inputRenderer : this.defaultRender}
            />
        );
    }
}

MaskedField.displayName = 'MaskedField';
MaskedField.propTypes = {
    ...Field.PropTypes,
    /** Defines value of component */
    value: PropTypes.string,
    /** Defines mask of component */
    mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
    /** Defines placeholder of component */
    placeholderChar: PropTypes.string,
    /** Defines whether mask should be shown */
    showMask: PropTypes.bool,
    /** When true, adding or deleting characters will not affect the positions of existing characters */
    keepCharPositions: PropTypes.bool,
    /** Defines type of component */
    type: PropTypes.oneOf(['text', 'tel', 'password', 'url', 'search']),
    /** Render function that recieves ref and props */
    inputRenderer: PropTypes.func
};
MaskedField.defaultProps = {
    ...Field.defaultProps,
    placeholderChar: '_',
    mask: [],
    showMask: true,
    keepCharPositions: false,
    autoComplete: 'off'
};

// не лучший вариант использования, но пока, видимо, пусть будет...
const withMask = (WrappedComponent, mask) => (
    <MaskedField mask={mask} inputRenderer={(ref, props) => <WrappedComponent ref={ref} {...props} />} />
);
export { withMask };

export default MaskedField;
