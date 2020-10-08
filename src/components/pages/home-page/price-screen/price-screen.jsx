/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { compose } from '../../../../utils';
import btcuIcon from '../../../assets/images/icons/btcu-icon.svg';
import difficultyIcon from '../../../assets/images/icons/difficulty-icon.svg';
import locationIcon from '../../../assets/images/icons/market-cap-icon.svg';
import transactionsIcon from '../../../assets/images/icons/transactions-icon.svg';
import style from './price-screen.module.scss';

class PriceScreen extends Component {
    static defaultProps = {
        t: () => {},
    };

    static propTypes = {
        t: PropTypes.func,
    };

    state = {};

    render() {
        const { t } = this.props;

        return (
            <div className={style.priceScreen}>
                <div className={style.priceScreen__row}>
                    <div className={style.card}>
                        <img className={style.card__icon} src={btcuIcon} alt="btcuIcon" />
                        <div className={style.card__wrapper}>
                            <p className={style.card__title}>BTCU {t('price')}</p>
                            <Tooltip placement="top" title={t('viewHistoricalPrice')}>
                                <Link to="/" className={style.card__content}>
                                    <span className={style.card__content_price}>
                                        $340.16
                                    </span>{' '}
                                    @ 0.03255 BTC{' '}
                                    <span className={style.card__content_small}>
                                        (-7.59%)
                                    </span>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={style.card}>
                        <img
                            className={style.card__icon}
                            src={transactionsIcon}
                            alt="transactionsIcon"
                        />
                        <div className={style.card__wrapper}>
                            <p className={style.card__title}>{t('transactions')}</p>
                            <Tooltip placement="top" title={t('transactionsCounter')}>
                                <Link to="/" className={style.card__content}>
                                    <span className={style.card__content_price}>
                                        844.34 M{' '}
                                    </span>
                                    <span className={style.card__content_small}>
                                        (14.3 TPS)
                                    </span>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__title}>MED GAS {t('price')}</p>
                            <Tooltip placement="top" title={t('viewMore')}>
                                <Link to="/" className={style.card__content}>
                                    <span className={style.card__content_price}>
                                        150 Gwei{' '}
                                    </span>
                                    <span className={style.card__content_small}>
                                        ($1.07)
                                    </span>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className={style.priceScreen__row}>
                    <div className={style.card}>
                        <img
                            className={style.card__icon}
                            src={locationIcon}
                            alt="locationIcon"
                        />
                        <div className={style.card__wrapper}>
                            <p className={style.card__title}>MARKET CAP</p>
                            <Tooltip placement="top" title={t('viewMore')}>
                                <Link to="/" className={style.card__content}>
                                    <span className={style.card__content_price}>
                                        $38,337,813,620
                                    </span>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={style.card}>
                        <img
                            className={style.card__icon}
                            src={difficultyIcon}
                            alt="difficultyIcon"
                        />
                        <div className={style.card__wrapper}>
                            <p className={style.card__title}>DIFFICULTY</p>
                            <Tooltip placement="top" title={t('viewGrowthChart')}>
                                <Link to="/" className={style.card__content}>
                                    <span className={style.card__content_price}>
                                        3,256.38 TH
                                    </span>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                    <div className={style.card}>
                        <div className={style.card__wrapper}>
                            <p className={style.card__title}>HASH RATE</p>
                            <Tooltip placement="top" title={t('averageHashRate')}>
                                <Link to="/" className={style.card__content}>
                                    <span className={style.card__content_price}>
                                        255,298.56 GH/s
                                    </span>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(withTranslation())(PriceScreen);
