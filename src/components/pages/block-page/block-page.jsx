import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from '../../../utils';
import Code from './raw-block';
import style from './block-page.module.scss';

class BlockPage extends Component {
    static defaultProps = {
        t: () => {},
        match: {},
    };

    static propTypes = {
        t: PropTypes.func,
        match: PropTypes.object,
    };

    state = {
        block: '',
    };

    componentDidMount() {
        const {
            match: {
                params: { id },
            },
        } = this.props;

        this.setState({
            block: id,
        });
    }

    render() {
        const { t } = this.props;
        const { block } = this.state;
        const { TabPane } = Tabs;

        const data = [
            {
                hash: '391f9f023247c70391f9f0023247c70',
                valueOut: '0.0234 BTCU',
                fromAmount: 'Generation + Fees',
                toAmount: 'Included in following transaction(s)',
                price: '4.99957782 BTCU',
                isLink: false,
            },
            {
                hash: '391f9f023247c71',
                valueOut: '0.023402340234023402340234 BTCU',
                fromAmount: 'D8EBSr6rat23Dyt1cRfK44U6NAJEdQe9',
                toAmount: 'D8EBSr6rat23Dyt1cRfK44U6NAyt1cRfK44U6NAJEdZHQe9',
                price: '523.0234023402340234023402340234023434375 BTCU',
                isLink: true,
            },
            {
                hash: '391f9f023247c72',
                valueOut: '0.02340BTCU',
                fromAmount: 'D8EBSr6rat23Dyt1cRfK44U6NAJEdZHQe9Dwd',
                toAmount: 'D8EBSr6rat23Dyt1cRfK44U6NAJEdZHQe9D8EB',
                price: '523.0234234 BTCU',
                isLink: true,
            },
            {
                hash: '391f9f023247c73',
                valueOut: '0.0234 BTCU',
                fromAmount: 'D8EBSr6rat23Dyt1cRfK44UAJEdZHQe9',
                toAmount: 'D8EBSr6rat23Dyt1cRfEBSr6rat23Dyt1cRfK44U6NAJEdZHQe9',
                price: '523.03434375 BTCU',
                isLink: true,
            },
        ];

        return (
            <div className={style.block}>
                <h1 className={style.block__title}>
                    BTCU{' '}{t('blockHeight')} #{block}
                </h1>
                <div className={style.block__top}>
                    <Link to="/" className={style.block__top_address}>
                        435483f302b54d553fa265364137878214c019be83940a5187a631cc8880df2a
                    </Link>
                    <div className={style.block__top_wrapper}>
                        <p className={style.block__top_date}>
                            2020-10-05 13:01:45 {t('extractedProofOfStake')}
                        </p>
                        <p className={style.block__top_transactions}>
                            {t('transactions')}: 4 <span>0.8 kB</span>
                        </p>
                    </div>
                </div>
                <div className={style.block__bottom}>
                    <div className={style.block__bottom_item}>
                        <p className={style.block__bottom_label}>{t('valueOut')}</p>
                        <p className={style.block__bottom_value}>528.79732796 BTCU</p>
                    </div>
                    <div className={style.block__bottom_item}>
                        <p className={style.block__bottom_label}>{t('difficulty')}</p>
                        <p className={style.block__bottom_value}>10776.3455936409</p>
                    </div>
                    <div className={style.block__bottom_item}>
                        <p className={style.block__bottom_label}>{t('outstanding')}</p>
                        <p className={style.block__bottom_value}>-67,421,881.343 BTCU</p>
                    </div>
                    <div className={style.block__bottom_item}>
                        <p className={style.block__bottom_label}>{t('created')}</p>
                        <p className={style.block__bottom_value}>4.99957782 BTCU</p>
                    </div>
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={t('transaction')} key="1">
                        <div className={style.transaction}>
                            {data.map(item => {
                                const {
                                    hash,
                                    valueOut,
                                    fromAmount,
                                    toAmount,
                                    price,
                                    isLink,
                                } = item;

                                return (
                                    <div key={hash} className={style.transaction__row}>
                                        <div className={style.transaction__item_hash}>
                                            <p className={style.transaction__item_label}>
                                                {t('hash')}
                                            </p>
                                            <Link to="/">{hash}</Link>
                                        </div>
                                        <div className={style.transaction__item_valueOut}>
                                            <p className={style.transaction__item_label}>
                                                {t('valueOut')}
                                            </p>
                                            <span>{valueOut}</span>
                                        </div>
                                        <div
                                            className={style.transaction__item_fromAmount}
                                        >
                                            <p className={style.transaction__item_label}>
                                                {t('fromAmount')}
                                            </p>
                                            {isLink ? (
                                                <Link to="/">{fromAmount}</Link>
                                            ) : (
                                                <span>{fromAmount}</span>
                                            )}
                                        </div>
                                        <div className={style.transaction__item_toAmount}>
                                            <p className={style.transaction__item_label}>
                                                {t('toAmount')}
                                            </p>
                                            {isLink ? (
                                                <Link to="/">{fromAmount}</Link>
                                            ) : (
                                                <span>{toAmount}</span>
                                            )}
                                        </div>
                                        <div className={style.transaction__item_price}>
                                            <p
                                                className={style.transaction__item_label}
                                            />
                                            <span>{price}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </TabPane>
                    <TabPane tab={t('rawBlock')} key="2">
                        <div className={style.rawBlock}>
                            <div className={style.rawBlock__wrapper}>
                                <Code />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default compose(withTranslation(), withRouter)(BlockPage);
