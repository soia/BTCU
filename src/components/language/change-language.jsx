import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from '../../utils';
import i18n from '../../i18n';
import withGetService from '../hoc/with-get-service';
import { getCurrentLocaleActions } from '../../actions/current-locale.actions';
import USICON from '../assets/images/flags/united-states.svg';
import RUCON from '../assets/images/flags/russia.svg';
import CNICON from '../assets/images/flags/china.svg';
import style from './change-language.module.scss';

class SelectLangeage extends Component {
    componentDidMount() {
        const { setLocale } = this.props;
        const currentLang = localStorage.getItem('i18nextLngBTCU');
        setLocale(currentLang);
    }

    onSelectLang = countryCode => {
        const { setLocale } = this.props;
        i18n.changeLanguage(countryCode);
        localStorage.setItem('i18nextLngBTCU', countryCode);
        setLocale(countryCode);
    };

    render() {
        const {
            locale,
            location: { pathname },
        } = this.props;
        let nameLocale = '';
        let flagLocale = '';
        let nextLang = '';

        if (locale === 'ru') {
            nameLocale = 'Русский';
            flagLocale = RUCON;
            nextLang = 'en';
        }

        if (locale === 'en') {
            nameLocale = 'English';
            flagLocale = USICON;
            nextLang = 'cn';
        }

        if (locale === 'cn') {
            nameLocale = '中文';
            flagLocale = CNICON;
            nextLang = 'ru';
        }

        const langStyle = pathname === '/'
            ? style.container__lang
            : classNames(style.container__lang, style.container__hideOnDesctop);

        return (
            <div
                className={style.container}
                id="selectLangeage"
                onClick={() => this.onSelectLang(nextLang)}
            >
                <img className={style.container__flagIcon} src={flagLocale} alt="flag" />
                <p className={langStyle}>{nameLocale}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        currentLocale: { locale },
    } = state;

    return {
        locale,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        setLocale: value => getCurrentLocaleActions.getCurrentLocale(value),
    },
    dispatch,
);

SelectLangeage.defaultProps = {
    setLocale: () => {},
    locale: '',
    location: {},
};

SelectLangeage.propTypes = {
    setLocale: PropTypes.func,
    locale: PropTypes.string,
    location: PropTypes.object,
};

export default compose(
    withGetService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(SelectLangeage);
