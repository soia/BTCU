import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from '../../../utils';
import Code from './raw-block';
import successIcon from '../../assets/images/icons/success-icon.svg';
import style from './transaction-page.module.scss';

class TransactionPage extends Component {
    static defaultProps = {
        t: () => {},
        match: {},
    };

    static propTypes = {
        t: PropTypes.func,
        match: PropTypes.object,
    };

    state = {
        transaction: '',
    };

    componentDidMount() {
        const {
            match: {
                params: { id },
            },
        } = this.props;

        this.setState({
            transaction: id,
        });
    }

    render() {
        const { t } = this.props;
        const { transaction } = this.state;
        const { TabPane } = Tabs;
        console.log(transaction, 'transaction');

        return (
            <div className={style.block}>
                <h1 className={style.block__title}>{t('transactionDetails')}</h1>
                <p className={style.block__subTitle}>
                    {t('featuredTrackDeposits')} <a href="/">BeaconScan.com!</a>
                </p>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={t('overview')} key="1">
                        <div className={style.totalOutput}>
                            <div className={style.totalOutput__top}>
                                {t('totalOutput')}:
                                <span className={style.totalOutput__top_amount}>
                                    10 BTCU
                                </span>
                                ($550.00)
                                <img
                                    className={style.totalOutput__top_icon}
                                    src={successIcon}
                                    alt="icon"
                                />
                                <span className={style.totalOutput__top_success}>
                                    {t('success')}
                                </span>
                            </div>
                            <div className={style.totalOutput__bottom}>
                                <span>{t('proofStakeFees')}: 0.0063640918 BTCU ($2.16)</span>
                                <span>{t('added')}: Sep 22 2020 02:46:17 (PM +UTC)</span>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab={t('rawTransaction')} key="2">
                        <div className={style.rawBlock}>
                            <div className={style.rawBlock__wrapper}>
                                <Code />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab={t('logs')} key="3">
                        <div className={style.rawBlock}>
                            <div className={style.rawBlock__wrapper}>3</div>
                        </div>
                    </TabPane>
                    <TabPane tab={t('state')} key="4">
                        <div className={style.rawBlock}>
                            <div className={style.rawBlock__wrapper}>4</div>
                        </div>
                    </TabPane>
                    <TabPane tab={t('comments')} key="5">
                        <div className={style.rawBlock}>
                            <div className={style.rawBlock__wrapper}>5</div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default compose(withTranslation(), withRouter)(TransactionPage);
