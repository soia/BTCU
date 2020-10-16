import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import ListOfMoreLinks from '../header-more-links';
import MobileMenu from '../../mobile-menu';
import withGetService from '../../../hoc/with-get-service';
import { compose } from '../../../../utils';
import SearchIcon from '../../../assets/images/icons/search-icon';
import ListOfLinks from '../header-links';
import SearchFilter from '../../search-filter/search-filter';
import { loginPath } from '../../../../constants';
import SelectLangeage from '../../../language';
import ProfileIcon from '../../../assets/images/icons/profile-icon';
import logo from '../../../assets/images/logos/btcu.svg';
import style from './header-main.module.scss';

class HeaderMain extends Component {
    static defaultProps = {
        t: () => {},
        location: {},
    };

    static propTypes = {
        t: PropTypes.func,
        location: PropTypes.object,
    };

    state = {};

    render() {
        const {
            t,
            location: { pathname },
        } = this.props;

        if (pathname === '/') {
            return null;
        }

        return (
            <header className={style.header}>
                <div className={style.header__leftSide}>
                    <div className={style.header__logo}>
                        <Link to="/">
                            <img
                                className={style.header__logo_img}
                                src={logo}
                                alt="logo"
                            />
                        </Link>
                        <p className={style.header__logo_ticker}>
                            BTCU:
                            <span className={style.header__logo_price}>(-0.23%)</span>
                        </p>
                    </div>
                    <div className={style.header__linksWrapper}>
                        <ListOfLinks
                            classNameList={style.header__links}
                            classNameItem={style.header__links_item}
                            classNameSubLinks={style.header__subLinks}
                        />
                        <ListOfMoreLinks
                            classNameContainer={style.header__more_links}
                            classNameSubLinks={style.header__more_subLinks}
                            classNameItem={style.header__more_item}
                        />
                    </div>
                </div>
                <div className={style.header__rightSide}>
                    <Link to={loginPath} className={style.header__login}>
                        <ProfileIcon className={style.header__login_icon} />
                        <p>{t('signIn')}</p>
                    </Link>
                    <SearchFilter
                        button={(
                            <button className={style.filter__button} type="submit">
                                <SearchIcon className={style.filter__searchIcon} />
                            </button>
                        )}
                        inputClassName={style.filter__input}
                    />
                    <div className={style.header__rightSide_margin} />
                    <SelectLangeage />
                </div>
                <MobileMenu />
            </header>
        );
    }
}

export default compose(withTranslation(), withGetService(), withRouter)(HeaderMain);
