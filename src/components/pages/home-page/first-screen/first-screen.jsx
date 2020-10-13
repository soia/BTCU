import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import style from './first-screen.module.scss';
import SearchIcon from '../../../assets/images/icons/search-icon';
import SearchFilter from '../../../layouts/search-filter/search-filter';
import HomeHeader from '../../../layouts/header/header-home';
import verctor1 from './images/vector1.svg';
import verctor2 from './images/vector2.svg';
import mobileVerctor from './images/mobile-vector.svg';

const FirstScreen = () => {
    const { t } = useTranslation();

    return (
        <div className={style.firstScreen}>
            <HomeHeader />
            <div className={style.firstScreen__container}>
                <h1 className={style.firstScreen__title}>
                    The <span>BTCU</span> Explorer
                </h1>
                <SearchFilter
                    button={(
                        <button
                            className={style.filter__button}
                            type="submit"
                        >
                            <SearchIcon className={style.filter__searchIcon} />
                        </button>
                    )}
                    inputClassName={style.filter__input}
                />
                <h3 className={style.firstScreen__subTitle}>
                    {t('sponsored')}: {t('sponsorText')}.{' '}
                    <Link to="/">{t('learnMore')}.</Link>
                </h3>
            </div>
            <img className={style.firstScreen__vector1} src={verctor1} alt="verctor1" />
            <img className={style.firstScreen__vector2} src={verctor2} alt="verctor2" />
            <img className={style.firstScreen__vector3} src={mobileVerctor} alt="verctor" />
        </div>
    );
};

export default FirstScreen;
