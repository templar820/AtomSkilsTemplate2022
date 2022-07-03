export default {
    dropdownPadding: 16,
    rowHeight: 40,
    overscanRowCount: 10,
    modifiers: [
        {
            name: 'flip',
            options: {
                fallbackPlacements: [
                    'right-start',
                    'left-start',
                    'right-end',
                    'left-end',
                    'right',
                    'left',
                    'bottom-end',
                    'bottom',
                    'bottom-start',
                    'top-end',
                    'top',
                    'top-start'
                ]
            }
        }
    ]
};
