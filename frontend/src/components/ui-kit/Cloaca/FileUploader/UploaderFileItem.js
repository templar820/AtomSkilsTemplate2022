import React from 'react';
import { StyledFileItemWrapper, StyledFileItemDescriptionBlock, StyledFileErrorText, StyledFileName } from './units';

export const UploaderFileItem = ({
    fileName,
    deleteIcon,
    retryIcon,
    fileItemStyle,
    errorText,
    isMultiple,
    ...rest
}) => {
    return (
        <StyledFileItemWrapper {...{ fileItemStyle, errorText, isMultiple, ...rest }}>
            <StyledFileItemDescriptionBlock {...{ errorText }}>
                {errorText && retryIcon}
                <StyledFileName title={fileName.initial}>{fileName.name}</StyledFileName>.{fileName.extension}
            </StyledFileItemDescriptionBlock>
            <StyledFileItemDescriptionBlock {...{ errorText }}>
                <StyledFileErrorText>{errorText}</StyledFileErrorText>
                {deleteIcon}
            </StyledFileItemDescriptionBlock>
        </StyledFileItemWrapper>
    );
};
