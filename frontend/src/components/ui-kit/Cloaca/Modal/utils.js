function getPosition(position) {
    switch (position) {
        case 'top':
        case 'left':
            return 'flex-start';
        case 'right':
        case 'bottom':
            return 'flex-end';
        default:
            return position;
    }
}

function handleClose(cb, event, reason) {
    if (cb) {
        cb(event, reason);
    }
}

export { getPosition, handleClose };
