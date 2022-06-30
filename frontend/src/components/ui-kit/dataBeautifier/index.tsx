import React, { useState, useEffect } from 'react';

import JSONFormatter from 'json-formatter-js';

import './style.scss';
import { toJS } from 'mobx';

export interface BeautifierProps {
  /**
   * Входной JSON
   */
  data: string;
  /**
   * ref родителя куда необходимо вставить dataBeautifier
   */
  parentRef: React.RefObject<HTMLInputElement>;
}

export default function DataBeautifier(props: BeautifierProps) {
  const { data, parentRef } = props;

  const [propsData, setData] = useState<HTMLInputElement>();

  useEffect(() => {
    if (parentRef?.current && propsData) {
      parentRef.current.innerHTML = '';
      parentRef.current.appendChild(propsData);
    }
  }, [parentRef, propsData]);

  useEffect(() => {
    try {
      if (toJS(data)) {
        const Formatter = new JSONFormatter(JSON.parse(JSON.stringify(data)));

        setData(Formatter.render() as HTMLInputElement);
      }
    } catch (e) {
      console.warn('Incorrect JSON for dataBeautifier');
    }
  }, [data]);

  return null;
}
