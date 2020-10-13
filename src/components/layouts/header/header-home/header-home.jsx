import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Burger from 'react-css-burger';
import withGetService from '../../../hoc/with-get-service';
import { compose } from '../../../../utils';
import ListOfLinks from '../header-links';
import { loginPath } from '../../../../constants';
import SelectLangeage from '../../../language';
import ProfileIcon from '../../../assets/images/icons/profile-icon';
import logo from '../../../assets/images/logos/btcu.svg';
import style from './header-home.module.scss';

class HomeHeader extends Component {
    static defaultProps = {
        t: () => {},
    };

    static propTypes = {
        t: PropTypes.func,
    };

    state = {
        activeBurger: false,
    };

    toggleBurger = () => {
        this.setState(state => ({
            activeBurger: !state.activeBurger,
        }));
    };

    render() {
        const { t } = this.props;
        const { activeBurger } = this.state;

        const drawerStyle = activeBurger ? style.drawer__opened : style.drawer__closed;

        return (
            <header className={style.header}>
                <div className={style.header__leftSide}>
                    <div className={style.header__logo}>
                        <Link to="/">
                            <img className={style.header__logo_img} src={logo} alt="logo" />
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
                        />
                    </div>
                </div>
                <div className={style.header__rightSide}>
                    <Link to={loginPath} className={style.header__login}>
                        <ProfileIcon
                            className={style.header__login_icon}
                        />
                        <p>{t('signIn')}</p>
                    </Link>
                    <SelectLangeage />
                </div>
                <div className={style.header__burgerMenu}>
                    <Burger
                        onClick={this.toggleBurger}
                        active={activeBurger}
                        burger="spin"
                        color="white"
                        marginTop="0"
                        scale={0.65}
                    />
                </div>
                <div className={drawerStyle} />
            </header>
        );
    }
}

export default compose(withTranslation(), withGetService(), withRouter)(HomeHeader);
