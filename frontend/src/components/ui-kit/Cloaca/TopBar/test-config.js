import React from 'react';
import Icon from 'lib-ui/InlineIcons';

const leftItems = [
    {
        text: 'Simple item',
        childDropdown: [
            {
                text: 'Abaza and some long text'
            },
            {
                text: 'Abakan'
            }
        ]
    },
    {
        text: 'Disabled item',
        disabled: true
    },

    {
        text: 'Item with text that lasts too long'
    },
    {
        text: 'Item with the child dropdown',
        childDropdown: [
            {
                text: 'Abaza'
            },
            {
                text: 'Abakan'
            },
            {
                text: 'Nested dropdown',
                childDropdown: [
                    {
                        text: 'Abaza'
                    },
                    {
                        text: 'Abakan'
                    },
                    {
                        text: 'Abinsk'
                    },
                    {
                        text: 'Zagrabovo'
                    }
                ]
            },
            {
                text: 'Abinsk'
            }
        ]
    },
    {
        text: 'Item with two icons',
        leftIcon: <Icon w={'25.607999999999997px'} h={'25.607999999999997px'} icon={'Autopay'} />,
        rightIcon: <Icon w={'25.607999999999997px'} h={'25.607999999999997px'} icon={'Delete'} />
    },
    {
        text: 'Item with the child dropdown and custom right icon',
        rightIcon: <Icon w={'25.607999999999997px'} h={'25.607999999999997px'} icon={'Archive'} />,
        childDropdown: [
            {
                text: 'Abaza'
            },
            {
                text: 'Abakan'
            }
        ]
    }
];

const rightItems = [
    {
        text: 'Right item',
        childDropdown: [
            {
                text: 'First child'
            },
            {
                text: 'Second child'
            }
        ]
    }
];

export default { leftItems, rightItems };
