import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import style from './first-screen.module.scss';
import HomeHeader from '../../../layouts/header/header-home';
import ArrowDownIcon from '../../../assets/images/icons/arrow-down-icon';
import SearchIcon from '../../../assets/images/icons/search-icon';
import verctor1 from './images/vector1.svg';
import verctor2 from './images/vector2.svg';

const FirstScreen = () => {
    const { t } = useTranslation();

    return (
        <div className={style.firstScreen}>
            <HomeHeader />
            <div className={style.firstScreen__container}>
                <h1 className={style.firstScreen__title}>
                    The <span>BTCU</span> Explorer
                </h1>
                <div className={style.filter}>
                    <div className={style.filter__allFilters}>
                        <p className={style.filter__allFilters_text}>{t('allFilters')}</p>
                        <ArrowDownIcon className={style.filter__allFilters_arrowDown} />
                    </div>
                    <div className={style.filter__inputtWrapper}>
                        <input
                            type="text"
                            className={style.filter__inputtWrapper_input}
                            placeholder={t('searchBy')}
                        />
                        <button
                            className={style.filter__inputtWrapper_button}
                            type="button"
                        >
                            <SearchIcon className={style.filter__inputtWrapper_searchIcon} />
                        </button>
                    </div>
                </div>
                <h3 className={style.firstScreen__subTitle}>
                    {t('sponsored')}: {t('sponsorText')}.{' '}
                    <Link to="/">{t('learnMore')}.</Link>
                </h3>
            </div>
            <img className={style.firstScreen__vector1} src={verctor1} alt="verctor1" />
            <img className={style.firstScreen__vector2} src={verctor2} alt="verctor2" />
        </div>
    );
};

export default FirstScreen;
