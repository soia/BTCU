/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import ArrowRightIcon from '../../../assets/images/icons/arrow-right';
import { compose } from '../../../../utils';
import { blockPath } from '../../../../constants';
import logo from '../../../assets/images/icons/btcu-blue-icon.svg';
import style from './latest-screen.module.scss';
import Button from '../../../UI/button';

class LatestScreen extends Component {
    static defaultProps = {
        t: () => {},
        history: {},
    };

    static propTypes = {
        t: PropTypes.func,
        history: PropTypes.object,
    };

    state = {};

    pushToAll = () => {
        const { history } = this.props;
        history.push('/');
    };

    render() {
        const { t } = this.props;

        const data = [
            {
                number: '0xw62a965fb2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0xe62a965b2dgcc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0xw62a3965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62wa965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0xe62a965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62ar965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62hafg965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x6h2a965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62at965b2cc',
                time: '29 secs ago',
                from: '0x5852b7c16fdc8b45540dc30x5852b7c16fdc8b45540dc3',
                to: '0xf0a540f934fce68ede99f3g0xf0a540f934fce68ede99f3g',
                reward: '24.40335',
            },
            {
                number: '0x62ha9ew65b2cc',
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
                        <Button
                            className={style.latest__header_button}
                            onClick={this.pushToAll}
                            type="button"
                        >
                            <ArrowRightIcon className={style.latest__header_buttonIcon} />
                            {t('viewAll')}
                        </Button>
                    </div>
                    {data.map(item => {
                        const {
                            number, time, from, to, reward,
                        } = item;

                        return (
                            <div key={number} className={style.card}>
                                <img className={style.card__logo} src={logo} alt="logo" />
                                <div
                                    className={classNames(
                                        style.card__item,
                                        style.card__item_info,
                                    )}
                                >
                                    <Link
                                        to={`${blockPath}/${number}`}
                                        className={classNames(
                                            style.card__item_red,
                                            style.card__item_tx,
                                        )}
                                    >
                                        {number}
                                    </Link>
                                    <p className={style.card__item_gray}>{time}</p>
                                </div>
                                <div
                                    className={classNames(
                                        style.card__item,
                                        style.card__item_addresses,
                                    )}
                                >
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
                        <Button
                            className={style.latest__header_button}
                            onClick={this.pushToAll}
                            type="button"
                        >
                            <ArrowRightIcon className={style.latest__header_buttonIcon} />
                            {t('viewAll')}
                        </Button>
                    </div>
                    {data.map(item => {
                        const {
                            number, time, from, to, reward,
                        } = item;

                        return (
                            <div key={number} className={style.card}>
                                <img className={style.card__logo} src={logo} alt="logo" />
                                <div
                                    className={classNames(
                                        style.card__item,
                                        style.card__item_info,
                                    )}
                                >
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
                                <div
                                    className={classNames(
                                        style.card__item,
                                        style.card__item_addresses,
                                    )}
                                >
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

export default compose(withTranslation(), withRouter)(LatestScreen);
