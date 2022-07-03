import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { ColorsContext } from 'lib-root/colors';
import { setClassName } from 'lib-root/utils/styleMixins';

import { tabTemplates } from './utils';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledTab = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-size: 15px;
    cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
    user-select: none;
    &[disabled] {
        cursor: default;
        pointer-events: none;
        opacity: 0.25;
    }
    ${({ colors, template, tabTemplateConfig, isActive }) => {
        if (typeof tabTemplates[template] === 'undefined') template = 'custom';
        return tabTemplates[template]({ colors, isActive, tabTemplateConfig });
    }};
    ${({ css: _css, ...restProps }) => applyEmotionStyle(_css, restProps)};
`;

const Tab = React.forwardRef(({ className, handleTabChange, setActiveRef, isActive, ...otherProps }, ref) => {
    const colors = useContext(ColorsContext);

    const handleRefSetting = useCallback(
        (el) => {
            if (isActive) setActiveRef(el);
            if (ref) typeof ref === 'function' ? ref(el) : (ref.current = el);
        },
        [isActive]
    );

    return (
        <StyledTab
            ref={handleRefSetting}
            onClick={handleTabChange}
            {...{ colors, isActive, ...otherProps }}
            className={setClassName({ props: { className }, name: 'tab' })}
        />
    );
});

Tab.displayName = 'Tab';
Tab.propTypes = {
    /** Defines tab */
    tab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Defines additional className */
    className: PropTypes.string,
    /** Defines whether component is disabled */
    disabled: PropTypes.bool,
    /** Defines component's additional css */
    css: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
};

export default Tab;
