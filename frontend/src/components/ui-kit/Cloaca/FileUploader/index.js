import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { setClassName } from 'lib-root/utils/styleMixins';

import { UploaderWrapper, ErrorWrapper, RetryButton, DeleteIcon, FilesWrapper } from './units';
import { DragShadow } from './DragShadow';
import { UploaderTitle } from './UploaderTitle';
import { UploaderFileItem } from './UploaderFileItem';
import { LoaderComponent } from 'lib-ui/utils';
import {
    getFileIdentity,
    getFiles,
    getSizeInBytes,
    removeFileDuplicates,
    getFileNameParts,
    reformatFileList
} from './utils';
import { mimeTypesDict } from './mimeTypesDict';
import { ColorsContext } from 'lib-root/colors';

/**
 * Компонент для загрузки файлов.
 */

const FileUploader = ({ styles = {}, onChange, ...props }) => {
    const {
        allowDrag,
        acceptedFileTypes,
        enableDragCursorShadow,
        customFileFilter,
        isLoading,
        items,
        title,
        errorText: propError,
        maxFiles,
        maxFileSize,
        onFileRemove,
        onUploadRetry,
        onError
    } = props;
    const {
        Wrapper: wrapperStyle,
        Title: titleStyle,
        ErrorMessage: errorStyle,
        FileItem: fileItemStyle,
        Shadow: shadowStyle
    } = styles;
    const [errorText, setErrorText] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const dragCounterRef = useRef(0);
    const isMultiple = maxFiles > 1;
    const noFiles = items.length === 0;
    const allFiles = items.length === maxFiles;

    const inputRef = useRef(null);
    const dropzoneRef = useRef(null);
    const filesWrapperRef = useRef(null);
    const openFileDialog = useCallback(
        (e) => {
            if (!allFiles && !filesWrapperRef.current.contains(e.target)) inputRef.current.click();
        },
        [allFiles]
    );
    const colors = useContext(ColorsContext);

    const acceptedMIMEs = useMemo(
        () =>
            acceptedFileTypes.map((mime) =>
                mime.match('/') ? mime : mimeTypesDict[mime.charAt(0) === '.' ? mime.slice(1) : mime]
            ),
        [acceptedFileTypes]
    );
    // Helpers
    const checkExtensions = useCallback(
        (files) => {
            const filteredExtensions = new Set();
            const _files = files.map((item) => {
                const itemType = item.file.type.split('/');
                const validExtension = acceptedMIMEs.some((mime) => {
                    const acceptAllOfType = mime.endsWith('/*');
                    if (acceptAllOfType) {
                        return itemType[0] === mime.split('/')[0];
                    } else {
                        return item.file.type === mime;
                    }
                });
                const { extension: exp } = getFileNameParts(item.file.name);
                if (!validExtension) filteredExtensions.add(exp === 'noExt' ? 'без расширения' : exp);
                return { ...item, validExtension: validExtension };
            });
            if (filteredExtensions.size > 0) {
                setErrorText(`Недопустимые типы файлов: ${[...filteredExtensions].join(', ')}`);
                onError && onError();
            } else {
                setErrorText('');
            }
            return _files;
        },
        [onError, acceptedMIMEs]
    );

    const checkFileSize = useCallback(
        (files) => {
            const { size, unit: _unit } = maxFileSize;
            let _files = files;
            if (size && _unit) {
                const sizeInBytes = getSizeInBytes(size, _unit.toLowerCase());
                let filteredFilesCount = 0;
                _files = files.map((item) => ({ ...item, validSize: item.file.size <= sizeInBytes }));
                if (filteredFilesCount) {
                    setErrorText(`Максимальный размер файла - ${size} ${_unit}`);
                    onError && onError();
                }
            }
            return _files;
        },
        [maxFileSize, onError]
    );

    // File list managing callbacks
    const updateFiles = useCallback(
        (fl) => {
            const f = Array.isArray(fl) ? fl : Array.from(fl);
            const formattedFiles = reformatFileList(f);
            let updatedFiles = removeFileDuplicates([...items, ...formattedFiles]);
            if (acceptedMIMEs.length) {
                updatedFiles = checkExtensions(updatedFiles);
            }
            if (maxFileSize) {
                updatedFiles = checkFileSize(updatedFiles);
            }
            if (customFileFilter) {
                updatedFiles = customFileFilter({ items: updatedFiles, setError: setErrorText });
            }
            updatedFiles = updatedFiles.slice(0, maxFiles);
            onChange && onChange({ items: updatedFiles, extras: { originalFiles: fl } });
        },
        [onChange, maxFiles, items, checkExtensions, acceptedMIMEs, checkFileSize, customFileFilter, maxFileSize]
    );

    const removeFile = useCallback(
        (id) => {
            let removedFile;
            const filteredFiles = items.filter(({ file }) => {
                const fileIdentity = getFileIdentity(file);
                if (fileIdentity === id) {
                    removedFile = file;
                    return false;
                }
                return true;
            });
            if (filteredFiles.length === 0) setErrorText('');
            onChange && onChange({ items: filteredFiles, removedFile });
            onFileRemove && onFileRemove({ items: filteredFiles, removedFile });
        },
        [items, onFileRemove, onChange]
    );

    // Render parts
    const renderFiles = useMemo(
        () =>
            items.map(({ file, error, isRetrying, ...rest }) => {
                return (
                    <UploaderFileItem
                        key={getFileIdentity(file)}
                        className={setClassName({ name: 'file-uploader__file' })}
                        deleteIcon={
                            <DeleteIcon
                                className={setClassName({ name: 'file-uploader__delete-button' })}
                                onClick={() => {
                                    removeFile(getFileIdentity(file));
                                }}
                            />
                        }
                        retryIcon={
                            <RetryButton
                                className={setClassName({ name: 'file-uploader__retry-button' })}
                                {...{
                                    isRetrying,
                                    onClick: () => {
                                        if (!isRetrying) {
                                            onUploadRetry && onUploadRetry({ file, error, isRetrying, ...rest });
                                        }
                                    }
                                }}
                            />
                        }
                        {...{
                            fileName: getFileNameParts(file.name),
                            fileItemStyle,
                            isMultiple,
                            errorText: error,
                            ...rest
                        }}
                    />
                );
            }),
        [items, removeFile, fileItemStyle, isMultiple, onUploadRetry]
    );
    const handleDragEvent = useCallback(
        (e) => {
            e.preventDefault();
            switch (e.type) {
                // Using ref value to detect if dragging or not, because dragleave event
                // fires after each dragenter that makes shadow and border blink.
                // If ref value is greater that zero, drag is active, is lower - is not.
                // isDragging states that causes rerender updates only when necessary
                case 'dragenter':
                    dragCounterRef.current = dragCounterRef.current + 1;
                    if (dragCounterRef.current > 0) {
                        setIsDragging(true);
                    }
                    break;
                case 'dragleave':
                    dragCounterRef.current = dragCounterRef.current - 1;
                    if (dragCounterRef.current <= 0) {
                        setIsDragging(false);
                    }
                    break;
                case 'drop':
                    if (e.dataTransfer && e.dataTransfer.files) {
                        getFiles(e.dataTransfer).then(updateFiles);
                    }
                    dragCounterRef.current = 0;
                    setIsDragging(false);
                    break;
                default:
                    break;
            }
        },
        [updateFiles, dragCounterRef]
    );

    return (
        <UploaderWrapper
            {...{
                ...props,
                colors,
                noFiles,
                allFiles,
                isDragging,
                wrapperStyle,
                onClick: openFileDialog,
                ref: dropzoneRef,
                onDrop: handleDragEvent,
                onDragEnter: handleDragEvent,
                onDragLeave: handleDragEvent
            }}
            className={setClassName({ name: 'file-uploader__wrapper' })}>
            <UploaderTitle
                {...{ allowDrag, title, titleStyle, allFiles, noFiles, maxFiles, isMultiple }}
                className={setClassName({ name: 'file-uploader__title' })}
            />
            <input
                className={setClassName({ name: 'file-uploader__input-element' })}
                type="file"
                multiple={isMultiple}
                ref={inputRef}
                accept={acceptedMIMEs.join(', ')}
                onChange={(e) => updateFiles(e.target.files)}
            />
            <FilesWrapper ref={filesWrapperRef}>{renderFiles}</FilesWrapper>
            <ErrorWrapper {...{ errorStyle }} className={setClassName({ name: 'file-uploader__error' })}>
                {propError || errorText}
            </ErrorWrapper>
            <LoaderComponent isLoading={isLoading} />
            {enableDragCursorShadow && isDragging && (
                <DragShadow
                    role="presentation"
                    className={setClassName({ name: 'file-uploader__shadow' })}
                    {...{ shadowStyle, dropzoneRef }}
                />
            )}
        </UploaderWrapper>
    );
};

FileUploader.displayName = 'FileUploader';
FileUploader.propTypes = {
    // If true, user will be able to select files to upload by dragging. Defaults to `true`.
    allowDrag: PropTypes.bool,
    // Array of MIME-types (preferable) or extensions (with or without prefix dot) that are valid for uploading.
    // Extensions are being converted to required by component MIME-types only for popular extensions.
    // If you plan to work with files of non-standard types, please specify MIME-type.
    acceptedFileTypes: PropTypes.arrayOf(PropTypes.string),
    // Custom function that is used to check files on update.
    // Accepts list of files and method to setError in component as an argument. Must return array of files
    customFileFilter: PropTypes.func,
    // If passed, will be shown in error block, ignoring default errors
    errorText: PropTypes.string,
    // If true, renders additional shadow below cursor and file within component's wrapper
    enableDragCursorShadow: PropTypes.bool,
    // Loading state. If true, will show default lib loader within uploader borders.
    isLoading: PropTypes.bool,
    // Array of items that will be shown in fileUploader, is used to control component state
    items: PropTypes.arrayOf(PropTypes.object),
    // Maximum number of files that can be uploaded at once. Defaults to `1`.
    maxFiles: PropTypes.number,
    // Maximum file size.
    maxFileSize: PropTypes.shape({
        /** Start of preview */
        size: PropTypes.number,
        /** Measure unit */
        unit: PropTypes.oneOf(['b', 'kb', 'mb'])
    }),
    // Element that will be rendered as an invitation to upload files
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    // Callback fires when file list is changed. Accepts object with processed and original files
    onChange: PropTypes.func,
    // Callback fires when file is removed from list.
    // Accepts object with array of filtered files and value of removed one
    onFileRemove: PropTypes.func,
    // Callback fires when user clicks retry button. Accepts clicked file as an argument
    onUploadRetry: PropTypes.func,
    // Callback fires when file list update caused errors
    onError: PropTypes.func,
    /** Styling object for wrapper, title, file item and error message */
    styles: PropTypes.shape({
        Title: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        Wrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        FileItem: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        ErrorMessage: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
        Shadow: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string])
    })
};
FileUploader.defaultProps = {
    allowDrag: true,
    maxFiles: 3,
    enableDragCursorShadow: true,
    acceptedFileTypes: [],
    items: []
};

export default FileUploader;
