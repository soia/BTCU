/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { compose } from '../../../../utils';
import style from './block-screen.module.scss';

class BlockScreen extends Component {
    static defaultProps = {
        t: () => {},
    };

    static propTypes = {
        t: PropTypes.func,
    };

    state = {};

    render() {
        const { t } = this.props;

        const blockIndexData = [
            {
                title: t('lastIndexedBlock'),
                value: '2539166',
                link: '/',
            },
            {
                title: t('latestBlockHash'),
                value: '0xf0a540f934fce68ede99f3dsafaGUH223g',
                link: null,
            },
            {
                title: t('lastBlockUpdate'),
                value: 'Wed, 07 Oct 2020 11:38:46 UTC',
                link: null,
            },
            {
                title: t('difficulty'),
                value: '9355.3434537458',
                link: null,
            },
            {
                title: t('totalMoneySupply'),
                value: '56.38.34345374586684',
                link: null,
            },
            {
                title: t('zerocoinSupply'),
                value: '829188 BTCU (14705.43%)',
                link: null,
            },
            {
                title: t('masternodeCount'),
                value: '1708',
                link: null,
            },
            {
                title: t('nextSuperblock'),
                value: '2588004',
                link: null,
            },
        ];

        const zerocoinSupplyData = [
            {
                title: '1-denon',
                value: '2715',
                price: '28545 BTCU (456.34%)',
            },
            {
                title: '5-denon',
                value: '28444',
                price: '28545 BTCU (456.34%)',
            },
            {
                title: '10-denon',
                value: '5978',
                price: '28545 BTCU (456.34%)',
            },
            {
                title: '50-denon',
                value: '1157',
                price: '28545 BTCU (456.34%)',
            },
            {
                title: '100-denon',
                value: '1686',
                price: '28545 BTCU (456.34%)',
            },
            {
                title: '500-denon',
                value: '247',
                price: '28545 BTCU (456.34%)',
            },
            {
                title: '1000-denon',
                value: '201',
                price: '28545 BTCU (456.34%)',
            },
            {
                title: '5000-denon',
                value: '34',
                price: '28545 BTCU (456.34%)',
            },
        ];

        return (
            <div className={style.container}>
                <div className={style.container__column}>
                    <div className={style.container__header}>
                        <h3 className={style.container__column_title}>
                            {t('blockIndex')}
                        </h3>
                    </div>
                    <div className={style.container__wrapper}>
                        {blockIndexData.map(item => {
                            const { title, value, link } = item;

                            return (
                                <div key={title} className={style.container__item}>
                                    <Tooltip placement="top" title={title}>
                                        <p className={style.container__item_label}>
                                            {title}
                                        </p>
                                    </Tooltip>
                                    {link ? (
                                        <Link
                                            to={link}
                                            className={style.container__item_link}
                                        >
                                            {value}
                                        </Link>
                                    ) : (
                                        <p className={style.container__item_content}>
                                            {value}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={style.container__column}>
                    <div className={style.container__header}>
                        <h3 className={style.container__column_title}>
                            {t('zerocoinSupply')}
                        </h3>
                    </div>
                    <div className={style.container__wrapper}>
                        {zerocoinSupplyData.map(item => {
                            const { title, value, price } = item;

                            return (
                                <div key={title} className={style.container__itemZerocoin}>
                                    <Tooltip placement="top" title={title}>
                                        <p className={style.container__itemZerocoin_labelZerocoin}>
                                            {title}
                                        </p>
                                    </Tooltip>
                                    <p className={style.container__itemZerocoin_contentZerocoin}>
                                        {value}
                                    </p>
                                    <p className={style.container__itemZerocoin_priceZerocoin}>
                                        {price}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(withTranslation(), withRouter)(BlockScreen);
