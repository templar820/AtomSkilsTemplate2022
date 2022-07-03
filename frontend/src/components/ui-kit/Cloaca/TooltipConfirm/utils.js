const getBtnProps = (colors, disabled, colorScheme, color, css, size, fontSize, onClick, children) => {
    const _color = colors[color] || color;
    return { disabled, colorScheme, color: _color, onClick, css, size, fontSize, children };
};

const calcWidth = ({ width, icon }) => (width !== undefined ? width : icon ? 328 : 300);

export { getBtnProps, calcWidth };
