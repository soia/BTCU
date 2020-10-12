/* eslint-disable react/no-array-index-key */
import React, { Fragment, PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from '../../../utils';
import Field from '../../UI/field/field';
import Button from '../../UI/button/button';
import InfoIcon from '../../assets/images/icons/info_icon';
import loginAction from '../../../actions/login.actions';
import { passowrdRecoveryPath, registartionPath } from '../../../constants';
import style from './login.module.scss';
import {
    oneLowercaseChar,
    oneUppercaseChar,
    oneNumber,
    oneSpecialChar,
} from '../../../helpers';

class Login extends PureComponent {
    captchaRef = React.createRef();

    static defaultProps = {
        t: () => {},
        dispatch: () => {},
        history: {},
        loading: false,
    };

    static propTypes = {
        t: PropTypes.func,
        dispatch: PropTypes.func,
        history: PropTypes.object,
        loading: PropTypes.bool,
    };

    state = {
        login: '',
        passwordValue: '',
        loginErrors: {
            wrongLogin: '',
        },
        passwordErrors: {
            minLength: '',
            oneSpecialChar: '',
            oneNumber: '',
            oneLowercaseChar: '',
            oneUppercaseChar: '',
        },
        isDisabled: true,
        isPasswordError: false,
        captchaToken: '',
    };

    inputOnChange = async event => {
        const { name, value } = event.target;

        if (name === 'login') {
            await this.loginValidation(name, value);
        }

        if (name === 'passwordValue') {
            await this.passwordValidation(name, value);
        }

        await this.checkPasswordError();

        const {
            isPasswordError,
            loginErrors: { wrongLogin },
            login,
            passwordValue,
        } = this.state;

        const isValidForm = login && passwordValue && !isPasswordError && !wrongLogin;
        this.setState({
            isDisabled: !isValidForm,
        });
    };

    loginValidation = (name, value) => {
        const { t } = this.props;
        this.setState(state => ({
            [name]: value,
            loginErrors: {
                ...state.loginErrors,
                wrongLogin: value.trim().length < 2 ? t('error.min_length', { digit: 2 }) : '',
            },
        }));
    };

    passwordValidation = (name, value) => {
        const { t } = this.props;
        this.setState(state => ({
            [name]: value.trim(),
            passwordErrors: {
                ...state.passwordErrors,
                oneLowercaseChar: oneLowercaseChar(value) ? t('error.one_lowercase_char') : '',
                oneUppercaseChar: oneUppercaseChar(value) ? t('error.one_upperrcase_char') : '',
                oneNumber: oneNumber(value) ? t('error.one_number') : '',
                oneSpecialChar: oneSpecialChar(value) ? t('error.one_special_char') : '',
                minLength: value.length < 8 ? t('error.min_length', { digit: 8 }) : '',
            },
        }));
    };

    checkPasswordError = () => {
        const { passwordErrors } = this.state;
        const copyPasswordErrors = { ...passwordErrors };
        Object.keys(copyPasswordErrors).forEach(key => {
            if (!copyPasswordErrors[key]) delete copyPasswordErrors[key];
        });

        this.setState({
            isPasswordError: !!Object.keys(copyPasswordErrors).length,
        });
    };

    submitLogin = event => {
        event.preventDefault();
        const { isDisabled } = this.state;
        if (!isDisabled) {
            this.captchaRef.current.execute();
        }
    }

    handleVerificationSuccess = token => {
        this.setState({
            captchaToken: token,
        }, () => {
            this.sendData();
        });
    }

    sendData = () => {
        const { history, t, dispatch } = this.props;
        const { login, passwordValue, captchaToken } = this.state;
        dispatch(loginAction(login, passwordValue, captchaToken, history, t));
    }

    render() {
        const {
            login,
            passwordValue,
            loginErrors: { wrongLogin },
            isPasswordError,
            passwordErrors,
            isDisabled,
        } = this.state;
        const { t, loading } = this.props;

        const passwordErrorStyle = isPasswordError
            ? classNames(style.passwordErrors, style.passwordErrors__hasError)
            : style.passwordErrors;

        return (
            <div className={style.container} id="login">
                <form className={style.form} onSubmit={this.submitLogin}>
                    <h3 className={style.form__title}>{t('loginToYourAccount')}</h3>
                    <div className={style.form__inputContainer}>
                        <Field
                            id="login"
                            type="text"
                            name="login"
                            labelText={t('login')}
                            value={login}
                            onChange={this.inputOnChange}
                            error={!!wrongLogin}
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
                            id="password"
                            type="password"
                            name="passwordValue"
                            labelText={t('password')}
                            value={passwordValue}
                            onChange={this.inputOnChange}
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
                    <Button
                        type="submit"
                        disabled={isDisabled}
                        className={style.form__button}
                        loading={loading}
                    >
                        {t('login')}
                    </Button>
                    <p className={style.form__dontHaveAccount}>
                        {t('dontHaveAccount')}
                    </p>
                    <Link
                        to={registartionPath}
                        className={style.form__signUp}
                    >
                        {t('signUp')}
                    </Link>
                    <Link
                        to={passowrdRecoveryPath}
                        className={style.forgotPassword}
                    >
                        {t('forgotPassword')}
                    </Link>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        authentication: { loggingIn, loading },
    } = state;

    return {
        loading,
        loggingIn,
    };
};

export default compose(withTranslation(), connect(mapStateToProps), withRouter)(Login);
