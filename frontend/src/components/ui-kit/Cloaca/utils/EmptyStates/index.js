import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { ColorsContext } from 'lib-root/colors';

import { StyledEmptyStates, StyledImageBox, StyledHeader, StyledText, StyledGreenCircle, ExtraIcon } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * Используется в качестве заглушки при отсутствующих данных для отображения.
 *
 * import { utils as utilsComponents } from 'core-lib-react/components';
 *
 * const { HighlightWrapper, LoaderComponent, EmptyStates, Portal, PortalWithState, withColors, AnimationTransition } = utilsComponents;
 */
const EmptyStates = React.forwardRef((props, ref) => {
    const { className, iconScheme, header, text, renderContent, customStyles, ...rest } = props;
    const colors = useContext(ColorsContext);

    return renderContent ? (
        renderContent({ ...props, ref })
    ) : (
        <StyledEmptyStates
            {...{ customStyles, ref, ...rest }}
            className={setClassName({ props: { className }, name: 'empty-states' })}>
            <StyledImageBox isSingleImage={!header && !text}>
                <StyledGreenCircle {...{ colors }} />
                <StyledGreenCircle {...{ colors }} />
                <ExtraIcon {...{ iconScheme, colors }} />
            </StyledImageBox>
            {header && <StyledHeader withoutText={!text}>{header}</StyledHeader>}
            {text && <StyledText>{text}</StyledText>}
        </StyledEmptyStates>
    );
});

EmptyStates.displayName = 'EmptyStates';
EmptyStates.propTypes = {
    /** Defines icon scheme */
    iconScheme: PropTypes.oneOf(['dandelion', 'net']),
    /** Defines custom styles for component */
    customStyles: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Defines header */
    header: PropTypes.string,
    /** Defines text */
    text: PropTypes.string,
    /** Defines content to be rendered */
    renderContent: PropTypes.node
};

EmptyStates.defaultProps = {
    iconScheme: 'dandelion',
    header: 'Нет данных',
    text: 'К сожалению, нам не удалось загрузить данные, попробуйте перезагрузить страницу'
};

export default EmptyStates;
