import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Overview from './overview';
import StateBlock from './state-block';
import Logs from './logs';
import { compose } from '../../../utils';
import Code from './raw-block';
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
                        <Overview />
                    </TabPane>
                    <TabPane tab={t('rawTransaction')} key="2">
                        <div className={style.rawBlock}>
                            <div className={style.rawBlock__wrapper}>
                                <Code />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab={t('logs')} key="3">
                        <Logs />
                    </TabPane>
                    <TabPane tab={t('state')} key="4">
                        <StateBlock />
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
