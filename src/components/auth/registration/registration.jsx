/* eslint-disable react/no-array-index-key */
import React, { Fragment, PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Checkbox } from 'antd';
import classNames from 'classnames';
import withGetService from '../../hoc/with-get-service';
import registrationAction from '../../../actions/registration.actions';
import { compose } from '../../../utils';
import Field from '../../UI/field/field';
import Button from '../../UI/button/button';
import LeftSide from '../left-side';
import RightSide from '../right-side/right-side';
import termsAndConditions from '../../assets/documents/t_c_etalonium.pdf';
import privacyPolicy from '../../assets/documents/Privacy_policy_by_Etalonium.pdf';
import EmailIcon from '../../assets/images/inputs-icons/email-icon';
import InfoIcon from '../../assets/images/menu-icons/info_icon';
import LoginIcon from '../../assets/images/inputs-icons/login-icon';
import PasswordIcon from '../../assets/images/inputs-icons/password-icon';
import ConfirmPasswordIcon from '../../assets/images/inputs-icons/confirm-icon';
import style from './registration.module.scss';
import {
    emailValid,
    oneLowercaseChar,
    oneUppercaseChar,
    oneNumber,
    oneSpecialChar,
} from '../../../helpers';

class Registration extends PureComponent {
    captchaRef = React.createRef();

    static defaultProps = {
        t: () => {},
        submitRegistration: () => {},
        history: {},
        location: {},
        loading: false,
    };

    static propTypes = {
        t: PropTypes.func,
        submitRegistration: PropTypes.func,
        history: PropTypes.object,
        location: PropTypes.object,
        loading: PropTypes.bool,
    };

    state = {
        login: '',
        email: '',
        passwordValue: '',
        repeatPassword: '',
        loginErrors: {
            wrongLogin: '',
        },
        emailErrors: {
            wrongEmail: '',
        },
        passwordErrors: {
            oneLowercaseChar: '',
            oneUppercaseChar: '',
            oneNumber: '',
            oneSpecialChar: '',
            minLength: '',
        },
        confirmPasswordErrors: {
            passwordDoesntMatch: '',
        },
        isDisabled: true,
        isPasswordError: false,
        isConfirmPasswordError: false,
        checkbox: false,
        captchaToken: '',
    };

    componentWillUnmount() {
        this.captchaRef.current.resetCaptcha();
    }

    inputOnChange = async event => {
        const { name, value } = event.target;
        const { repeatPassword } = this.state;

        if (name === 'login') {
            await this.loginValidation(name, value);
        }

        if (name === 'email') {
            await this.emailValidation(name, value);
        }

        if (name === 'passwordValue') {
            await this.passwordValidation(name, value);
            await this.confirmPasswordValidation('repeatPassword', repeatPassword);
        }

        if (name === 'repeatPassword') {
            await this.confirmPasswordValidation(name, value);
        }

        await this.checkPasswordError();
        this.checkDisableButton();
    };

    loginValidation = (name, value) => {
        const { t } = this.props;
        this.setState(state => ({
            [name]: value,
            loginErrors: {
                ...state.loginErrors,
                wrongLogin:
                    value.trim().length < 2 ? t('error.min_length', { digit: 2 }) : '',
            },
        }));
    };

    emailValidation = (name, value) => {
        const { t } = this.props;
        this.setState(state => ({
            [name]: value.toLowerCase().trim(),
            emailErrors: {
                ...state.emailErrors,
                wrongEmail: emailValid(value) ? t('error.wrong_email') : '',
            },
        }));
    };

    passwordValidation = (name, value) => {
        const { t } = this.props;
        this.setState(state => ({
            [name]: value.trim(),
            passwordErrors: {
                ...state.passwordErrors,
                oneLowercaseChar: oneLowercaseChar(value)
                    ? t('error.one_lowercase_char')
                    : '',
                oneUppercaseChar: oneUppercaseChar(value)
                    ? t('error.one_upperrcase_char')
                    : '',
                oneNumber: oneNumber(value) ? t('error.one_number') : '',
                oneSpecialChar: oneSpecialChar(value) ? t('error.one_special_char') : '',
                minLength: value.length < 8 ? t('error.min_length', { digit: 8 }) : '',
            },
        }));
    };

    confirmPasswordValidation = (name, value) => {
        const { t } = this.props;
        const { passwordValue } = this.state;
        const errorText = value !== passwordValue ? t('error.password_does_not_match') : '';
        this.setState({
            [name]: value.trim(),
            confirmPasswordErrors: {
                passwordDoesntMatch: errorText,
            },
        });
    };

    checkPasswordError = () => {
        const { passwordErrors, confirmPasswordErrors } = this.state;
        const copyPasswordErrors = { ...passwordErrors };
        const copyConfirmPasswordErrors = { ...confirmPasswordErrors };
        Object.keys(copyPasswordErrors).forEach(key => {
            if (!copyPasswordErrors[key]) delete copyPasswordErrors[key];
        });
        Object.keys(copyConfirmPasswordErrors).forEach(key => {
            if (!copyConfirmPasswordErrors[key]) delete copyConfirmPasswordErrors[key];
        });

        this.setState({
            isPasswordError: !!Object.keys(copyPasswordErrors).length,
            isConfirmPasswordError: !!Object.keys(copyConfirmPasswordErrors).length,
        });
    };

    checkDisableButton = () => {
        const {
            isPasswordError,
            repeatPassword,
            loginErrors: { wrongLogin },
            login,
            passwordValue,
            emailErrors: { wrongEmail },
            email,
            isConfirmPasswordError,
            checkbox,
        } = this.state;

        const isValidForm = login
            && email
            && !wrongLogin
            && !wrongEmail
            && passwordValue
            && repeatPassword
            && !isPasswordError
            && !isConfirmPasswordError
            && checkbox;

        this.setState({
            isDisabled: !isValidForm,
        });
    };

    onChange = e => {
        this.setState(
            {
                checkbox: e.target.checked,
            },
            () => {
                this.checkDisableButton();
            },
        );
    };

    submitRegistration = event => {
        event.preventDefault();
        const { isDisabled } = this.state;
        if (!isDisabled) {
            this.captchaRef.current.execute();
        }
    };

    handleVerificationSuccess = token => {
        this.setState({
            captchaToken: token,
        }, () => {
            this.sendData();
        });
    }

    sendData = () => {
        const {
            t,
            history,
            submitRegistration,
            location: { search },
        } = this.props;
        const {
            isDisabled,
            login,
            email,
            passwordValue,
            repeatPassword,
            captchaToken,
        } = this.state;
        const referral = search.split('=');
        if (!isDisabled) {
            const user = {
                login,
                email,
                password: passwordValue,
                confirm_password: repeatPassword,
                referral_code: referral[1],
                captcha: captchaToken,
            };

            submitRegistration(user, history, t);
        }
    };

    render() {
        const {
            login,
            email,
            emailErrors: { wrongEmail },
            passwordValue,
            loginErrors: { wrongLogin },
            isPasswordError,
            passwordErrors,
            repeatPassword,
            isDisabled,
            isConfirmPasswordError,
            confirmPasswordErrors: { passwordDoesntMatch },
        } = this.state;
        const { t, loading } = this.props;

        const loginIconStyle = wrongLogin
            ? classNames(
                style.form__inputContainer_icon,
                style.form__inputContainer_iconError,
            )
            : style.form__inputContainer_icon;

        const emailIconStyle = wrongEmail
            ? classNames(
                style.form__inputContainer_icon,
                style.form__inputContainer_iconError,
            )
            : style.form__inputContainer_icon;

        const passwordIconStyle = isPasswordError
            ? classNames(
                style.form__inputContainer_icon,
                style.form__inputContainer_iconError,
            )
            : style.form__inputContainer_icon;

        const confirmPasswordIconStyle = isConfirmPasswordError
            ? classNames(
                style.form__inputContainer_icon,
                style.form__inputContainer_iconError,
            )
            : style.form__inputContainer_icon;

        const passwordErrorStyle = isPasswordError
            ? classNames(style.passwordErrors, style.passwordErrors__hasError)
            : style.passwordErrors;

        return (
            <div className={style.container}>
                <LeftSide />
                <RightSide>
                    <form className={style.form} onSubmit={this.submitRegistration}>
                        <h3 className={style.form__title}>{t('signUp')}</h3>
                        <p className={style.form__subTitle}>{t('gladToSeeYou')}</p>
                        <p className={style.form__subTitle}>{t('createAccount')}</p>
                        <div className={style.form__inputContainer}>
                            <Field
                                id="login"
                                type="login"
                                name="login"
                                labelText={t('login')}
                                value={login}
                                onChange={this.inputOnChange}
                                icon={<LoginIcon className={loginIconStyle} />}
                            />
                            {wrongLogin ? (
                                <div className={style.form__error}>
                                    <InfoIcon className={style.form__error_icon} />
                                    <p className={style.form__error_text}>
                                        {t('error.min_length', { digit: 2 })}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                        <div className={style.form__inputContainer}>
                            <Field
                                id="email"
                                type="email"
                                name="email"
                                labelText="Email"
                                value={email}
                                onChange={this.inputOnChange}
                                icon={<EmailIcon className={emailIconStyle} />}
                            />
                            {wrongEmail ? (
                                <div className={style.form__error}>
                                    <InfoIcon className={style.form__error_icon} />
                                    <p className={style.form__error_text}>
                                        {t('error.wrong_email')}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                        <div className={style.form__inputContainer}>
                            <Field
                                id="password"
                                type="password"
                                name="passwordValue"
                                labelText={t('password')}
                                value={passwordValue}
                                onChange={this.inputOnChange}
                                icon={<PasswordIcon className={passwordIconStyle} />}
                            />
                        </div>
                        <div className={passwordErrorStyle}>
                            {Object.keys(passwordErrors).map((key, index) => (
                                <Fragment key={index}>
                                    {passwordErrors[key] ? (
                                        <p className={style.passwordErrors__item}>
                                            <span className={style.passwordErrors__dot} />
                                            {passwordErrors[key]}
                                        </p>
                                    ) : null}
                                </Fragment>
                            ))}
                        </div>
                        <div className={style.form__inputContainer}>
                            <Field
                                id="repeatPassword"
                                type="password"
                                name="repeatPassword"
                                labelText={t('confirmPassword')}
                                value={repeatPassword}
                                onChange={this.inputOnChange}
                                icon={(
                                    <ConfirmPasswordIcon
                                        className={confirmPasswordIconStyle}
                                    />
                                )}
                            />
                            {passwordDoesntMatch ? (
                                <div className={style.form__error}>
                                    <InfoIcon className={style.form__error_icon} />
                                    <p className={style.form__error_text}>
                                        {t('error.password_does_not_match')}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                        <div className={style.form__checkboxContainer}>
                            <Checkbox onChange={this.onChange}>
                                <p className={style.form__checkboxContainer_text}>
                                    {t('confirmRead')}{' '}
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={termsAndConditions}
                                        className={style.form__checkboxContainer_link}
                                    >
                                        {t('terms&Conditions')}
                                    </a>{' '}
                                    {t('and')}{' '}
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={privacyPolicy}
                                        className={style.form__checkboxContainer_link}
                                    >
                                        {t('privacyPolicy')}
                                    </a>
                                </p>
                            </Checkbox>
                        </div>
                        <HCaptcha
                            sitekey="c5d4aade-342c-461e-ba2c-fe7e77a7a9d7"
                            onVerify={token => this.handleVerificationSuccess(token)}
                            size="invisible"
                            languageOverride="en"
                            ref={this.captchaRef}
                        />
                        <div className={style.buttonWrapper}>
                            <Button
                                type="submit"
                                disabled={isDisabled}
                                className={style.buttonWrapper__button}
                                loading={loading}
                            >
                                <div className={style.buttonWrapper__button_text}>
                                    {t('signUp')}
                                </div>
                            </Button>
                            <div className={style.buttonWrapper__rightSide}>
                                <p className={style.buttonWrapper__rightSide_text}>
                                    {t('alreadyHaveAccount')}
                                </p>
                                <p className={style.buttonWrapper__rightSide_text}>
                                    {t('please')}
                                    <Link
                                        to="/"
                                        className={style.buttonWrapper__rightSide_link}
                                    >
                                        {t('signInHere')}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </RightSide>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        registration: { loading },
    } = state;

    return {
        loading,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        submitRegistration: (user, history, t) => registrationAction(user, history, t),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withGetService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(Registration);
