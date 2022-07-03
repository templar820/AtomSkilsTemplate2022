import React from 'react';
import PropTypes from 'prop-types';

import Field from 'lib-ui/Field';
import Button from 'lib-ui/Button';

import { Header, IsBlockedWrapper, fieldStyle, buttonStyle, StyledIcon } from './units';
import { setClassName } from 'lib-root/utils/styleMixins';

/**
 * Форма авторизации
 */
class AuthorizationForm extends React.Component {
    state = {
        login: '',
        password: '',
        tries: 0,
        isBlocked: this.props.isBlocked || false,
        registration: this.props.registration || false,
        loginValidation: this.props.loginValidation,
        passwordValidation: this.props.passwordValidation,
        isPasswordHide: true,
        buttonDisabled: this.props.buttonDisabled || true
    };

    componentDidUpdate(prevProps) {
        const { loginValidation, passwordValidation, maxTries } = this.props;
        const { tries, isBlocked } = this.state;

        if (prevProps.loginValidation !== loginValidation || prevProps.passwordValidation !== passwordValidation) {
            this.setState({
                loginValidation: this.props.loginValidation,
                passwordValidation: this.props.passwordValidation
            });
        }

        if (!isBlocked && tries === maxTries) {
            this.setState(() => ({
                isBlocked: true
            }));
        }
    }

    onAuthFalse = () => {
        const { onAuthFalse } = this.props;
        this.setState({ tries: ++this.state.tries });
        onAuthFalse && onAuthFalse();
    };

    onAuth = () => {
        const { onAuth } = this.props;
        this.setState({ tries: 0 });
        onAuth();
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { onAuthFalse, onAuth } = this;
        const { onSubmit } = this.props;

        try {
            const { login, password } = this.state;
            await onSubmit(e, { login, password, onAuthFalse, onAuth });
            onAuth();
        } catch (err) {
            console.error('Form submit error \n', err);
            onAuthFalse();
        }
    };

    handleChange = async (e) => {
        e.persist();
        const { onFieldChange } = this.props;

        onFieldChange && onFieldChange(e);

        await this.setState(() => ({
            [e.target.name]: e.target.value,
            loginValidation: undefined,
            passwordValidation: undefined
        }));

        await this.setState((prevState) => ({
            buttonDisabled: !(prevState.login && prevState.password)
        }));
    };

    handlePasswordHide = () => {
        this.setState(() => ({
            isPasswordHide: !this.state.isPasswordHide
        }));
    };

    render() {
        const {
            isBlocked,
            login,
            password,
            isPasswordHide,
            loginValidation,
            passwordValidation,
            buttonDisabled,
            tries: stateTries
        } = this.state;

        const {
            isBlockedText,
            headerText,
            maxTries,
            isLoading,
            contentRenderer,
            useBlockedWrapper,
            tries: propsTries
        } = this.props;

        const { wrapperStyle: loginWrapperStyle, ...restLoginProps } = this.props.loginFieldProps;
        const { wrapperStyle: passwordWrapperStyle, ...restpasswordProps } = this.props.passwordFieldProps;
        const { css: buttonOkStyle, ...restButtonOkProps } = this.props.buttonOkProps;

        const tries = propsTries !== undefined ? propsTries : stateTries;

        const elements = [
            <Field
                key={'field-0'}
                className={setClassName({
                    props: restLoginProps,
                    name: 'authorization-form__login-field'
                })}
                wrapperStyle={fieldStyle(loginWrapperStyle)}
                autoFocus={true}
                labelStyle={{ marginBottom: '1px' }}
                name={'login'}
                onChange={this.handleChange}
                value={login}
                label={'Логин'}
                placeholder={'Логин'}
                validation={loginValidation}
                {...restLoginProps}
            />,
            <Field
                key={'field-1'}
                className={setClassName({
                    props: restpasswordProps,
                    name: 'authorization-form__password-field'
                })}
                wrapperStyle={fieldStyle(passwordWrapperStyle)}
                name={'password'}
                onChange={this.handleChange}
                value={password}
                label={'Пароль'}
                labelStyle={{ marginBottom: '1px' }}
                placeholder={'Пароль'}
                type={isPasswordHide ? 'password' : 'text'}
                icon={<StyledIcon onClick={this.handlePasswordHide} icon={isPasswordHide ? 'Hide' : 'Show'} />}
                validation={passwordValidation}
                validationError={'Неверный логин или неверный пароль'}
                comment={maxTries ? (tries > 0 ? 'Осталось попыток: ' + (maxTries - tries) : '') : ''}
                {...restpasswordProps}
            />,
            <Button
                key={'button-0'}
                className={setClassName({ props: restButtonOkProps, name: 'authorization-form__button-ok' })}
                isLoading={isLoading}
                css={buttonStyle(buttonOkStyle)}
                disabled={buttonDisabled}
                type={'submit'}
                {...restButtonOkProps}>
                {restButtonOkProps.children ? restButtonOkProps.children : 'Отправить'}
            </Button>
        ];

        return isBlocked && useBlockedWrapper ? (
            <IsBlockedWrapper isBlockedStyle={this.props.isBlockedStyle}>{isBlockedText}</IsBlockedWrapper>
        ) : (
            <form
                className={setClassName({ props: this.props, name: 'authorization-form' })}
                onSubmit={this.handleSubmit}>
                <Header headerStyle={this.props.headerStyle}>{headerText}</Header>

                {contentRenderer ? contentRenderer({ elements }) : elements}
            </form>
        );
    }
}

AuthorizationForm.displayName = 'AuthorizationForm';
AuthorizationForm.propTypes = {
    /** Defines whether message for blocked user should be shown */
    isBlocked: PropTypes.bool,
    /** Turn on loading */
    isLoading: PropTypes.bool,
    /** Defines whether login should be validated */
    loginValidation: PropTypes.bool,
    /** Defines whether password should be validated */
    passwordValidation: PropTypes.bool,
    /** Callback fires then form submited, func(e, { login, password, onAuthFalse, onAuth }) */
    onSubmit: PropTypes.func.isRequired,
    /** Callback fires then user authenticated */
    onAuth: PropTypes.func,
    /** Callback fires then user failed to authenticate */
    onAuthFalse: PropTypes.func,
    /** Max number of times in which user can try to auth */
    maxTries: PropTypes.number,
    /** Content of message for form's header */
    headerText: PropTypes.string,
    /** Content of message for blocked users */
    isBlockedText: PropTypes.string,
    /** Custom props for login field */
    loginFieldProps: PropTypes.object,
    /** Custom props for password field */
    passwordFieldProps: PropTypes.object,
    /** Custom props for button */
    buttonOkProps: PropTypes.object,
    /** Custom styles for isBlocked */
    isBlockedStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Custom styles for isBlocked */
    headerStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
    /** Render func for content ({ elements = [] }) */
    contentRenderer: PropTypes.func,
    /** Callback fires then field change, func(e) */
    onFieldChange: PropTypes.func,
    /** Defines whether to show the IsBlockedWrapper */
    useBlockedWrapper: PropTypes.bool,
    /** The number of attempts to auth the user */
    tries: PropTypes.number
};

AuthorizationForm.defaultProps = {
    onSubmit: () => {},
    onAuth: () => {},
    headerText: 'Умное ЖКХ',
    isBlockedText: 'Пользователь заблокирован',
    loginFieldProps: {},
    passwordFieldProps: {},
    buttonOkProps: {},
    useBlockedWrapper: true
};

export default AuthorizationForm;
