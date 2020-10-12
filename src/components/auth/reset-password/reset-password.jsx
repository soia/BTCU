/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
import React, { Fragment, PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withPostService from '../../hoc/with-post-service';
import fetchResetPasswordAction from '../../../actions/post-reset-password.actions';
import { compose } from '../../../utils';
import Field from '../../UI/field/field';
import Button from '../../UI/button/button';
import InfoIcon from '../../assets/images/icons/info_icon';
import style from './reset-password.module.scss';
import {
    oneLowercaseChar,
    oneUppercaseChar,
    oneNumber,
    oneSpecialChar,
} from '../../../helpers';

class ResetPassword extends PureComponent {
    static defaultProps = {
        t: () => {},
        submitNewPassword: () => {},
        history: {},
        location: {},
        loggingIn: false,
        loading: false,
    };

    static propTypes = {
        t: PropTypes.func,
        submitNewPassword: PropTypes.func,
        history: PropTypes.object,
        location: PropTypes.object,
        loggingIn: PropTypes.bool,
        loading: PropTypes.bool,
    };

    state = {
        newPassword: '',
        repeatPassword: '',
        token: '',
        newPasswordErrors: {
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
        isNewPasswordError: false,
        isConfirmPasswordError: false,
    };

    componentDidMount() {
        const {
            location: { search },
            loggingIn,
            history,
        } = this.props;

        if (loggingIn) {
            return history.push('/');
        }
        const token = search.split('=');
        this.setState({
            token: token[1],
        });
    }

    inputOnChange = async event => {
        const { name, value } = event.target;
        if (name === 'newPassword') {
            await this.passwordValidation(name, value);
            await this.confirmpasswordValidation(
                'repeatPassword',
                this.state.repeatPassword,
            );
        }

        if (name === 'repeatPassword') {
            await this.confirmpasswordValidation(name, value);
        }
        await this.checkPasswordError();

        const {
            repeatPassword,
            isNewPasswordError,
            isConfirmPasswordError,
            newPassword,
        } = this.state;
        const isValidForm = newPassword
            && repeatPassword
            && !isNewPasswordError
            && !isConfirmPasswordError;
        this.setState({
            isDisabled: !isValidForm,
        });
    };

    passwordValidation = (name, value) => {
        const { t } = this.props;
        this.setState(state => ({
            [name]: value.trim(),
            newPasswordErrors: {
                ...state.newPasswordErrors,
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

    confirmpasswordValidation = (name, value) => {
        const { t } = this.props;
        const { newPassword } = this.state;
        const errorText = value !== newPassword ? t('error.password_does_not_match') : '';
        this.setState({
            [name]: value.trim(),
            confirmPasswordErrors: {
                passwordDoesntMatch: errorText,
            },
        });
    };

    checkPasswordError = () => {
        const { newPasswordErrors, confirmPasswordErrors } = this.state;
        const copyNewPasswordErrors = { ...newPasswordErrors };
        const copyConfirmPasswordErrors = { ...confirmPasswordErrors };
        Object.keys(copyNewPasswordErrors).forEach(key => {
            if (!copyNewPasswordErrors[key]) delete copyNewPasswordErrors[key];
        });
        Object.keys(copyConfirmPasswordErrors).forEach(key => {
            if (!copyConfirmPasswordErrors[key]) delete copyConfirmPasswordErrors[key];
        });

        this.setState({
            isNewPasswordError: !!Object.keys(copyNewPasswordErrors).length,
            isConfirmPasswordError: !!Object.keys(copyConfirmPasswordErrors).length,
        });
    };

    submitNewPassword = event => {
        event.preventDefault();
        const { t, history, submitNewPassword } = this.props;
        const {
            isDisabled, newPassword, repeatPassword, token,
        } = this.state;

        if (!isDisabled) {
            const data = {
                password: newPassword,
                confirm_password: repeatPassword,
                token,
            };
            submitNewPassword(data, t, history);
        }
    };

    render() {
        const {
            newPassword,
            repeatPassword,
            newPasswordErrors,
            isNewPasswordError,
            confirmPasswordErrors: { passwordDoesntMatch },
            isDisabled,
        } = this.state;
        const { t, loading } = this.props;

        const containerStyle = loading
            ? style.container
            : classNames(style.container, style.container__loaded);

        const newpasswordErrorStyle = isNewPasswordError
            ? classNames(style.passwordErrors, style.passwordErrors__hasError)
            : style.passwordErrors;

        return (
            <div className={containerStyle}>
                <form className={style.form}>
                    <h3 className={style.form__title}>{t('createNewPassword')}</h3>
                    <div className={style.form__inputContainer}>
                        <Field
                            id="password"
                            type="password"
                            name="newPassword"
                            labelText={t('newPassword')}
                            value={newPassword}
                            onChange={this.inputOnChange}
                        />
                    </div>
                    <div className={newpasswordErrorStyle}>
                        {Object.keys(newPasswordErrors).map((key, index) => (
                            <Fragment key={index}>
                                {newPasswordErrors[key] ? (
                                    <p className={style.passwordErrors__item}>
                                        <span className={style.passwordErrors__dot} />
                                        {newPasswordErrors[key]}
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
                            labelText={t('repeatNewPassword')}
                            value={repeatPassword}
                            onChange={this.inputOnChange}
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
                    <Button
                        type="submit"
                        disabled={isDisabled}
                        className={style.form__button}
                        onClick={this.submitNewPassword}
                        loading={loading}
                    >
                        {t('create')}
                    </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        authentication: { loggingIn },
        resetPassword: { loading },
    } = state;

    return {
        loading,
        loggingIn,
    };
};

const mapDispatchToProps = (dispatch, { postService }) => bindActionCreators(
    {
        submitNewPassword: fetchResetPasswordAction(postService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withPostService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(ResetPassword);
