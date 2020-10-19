import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import Burger from 'react-css-burger';
import { connect } from 'react-redux';
import { mobileSublinksActions } from '../../../actions/mobile-sublinks.actions';
import ArrowLeftIcon from '../../assets/images/icons/arrow-left';
import ProfileIcon from '../../assets/images/icons/profile-icon';
import { loginPath, MORE_LINKS } from '../../../constants';
import SelectLangeage from '../../language';
import ListOfLinks from '../header/header-links';
import ListOfMoreLinks from '../header/header-more-links';
import withGetService from '../../hoc/with-get-service';
import { compose } from '../../../utils';
import style from './mobile-menu.module.scss';

class MobileMenu extends Component {
    static defaultProps = {
        t: () => {},
        clearMobileLinks: () => {},
        mobileSublinks: '',
    };

    static propTypes = {
        t: PropTypes.func,
        clearMobileLinks: PropTypes.func,
        mobileSublinks: PropTypes.string,
    };

    state = {
        activeBurger: false,
    };

    toggleBurger = () => {
        this.setState(state => ({
            activeBurger: !state.activeBurger,
        }));
    };

    clearMobileLinks = () => {
        const { clearMobileLinks } = this.props;
        clearMobileLinks();
    }

    render() {
        const { t, mobileSublinks } = this.props;
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
                    {mobileSublinks ? (
                        <div onClick={this.clearMobileLinks} className={style.back}>
                            <ArrowLeftIcon className={style.back__arrow} />
                            {t('back')}
                        </div>
                    ) : null}
                    <div className={style.linksWrapper}>
                        { mobileSublinks === MORE_LINKS
                            ? null
                            : (
                                <ListOfLinks
                                    classNameList={style.links}
                                    classNameItem={style.links_item}
                                    classNameSubLinks={style.links_subLinks}
                                />
                            )

                        }
                        <ListOfMoreLinks
                            classNameContainer={style.links__more_links}
                            classNameSubLinks={style.links__more_subLinks}
                            classNameItem={style.links__more_item}
                        />
                        {!mobileSublinks ? (
                            <Link to={loginPath} className={style.login}>
                                <ProfileIcon className={style.login_icon} />
                                <p>{t('signIn')}</p>
                            </Link>
                        ) : null}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const {
        mobileSublinks: { data: mobileSublinks },
    } = state;

    return {
        mobileSublinks,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        clearMobileLinks: () => mobileSublinksActions.clear(),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps),
    withGetService(),
    withRouter,
)(MobileMenu);
