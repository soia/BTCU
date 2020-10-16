import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import MobileMenu from '../../mobile-menu';
import ListOfLinks from '../header-links';
import ListOfMoreLinks from '../header-more-links';
import { loginPath } from '../../../../constants';
import SelectLangeage from '../../../language';
import ProfileIcon from '../../../assets/images/icons/profile-icon';
import logo from '../../../assets/images/logos/btcu.svg';
import style from './header-home.module.scss';

const HomeHeader = () => {
    const { t } = useTranslation();

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
                <SelectLangeage />
            </div>
            <MobileMenu />
        </header>
    );
};

export default HomeHeader;
