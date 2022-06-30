import React, { ReactNode } from 'react';
import Colors from '@colors';

interface MyTagProps {
  icon: ReactNode;
  backgroundColor?: typeof Colors;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  withoutBorder?: boolean
}

function MyTag(props: MyTagProps) {
  const size = 34;
  return (

    <div
      className={'d-flex flex-row br-16 justify-content-start ' + (props.className || '')}
      style={{
        background: props.backgroundColor,
        height: size,
        border: props.withoutBorder ? 'none' : '0.2px solid ' + Colors.secondaryText,
      }}
      onClick={() => {
        props.onClick && props.onClick();
      }}
    >
      {(props.icon !== undefined && props.icon !== null) && (
        <div
          className="br-16 h-100 d-flex justify-content-center align-items-center"
          style={{
            border: props.children && '0.2px solid ' + Colors.secondaryText,
            background: Colors.white,
            marginLeft: props.children && -1,
            minWidth: size,
          }}
        >
          {props.icon}
        </div>
      )}
      {props.children && (
        <div className="d-flex justify-content-end align-items-center mx-2">
          {props.children}
        </div>
      )}
    </div>
  );
}

export default MyTag;
