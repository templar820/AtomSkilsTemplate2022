import React, { useContext, useMemo } from 'react';

import { ColorsContext } from 'lib-root/colors';

import Checkbox from 'lib-ui/Checkbox';
import { HighlightWrapper } from 'lib-ui/utils';
import {
    calcCheckboxStyle,
    calcCheckboxSquareStyle,
    calcCheckboxCaptionStyle,
    StyledCheckboxText,
    defaultHighlight
} from './units';

function TextAndCheckbox({
    occurrence,
    highlight,
    title: _title,
    isCheckable,
    checked,
    selection,
    handleChecking,
    id,
    checkboxStyle,
    checkboxSquareStyle,
    checkboxCaptionStyle,
    addTitlesAttrs
}) {
    const title = useMemo(() => {
        if (typeof _title === 'function') return _title({ occurrence });
        return _title;
    }, [_title, occurrence]);
    const colors = useContext(ColorsContext);
    const textWithHighlight = occurrence ? (
        <HighlightWrapper {...{ occurrence, highlight: defaultHighlight({ colors, highlight }) }}>
            {title}
        </HighlightWrapper>
    ) : (
        title
    );
    const browserTitle = addTitlesAttrs && typeof title === 'string' ? title : undefined;
    const styledText = (
        <StyledCheckboxText {...{ selection }} title={browserTitle}>
            {textWithHighlight}
        </StyledCheckboxText>
    );

    return !isCheckable ? (
        styledText
    ) : (
        <Checkbox
            onCheckChange={() => handleChecking({ [id]: checked !== true })}
            css={calcCheckboxStyle(checkboxStyle)}
            squareStyle={calcCheckboxSquareStyle(colors, checkboxSquareStyle, selection, checked)}
            captionStyle={calcCheckboxCaptionStyle(checkboxCaptionStyle)}
            checked={checked}>
            {styledText}
        </Checkbox>
    );
}

export default TextAndCheckbox;
