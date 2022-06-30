const getMarginX = (elem) => {
  const style = window.getComputedStyle(elem);
  return Number(style.marginLeft.replace('px', '')) + Number(style.marginRight.replace('px', ''));
};

const getSummaryShowingWidth = (childRef, hiddenChips, marginX) => {
  return childRef.current.reduce((acc, el) => {
    const current = hiddenChips.find((v) => v.id === el.id);
    if (current) return acc;
    return acc + (el.getBoundingClientRect().width + marginX || 0);
  }, 0);
};

export { getMarginX, getSummaryShowingWidth };
