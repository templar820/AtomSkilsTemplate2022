import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { setClassName } from 'lib-root/utils/styleMixins';
import Collapse from '../Collapse';
import { StyledAccordionWrapper } from '../units';

/**
 * `Accordion` – это компонент для развертывания и скрытия информации на странице.
 *
 * import { Accordion as AccordionComponents } from 'core-lib-react/components';
 *
 * const { Accordion, Collapse } = AccordionComponents;
 */
const Accordion = (props) => {
    const { isOpen, children, selectedItem, closeAll, wrapperStyle, ...restProps } = props;
    const [currentExpandChild, setCurrentExpandChild] = useState(selectedItem !== undefined ? selectedItem : undefined);

    const onClick = (childKey) => {
        childKey === currentExpandChild ? setCurrentExpandChild(undefined) : setCurrentExpandChild(childKey);
    };

    const expanderFunc = (index) => {
        if (currentExpandChild === undefined) return false;

        return currentExpandChild === index;
    };

    const newChildren = isOpen
        ? React.Children.map(children, (child, index) => {
              return React.cloneElement(child, {
                  isOpen,
                  expanded: closeAll ? false : expanderFunc(index),
                  onClick,
                  childKey: index,
                  ...child.props
              });
          })
        : children;

    return (
        <StyledAccordionWrapper {...props} className={setClassName({ props: restProps, name: 'accordion' })}>
            {newChildren}
        </StyledAccordionWrapper>
    );
};

Accordion.displayName = 'Accordion';
Accordion.propTypes = {
    /** For closing siblings */
    isOpen: PropTypes.bool,
    /** Default expand collapse */
    selectedItem: PropTypes.number,
    /** For children */
    children: PropTypes.node.isRequired,
    /** Close all collapses from outside */
    closeAll: PropTypes.bool,
    /** Emotion styles for Accordion div wrapper */
    wrapperStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};

Accordion.defaultProps = {
    isOpen: true,
    children: (
        <Collapse isLoading={false} title={'Accordion without childs'}>
            {}
        </Collapse>
    ),
    closeAll: false
};

export default Accordion;
