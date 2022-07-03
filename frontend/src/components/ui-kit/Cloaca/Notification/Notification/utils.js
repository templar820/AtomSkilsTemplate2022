const configs = {
    success: {
        notificationColor: 'primary',
        children: 'Success',
        icon: 'Success'
    },
    attention: {
        notificationColor: 'warning',
        children: 'Attention',
        icon: 'Attention_error',
        iconForFilledState: 'Attention_outlined'
    },
    error: {
        notificationColor: 'error',
        children: 'Error',
        icon: 'Attention_error',
        iconForFilledState: 'Attention_outlined'
    },
    custom: {}
};

function getNotificationConfig(inputConfig, colors) {
    const { preset, ...restInputConfig } = inputConfig;
    if (!configs[preset]) console.warn(`There are no such notification preset as "${preset}".`);
    const { notificationColor, ...restPresetConfig } = configs[preset];
    const _notificationColor = colors[notificationColor] || notificationColor;

    return { notificationColor: _notificationColor, ...restPresetConfig, ...restInputConfig };
}

export { getNotificationConfig };
