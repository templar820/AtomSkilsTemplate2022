import * as React from 'react';
import { EmotionStylesType } from 'lib-ui';

interface MaxFileSize {
    size: number;
    /** Measure unit */
    unit: 'b' | 'kb' | 'mb';
}

interface UploaderItem {
    file: File;
    isRetrying?: boolean;
    validExtension?: boolean;
    validSize?: boolean;
    error?: string;
}

interface UploaderItemList {
    items: UploaderItem[];
    extras?: { originalFiles: FileList | File[] };
}

export interface FileUploaderProps {
    // If true, user will be able to select files to upload by dragging. Defaults to `true`.
    allowDrag?: boolean;
    // Array of MIME-types (preferable) or extensions (with or without prefix dot) that are valid for uploading.
    // Extensions are being converted to required by component MIME-types only for popular extensions.
    // If you plan to work with files of non-standard types, please specify MIME-type.
    acceptedFileTypes?: Array<
        | 'image/png'
        | 'application/pdf'
        | 'text/plain'
        | 'text/csv'
        | 'application/json'
        | 'image/*'
        | 'video/*'
        | 'audio/*'
        | 'text/*'
        | 'application/*'
        | 'png'
        | 'jpg'
        | 'csv'
        | 'pdf'
        | string
    >;
    // Custom function that is used to check files on update.
    // Accepts list of files and method to setError in component as an argument. Must return array of files
    customFileFilter?: ({ items, setError }: { items: UploaderItem[]; setError: () => void }) => UploaderItem[];
    // If passed, will be shown in error block, ignoring default errors
    errorText?: string;
    // If true, renders additional shadow below cursor and file within component's wrapper
    enableDragCursorShadow?: boolean;
    // Loading state. If true, will show default lib loader within uploader borders.
    isLoading?: boolean;
    // Array of items that will be shown in fileUploader, is used to control component state
    items?: UploaderItem[];
    // Maximum number of files that can be uploaded at once. Defaults to `1`.
    maxFiles?: number;
    // Maximum file size.
    maxFileSize?: MaxFileSize;
    // Element that will be rendered as an invitation to upload files
    title?: React.ReactNode;
    // Callback fires when file list is changed. Accepts object with processed and original files
    onChange?: (items: UploaderItemList) => void;
    // Callback fires when file is removed from list.
    // Accepts object with array of filtered files and value of removed one
    onFileRemove?: (props: { items: UploaderItemList; removedFile: UploaderItem }) => void;
    // Callback fires when user clicks retry button. Accepts clicked file as an argument
    onUploadRetry?: (file: UploaderItem) => void;
    // Callback fires when file list update caused errors
    onError?: () => void;
    /** Styling object for wrapper, title, file item and error message */
    styles?: {
        Title?: EmotionStylesType;
        Wrapper?: EmotionStylesType;
        FileItem?: EmotionStylesType;
        ErrorMessage?: EmotionStylesType;
        Shadow?: EmotionStylesType;
    };
}

declare const FileUploader: React.ComponentType<FileUploaderProps>;

export default FileUploader;
