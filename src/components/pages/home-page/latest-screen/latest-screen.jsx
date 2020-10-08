/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { compose } from '../../../../utils';
import logo from '../../../assets/images/icons/btcu-blue-icon.svg';
import style from './latest-screen.module.scss';

class LatestScreen extends Component {
    static defaultProps = {
        t: () => {},
    };

    static propTypes = {
        t: PropTypes.func,
    };

    state = {};

    render() {
        const { t } = this.props;

        const data = [
            {
                number: '0x62a965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62a965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62a965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62a965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62a965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62a965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62a965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62a965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62a965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62a965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
        ];

        return (
            <div className={style.latest}>
                <div className={style.latest__column}>
                    <div className={style.latest__header}>
                        <h3 className={style.latest__column_title}>
                            {t('latestsBlocks')}
                        </h3>
                        <button>{t('viewAll')}</button>
                    </div>
                    {data.map(item => {
                        const {
                            number, time, from, to, reward,
                        } = item;

                        return (
                            <div className={style.card}>
                                <img className={style.card__logo} src={logo} alt="logo" />
                                <div className={style.card__item}>
                                    <Link
                                        to="/"
                                        className={classNames(
                                            style.card__item_red,
                                            style.card__item_tx,
                                        )}
                                    >
                                        {number}
                                    </Link>
                                    <p className={style.card__item_gray}>{time}</p>
                                </div>
                                <div className={style.card__item}>
                                    <div className={style.card__item_row}>
                                        <p className={style.card__item_label}>
                                            {t('from')}
                                        </p>
                                        <Link
                                            to="/"
                                            className={classNames(
                                                style.card__item_red,
                                                style.card__item_address,
                                            )}
                                        >
                                            {from}
                                        </Link>
                                    </div>
                                    <div className={style.card__item_row}>
                                        <p className={style.card__item_label}>
                                            {t('to')}
                                        </p>
                                        <Link
                                            to="/"
                                            className={classNames(
                                                style.card__item_red,
                                                style.card__item_address,
                                            )}
                                        >
                                            {to}
                                        </Link>
                                    </div>
                                </div>
                                <Tooltip placement="top" title={t('blockReward')}>
                                    <div className={style.card__reward}>
                                        {reward} BTCU
                                    </div>
                                </Tooltip>
                            </div>
                        );
                    })}
                </div>
                <div className={style.latest__column}>
                    <div className={style.latest__header}>
                        <h3 className={style.latest__column_title}>
                            {t('latestsTransactions')}
                        </h3>
                        <button>{t('viewAll')}</button>
                    </div>
                    {data.map(item => {
                        const {
                            number, time, from, to, reward,
                        } = item;

                        return (
                            <div className={style.card}>
                                <img className={style.card__logo} src={logo} alt="logo" />
                                <div className={style.card__item}>
                                    <Link
                                        to="/"
                                        className={classNames(
                                            style.card__item_red,
                                            style.card__item_tx,
                                        )}
                                    >
                                        {number}
                                    </Link>
                                    <p className={style.card__item_gray}>{time}</p>
                                </div>
                                <div className={style.card__item}>
                                    <div className={style.card__item_row}>
                                        <p className={style.card__item_label}>
                                            {t('from')}
                                        </p>
                                        <Link
                                            to="/"
                                            className={classNames(
                                                style.card__item_red,
                                                style.card__item_address,
                                            )}
                                        >
                                            {from}
                                        </Link>
                                    </div>
                                    <div className={style.card__item_row}>
                                        <p className={style.card__item_label}>
                                            {t('to')}
                                        </p>
                                        <Link
                                            to="/"
                                            className={classNames(
                                                style.card__item_red,
                                                style.card__item_address,
                                            )}
                                        >
                                            {to}
                                        </Link>
                                    </div>
                                </div>
                                <Tooltip placement="top" title={t('blockReward')}>
                                    <div className={style.card__reward}>
                                        {reward} BTCU
                                    </div>
                                </Tooltip>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default compose(withTranslation())(LatestScreen);
