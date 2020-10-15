import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Burger from 'react-css-burger';
import ProfileIcon from '../../assets/images/icons/profile-icon';
import { loginPath } from '../../../constants';
import SelectLangeage from '../../language';
import ListOfLinks from '../header/header-links';
import withGetService from '../../hoc/with-get-service';
import { compose } from '../../../utils';
import style from './mobile-menu.module.scss';

class MobileMenu extends Component {
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

        if (activeBurger) {
            document.documentElement.style.overflowY = 'hidden';
        } else {
            document.documentElement.style.overflowY = 'inherit';
        }

        return (
            <Fragment>
                <div className={style.burgerMenu}>
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
                </div>
                <div className={drawerStyle}>
                    <SelectLangeage />
                    <ListOfLinks />
                    <Link to={loginPath} className={style.header__login}>
                        <ProfileIcon className={style.header__login_icon} />
                        <p>{t('signIn')}</p>
                    </Link>
                </div>
            </Fragment>
        );
    }
}

export default compose(withTranslation(), withGetService(), withRouter)(MobileMenu);
