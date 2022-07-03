export const createHandlerCreator = (callback, status, props) => (onClick) => (event) => {
    if (typeof onClick === 'function') onClick(event);
    if (typeof callback === 'function' && !props.disabled) {
        const newStatus = status === 'indeterminate' || !status;
        callback(props.key, newStatus, event, props);
    }
};

// all this renaming needed cause react doesn't pass key prop, but we want to keep same prop name everywhere in menu API
export const renameKeyProp = ({ _key, ...props }) => ({ key: _key, ...props });
