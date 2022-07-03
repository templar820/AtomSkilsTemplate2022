import React from 'react';
import { StyledTitle, StyledSubtitle, StyledTitleHighlight } from './units';
import { declension } from 'lib-root/utils';

const maxFilesDesc = (maxFiles) => {
    return `${maxFiles} ${declension(maxFiles, [
        'файл',
        'файла',
        'файлов'
    ])} максимальное количество файлов для загрузки`;
};

const defaultWithDragTitle = (isMultiple, maxFiles, allFiles) => (
    <>
        Переместите {isMultiple ? 'файлы' : 'файл'} сюда или{' '}
        <StyledTitleHighlight {...{ allFiles }}>выберите...</StyledTitleHighlight>
        {isMultiple && <StyledSubtitle>{maxFilesDesc(maxFiles)}</StyledSubtitle>}
    </>
);

const defaultWithoutDragTitle = (isMultiple, maxFiles, allFiles) => (
    <>
        <StyledTitleHighlight {...{ allFiles }}>Выберите {isMultiple ? 'файлы' : 'файл'}...</StyledTitleHighlight>
        {isMultiple && <StyledSubtitle>{maxFilesDesc(maxFiles)}</StyledSubtitle>}
    </>
);

const resolveTitle = ({ isMultiple, maxFiles, allFiles, allowDrag }) => {
    if (!isMultiple && allFiles) {
        return '';
    }
    return allowDrag
        ? defaultWithDragTitle(isMultiple, maxFiles, allFiles)
        : defaultWithoutDragTitle(isMultiple, maxFiles, allFiles);
};

export const UploaderTitle = ({ allowDrag, noFiles, allFiles, title, maxFiles, titleStyle, isMultiple }) => {
    const titleContent = title || resolveTitle({ isMultiple, maxFiles, allFiles, allowDrag });
    return <StyledTitle {...{ noFiles, allFiles, titleStyle, isMultiple }}>{titleContent}</StyledTitle>;
};
