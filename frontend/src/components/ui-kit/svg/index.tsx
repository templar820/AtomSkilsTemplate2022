import React, { useMemo, useState } from 'react';
import parse from 'html-react-parser';

export interface SvgIconProps {
  /**
   * Имя иконки. По данному имени ищется совпадение иконки в папке src/ui/svg/icons
   */
  name: string;
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

const iconString = (name) => {
  return require(`!raw-loader!../../../assets/icons/${name}.svg`).default;
};

export default (props: SvgIconProps) => {
  const { color } = props;
  const [isHovered, setHovered] = useState(false);

  const icon: string = useMemo(() => iconString(props.name), [props.name]);

  let width = props.width || props.height;
  let height = props.height || props.width;

  if (typeof width === 'number') {
    width = `${width}px`;
  }

  if (typeof height === 'number') {
    height = `${height}px`;
  }

  const size =
    width && height
      ? {
          width,
          height,
        }
      : {};

  const parsedIcon = useMemo(() => {
    return React.cloneElement(parse(icon.trim()), {
      className: `svg-icon ${props.className ? props.className : ''}`,
      ...size,
      fill: (isHovered && props.hoveredColor) || color || 'none',
      onMouseOver: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onClick: props.onClick,
    });
  }, [icon, props.className, props.color, isHovered]);

  return parsedIcon;
};

export { iconString };
