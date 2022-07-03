const mainButton = 'Ok';
const secondaryButton = 'Отменить';

const mainButtonProps = {
    colorScheme: 'primary',
    size: 'sm'
};
const mainButtonPropsDelete = {
    colorScheme: 'primary',
    color: 'errorAccent',
    size: 'sm'
};
const secondaryButtonProps = {
    colorScheme: 'outline',
    color: 'info',
    size: 'sm'
};

export default {
    type: {
        normal: {
            icon: null,
            mainButton: 'Применить',
            mainButtonProps,
            secondaryButton,
            secondaryButtonProps
        },
        confirm: {
            iconProps: {
                icon: 'Sys_Success_Circle',
                color: 'primary'
            },
            mainButton: 'Подтвердить',
            mainButtonProps,
            secondaryButton,
            secondaryButtonProps
        },
        delete: {
            iconProps: {
                icon: 'Sys_Delete',
                color: 'errorAccent'
            },
            mainButton: 'Удалить',
            mainButtonProps: mainButtonPropsDelete,
            secondaryButton,
            secondaryButtonProps
        },
        info: {
            iconProps: {
                icon: 'Sys_Information',
                color: 'info'
            },
            mainButton: 'Понятно',
            mainButtonProps,
            secondaryButton: null,
            secondaryButtonProps: {}
        },
        success: {
            iconProps: {
                icon: 'Sys_Success_Circle',
                color: 'primary'
            },
            mainButton,
            mainButtonProps,
            secondaryButton: null,
            secondaryButtonProps: {}
        },
        error: {
            iconProps: {
                icon: 'Sys_Error',
                color: 'errorAccent'
            },
            mainButton,
            mainButtonProps,
            secondaryButton: null,
            secondaryButtonProps: {}
        },
        warning: {
            iconProps: {
                icon: 'Sys_Attention_error',
                color: 'warning'
            },
            mainButton,
            mainButtonProps,
            secondaryButton: null,
            secondaryButtonProps: {}
        }
    }
};
