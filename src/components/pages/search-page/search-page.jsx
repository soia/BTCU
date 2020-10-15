import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SearchIcon from '../../assets/images/icons/search-icon';
import SearchFilter from '../../layouts/search-filter/search-filter';
import btcuIcon from '../../assets/images/icons/btcu-blue-dark-icon.svg';
import style from './search-page.module.scss';

const SearchPage = () => {
    const { t } = useTranslation();

    const data = [
        {
            address: '3DJaWf3ZtLDWinX9kdADnsBVVuHdnkCLU9',
            lastReceived: '2020-08-30 21:02',
            balance: '0.00000000 BTC',
            link: 'https://blockchair.com/ru/bitcoin/address/3DJaWf3ZtLDWinX9kdADnsB',
        },
        {
            address: '3DJaWf3sdfZtLDWinX9kdADnsBVVuHdnkCLU9',
            lastReceived: '2020-08-30 21:02',
            balance: '0.00000000 BTC',
            link: 'https://blockchair.com/ru/bitcoin/address/3DJaWf3ZtLDWinX9kdADnsB',
        },
        {
            address: '3DJaWf3sdfZdefgtLDWinX9kdADnsBVVuHdnkCLU9',
            lastReceived: '2020-08-30 21:02',
            balance: '0.00000000 BTC',
            link: 'https://blockchair.com/ru/bitcoin/address/3DJaWf3ZtLDWinX9kdADnsB',
        },
        {
            address: '3DJaWf3sdfZewrdefgtLDWinX9kdADnsBVVuHdnkCLU9',
            lastReceived: '2020-08-30 21:02',
            balance: '0.00000000 BTC',
            link: 'https://blockchair.com/ru/bitcoin/address/3DJaWf3ZtLDWinX9kdADnsB',
        },
        {
            address: '3DJaWf3sduykfZdefgtLDWinX9kdADnsBVVuHdnkCLU9',
            lastReceived: '2020-08-30 21:02',
            balance: '0.00000000 BTC',
            link: 'https://blockchair.com/ru/bitcoin/address/3DJaWf3ZtLDWinX9kdADnsB',
        },
        {
            address: '3DJaWf3sdfZde678fgtLDWinX9kdADnsBVVuHdnkCLU9',
            lastReceived: '2020-08-30 21:02',
            balance: '0.00000000 BTC',
            link: 'https://blockchair.com/ru/bitcoin/address/3DJaWf3ZtLDWinX9kdADnsB',
        },
        {
            address: '3DJaWf3sdfZdeyukerfgtLDWinX9kdADnsBVVuHdnkCLU9',
            lastReceived: '2020-08-30 21:02',
            balance: '0.00000000 BTC',
            link: 'https://blockchair.com/ru/bitcoin/address/3DJaWf3ZtLDWinX9kdADnsB',
        },
        {
            address: '3DJaWf3sdfZdslldkrgefgtLDWinX9kdADnsBVVuHdnkCLU9',
            lastReceived: '2020-08-30 21:02',
            balance: '0.00000000 BTC',
            link: 'https://blockchair.com/ru/bitcoin/address/3DJaWf3ZtLDWinX9kdADnsB',
        },
    ];

    return (
        <div className={style.search}>
            <div className={style.search__container}>
                <h1 className={style.search__title}>{t('searchResults')}</h1>
                <SearchFilter
                    button={(
                        <button className={style.filter__button} type="submit">
                            <SearchIcon className={style.filter__searchIcon} />
                        </button>
                    )}
                    inputClassName={style.filter__input}
                    filterClassName={style.filter}
                />
                <div className={style.result}>
                    {data.map(item => {
                        const {
                            address, lastReceived, balance, link,
                        } = item;

                        return (
                            <div key={address} className={style.result__item}>
                                <div className={style.result__item_row}>
                                    <img
                                        className={style.result__item_img}
                                        src={btcuIcon}
                                        alt="btcuIcon"
                                    />
                                    <Link to="/" className={style.result__item_address}>
                                        {address}
                                    </Link>
                                </div>
                                <p className={style.result__item_info}>
                                    {t('lastReceived')}: {lastReceived}
                                </p>
                                <p className={style.result__item_info}>
                                    {t('balance')}: {balance}
                                </p>
                                <a
                                    href="/"
                                    target="_blank"
                                    className={style.result__item_link}
                                >
                                    {link}
                                </a>
                            </div>
                        );
                    })}

                    {!data.length ? <p className={style.nothingFound}>{t('nothingFound')}</p> : null }
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
