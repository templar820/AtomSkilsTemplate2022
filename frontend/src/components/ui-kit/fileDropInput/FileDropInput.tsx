import React, { useEffect, useState } from 'react';
import { Button, SvgIcons } from 'ui-kit';

import './FileDropInput.scss';
import { Typography } from '@mui/material';
import formatFileSize from './formatFileSize';
import checkFile from './checkFile';

const FileDropInput: React.FC<{
  text?: string;
  multiple?: boolean;
  extensions?: string[];
  handleDrop?: (files: File[]) => void;
  error: string;
}> = (props) => {
  const dropRef = React.createRef<HTMLDivElement>();
  let dragCounter = 0;

  const [dragging, setDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const div = dropRef.current;

    if (div) {
      div.addEventListener('dragenter', handleDragIn);
      div.addEventListener('dragleave', handleDragOut);
      div.addEventListener('dragover', handleDrag);
      div.addEventListener('drop', handleDrop);
    }

    return () => {
      if (div) {
        div.removeEventListener('dragenter', handleDragIn);
        div.removeEventListener('dragleave', handleDragOut);
        div.removeEventListener('dragover', handleDrag);
        div.removeEventListener('drop', handleDrop);
      }
    };
  }, []);

  const filterFilesByExtensions = (addingFiles: File[]): File[] => {
    if (!props.extensions) {
      return addingFiles;
    }

    return addingFiles.filter((file) => props.extensions.includes(checkFile(file.name)));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;
    if (dragCounter === 0) {
      setDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (!e.dataTransfer.files) return;

    let addingFiles: File[] = props.multiple
      ? Array.from(e.dataTransfer.files)
      : [e.dataTransfer.files[0]];
    addingFiles = filterFilesByExtensions(addingFiles);

    if (addingFiles.length > 0) {
      if (props.handleDrop) {
        props.handleDrop(addingFiles);
      }
      setFiles(addingFiles);
      e.dataTransfer.clearData();
      dragCounter = 0;
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.target.files) return;

    const addingFiles = Array.from(e.target.files);

    if (props.handleDrop) {
      props.handleDrop(addingFiles);
    }

    setFiles(addingFiles);
  };


  const accept = props.extensions?.map((ext) => `.${ext}`).join(',');
  const text = props.text || t('commonComponents:fileDropInput.text');

  return (
    <div className="FileDropInput" ref={dropRef}>
      <div className={`FileDropInput-area ${dragging && 'dragging'}`}>
        <SvgIcons className="mr-16" name="file-large" />

        <Typography variant="button" color="textSecondary" component="p">
          {dragging ? t('commonComponents:fileDropInput.ondrag') : text}
        </Typography>
        <Button
          className="ml-16 flex-shrink-0"
          variant="outlined"
          color="primary"
          component="label"
        >
          {t('commonComponents:fileDropInput.browse')}
          <input
            type="file"
            hidden
            accept={accept}
            multiple={props.multiple}
            onChange={onChangeFile}
          />
        </Button>
      </div>
      <div className="FileDropInput-list">
        {files.map((file: File) => (
          <div className="FileDropInput-list__item d-flex flex-row">
            <SvgIcons className="mr-8" name="zipProject" />
            <div>
              <Typography variant="button" color="gray9" component="p">
                {file.name}
              </Typography>

              {props.error ? (
                <span className="error">{props.error}</span>
              ) : (
                <Typography variant="caption" color="disabledText" component="p">
                  {formatFileSize(file.size)}
                </Typography>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileDropInput;
