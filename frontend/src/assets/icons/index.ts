import React, {
  useCallback, useEffect, useMemo, useState
} from 'react';
import parse from 'html-react-parser';
import { svgNamesType } from './svgNames';

export interface SvgIconProps {
  /**
   * Имя иконки. По данному имени ищется совпадение иконки в папке src/ui/svg/icons
   */
  name: svgNamesType;
  /**
   * Возможность прокидывать классы в SvgIcon. Пример className: 'first-class second-class'
   */
  className?: string;
  width?: string | number;
  height?: string | number;
  onClick?: () => void;
  hoveredColor?: string;
  color?: string;
}

export default (props: SvgIconProps) => {
  const { color } = props;
  const [isHovered, setHovered] = useState(false);
  const [icon, setIcon] = useState(null);

  const iconString = useCallback(async (name) => {
    const url = await import(`./${name}.svg`);
    const data = await (await fetch(url.default)).text();
    setIcon(data);
  }, [icon]);

  useEffect(() => {
    iconString(props.name);
  }, []);

  let width = props.width || props.height;
  let height = props.height || props.width;

  if (typeof width === 'number') {
    width = `${width}px`;
  }

  if (typeof height === 'number') {
    height = `${height}px`;
  }

  const size = width && height
    ? {
      width,
      height,
    }
    : {};

  const parsedIcon = useMemo(() => {
    if (!icon) return null;
    return React.cloneElement(parse(icon.trim()), {
      className: `svg-icon ${props.className ? props.className : ''}`,
      ...size,
      fill: (isHovered && props.hoveredColor) || color || 'none',
      onMouseOver: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    });
  }, [icon, props.className, props.color, isHovered]);

  return parsedIcon;
};
