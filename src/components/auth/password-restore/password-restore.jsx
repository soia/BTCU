/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withPostService from '../../hoc/with-post-service';
import { compose } from '../../../utils';
import Field from '../../UI/field/field';
import Button from '../../UI/button/button';
import LeftSide from '../left-side';
import RightSide from '../right-side/right-side';
import fetchPasswordRecoveryAction from '../../../actions/post-password-recovery.actions';
import InfoIcon from '../../assets/images/menu-icons/info_icon';
import EmailIcon from '../../assets/images/inputs-icons/email-icon';
import style from './password-restore.module.scss';
import { emailValid } from '../../../helpers';

class PasswordRestore extends Component {
    static defaultProps = {
        t: () => {},
        submitEmail: () => {},
        loading: false,
        history: {},
    };

    static propTypes = {
        t: PropTypes.func,
        submitEmail: PropTypes.func,
        loading: PropTypes.bool,
        history: PropTypes.object,
    };

    state = {
        email: '',
        emailErrors: {
            wrongEmail: '',
        },
        isDisabled: true,
    };

    inputOnChange = async event => {
        const { name, value } = event.target;

        if (name === 'email') {
            await this.emailValidation(name, value);
        }

        const {
            emailErrors: { wrongEmail },
            email,
        } = this.state;

        const isValidForm = email && !wrongEmail;
        this.setState({
            isDisabled: !isValidForm,
        });
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

    submitRestore = event => {
        event.preventDefault();
        const { t, submitEmail, history } = this.props;
        const { isDisabled, email } = this.state;

        if (!isDisabled) {
            const data = {
                email,
            };
            submitEmail(data, t, history);
        }
    };

    render() {
        const {
            email,
            emailErrors: { wrongEmail },
            isDisabled,
        } = this.state;
        const { t, loading } = this.props;

        const emailIconStyle = wrongEmail
            ? classNames(
                style.form__inputContainer_icon,
                style.form__inputContainer_iconError,
            )
            : style.form__inputContainer_icon;

        return (
            <div className={style.container}>
                <LeftSide />
                <RightSide>
                    <form className={style.form}>
                        <h3 className={style.form__title}>{t('forgotPassword')}?</h3>
                        <p className={style.form__subTitle}>
                            {t('enterEmailForRestore')}
                        </p>
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
                        <div className={style.buttonWrapper}>
                            <Button
                                type="submit"
                                disabled={isDisabled}
                                className={style.buttonWrapper__button}
                                onClick={this.submitRestore}
                                loading={loading}
                            >
                                <div className={style.buttonWrapper__button_text}>
                                    {t('restore')}
                                </div>
                            </Button>
                            <div className={style.buttonWrapper__rightSide}>
                                <p className={style.buttonWrapper__rightSide_text}>
                                    <Link
                                        to="/"
                                        className={style.buttonWrapper__rightSide_link}
                                    >
                                        {t('signIn')}
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
        passwordRecovery: { loading },
    } = state;

    return {
        loading,
    };
};

const mapDispatchToProps = (dispatch, { postService }) => bindActionCreators(
    {
        submitEmail: fetchPasswordRecoveryAction(postService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withPostService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(PasswordRestore);
