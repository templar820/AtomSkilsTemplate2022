import React, { useCallback, useEffect, useRef, useState } from 'react';
import Colors from '@colors';
import './styles.scss';
import { Typography } from '@mui/material';
import useObserver from '@hooks/useObserver';
import { getMarginX, getSummaryShowingWidth } from './utils';

const Chips: React.FC = (props): JSX.Element => {
  const { children } = props;

  const [toggleChipText, setToggleChipText] = useState(false);
  const [previousHideState, setPreviousHideState] = useState([]);
  const [hiddenChips, setHiddenChips] = useState([]);
  const parentRef = useRef(null);
  const childRef = useRef([]);

  const handleToggleChips = () => {
    if (!toggleChipText) {
      setPreviousHideState([...hiddenChips]);
    } else {
      setHiddenChips([...previousHideState]);
    }
    setToggleChipText(!toggleChipText);
  };

  const resizeResolver = useCallback(() => {
    const { y, width } = parentRef.current?.getBoundingClientRect() || {};
    if (!y || !width) return;
    if (toggleChipText) {
      setPreviousHideState(hiddenChips);
      setHiddenChips([]);
      return;
    }

    childRef.current.forEach((i) => {
      const { y: childY, width: childWidth } = i.getBoundingClientRect();
      const marginX = getMarginX(i);
      const opt = hiddenChips.find((el) => el.id === i.id);
      if (childY !== y && !opt && !toggleChipText) {
        hiddenChips.push({
          id: i.id,
          width: childWidth,
          marginX,
        });
        setHiddenChips([...hiddenChips]);
        return;
      }
      const sumShowingWidth = getSummaryShowingWidth(childRef, hiddenChips, marginX);
      const previousElement = hiddenChips[hiddenChips.length - 1];
      if (
        i.id === previousElement?.id &&
        width - sumShowingWidth >= previousElement.width + previousElement.marginX
      ) {
        hiddenChips.pop();
        setHiddenChips([...hiddenChips]);
      }
    });
  }, [hiddenChips, parentRef, childRef]);

  useObserver({ callback: resizeResolver, element: parentRef });
  // Subscribe to height changes
  useEffect(() => {
    resizeResolver();
  }, []);

  return (
    <div className="d-flex flex-row align-items-center justify-content-start">
      <div
        className={`d-flex flex-row flex-wrap align-items-center commonChip ${
          !toggleChipText ? 'short' : 'all'
        }`}
        ref={parentRef}
      >
        {React.Children.map(children, (child, index) => {
          if (!child) return null;

          return React.cloneElement(child, {
            id: index,
            className: `mr-8 mb-8 ${
              !toggleChipText && hiddenChips.find((el) => el.id === String(index)) ? 'hidden' : ''
            }`,
            ref: (element) => {
              return (childRef.current[index] = element);
            },
          });
        })}
        {(!!hiddenChips.length || toggleChipText) && (
          <Typography
            className="cursor-pointer mb-8"
            variant="button"
            color={Colors.violet5}
            onClick={(e) => {
              handleToggleChips();
              e.stopPropagation();
            }}
          >
            {!toggleChipText ? `+${hiddenChips.length}` : 'Hide'}
          </Typography>
        )}
      </div>
    </div>
  );
};

export { Chips };
