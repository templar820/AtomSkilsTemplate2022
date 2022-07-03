import * as React from 'react';
import { ButtonProps } from 'lib-ui/Button';
import { FieldProps } from 'lib-ui/Field';
import { EmotionStylesType } from 'lib-ui';

declare type AuthData = { login: string; password: string; onAuthFalse: () => void; onAuth: () => void };

export interface AuthorizationFormProps {
    /** Defines whether message for blocked user should be shown */
    isBlocked?: boolean;
    /** Turn on loading */
    isLoading?: boolean;
    /** Defines whether login should be validated */
    loginValidation?: boolean;
    /** Defines whether password should be validated */
    passwordValidation?: boolean;
    /** Callback fires then form submited, func(e, { login, password, onAuthFalse, onAuth }) */
    onSubmit: (event: React.MouseEvent, authData: AuthData) => void;
    /** Callback fires then user authenticated */
    onAuth?: () => void;
    /** Callback fires then user failed to authenticate */
    onAuthFalse?: () => void;
    /** Max number of times in which user can try to auth */
    maxTries?: number;
    /** Content of message for form's header */
    headerText?: string;
    /** Content of message for blocked users */
    isBlockedText?: string;
    /** Custom props for login field */
    loginFieldProps?: FieldProps;
    /** Custom props for password field */
    passwordFieldProps?: FieldProps;
    /** Custom props for button */
    buttonOkProps?: ButtonProps;
    /** Custom styles for isBlocked */
    isBlockedStyle?: EmotionStylesType;
    /** Custom styles for isBlocked */
    headerStyle?: EmotionStylesType;
    /** Render func for content ({ elements = [] }) */
    contentRenderer?: (props: { elements: Array<React.ReactNode> }) => React.ReactNode;
    /** Callback fires then field change, func(e) */
    onFieldChange?: (event: React.MouseEvent) => void;
    /** Defines whether to show the IsBlockedWrapper */
    useBlockedWrapper?: boolean;
    /** The number of attempts to auth the user */
    tries?: number;
}

declare const AuthorizationForm: React.ComponentType<AuthorizationFormProps>;

export default AuthorizationForm;
