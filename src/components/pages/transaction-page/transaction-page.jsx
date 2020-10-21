import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';
import { store } from 'react-notifications-component';
import { Tabs } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from '../../../utils';
import Code from './raw-block';
import ArrowDownRedFilledIcon from '../../assets/images/icons/arrow-down-red-filled-icon';
import CopyIcon from '../../assets/images/icons/copy-icon';
import ClockIcon from '../../assets/images/icons/clock-icon';
import { loginPath, blockPath } from '../../../constants/pathLocation';
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

    copied = () => {
        const { t } = this.props;
        store.addNotification({
            title: t('successNotification'),
            message: t('сopiedToClipboard'),
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'slideInRight'],
            animationOut: ['animated', 'zoomOut'],
            dismiss: {
                duration: 3000,
                pauseOnHover: true,
            },
        });
    };

    render() {
        const { t } = this.props;
        const { transaction } = this.state;
        const { TabPane } = Tabs;
        console.log(transaction, 'transaction');
        const ADDRESS = '0x4fd06d12026024aa3fd23f31e707cf6e8975c36a54685d5654f1a868f168190e';

        return (
            <div className={style.block}>
                <h1 className={style.block__title}>{t('transactionDetails')}</h1>
                <p className={style.block__subTitle}>
                    {t('featuredTrackDeposits')} <a href="/">BeaconScan.com!</a>
                </p>
                <Tabs defaultActiveKey="4">
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
                                <span>
                                    {t('proofStakeFees')}: 0.0063640918 BTCU ($2.16)
                                </span>
                                <span>{t('added')}: Sep 22 2020 02:46:17 (PM +UTC)</span>
                            </div>
                        </div>
                        <div className={style.transBlock}>
                            <div className={style.transBlock__hash}>
                                <p className={style.transBlock__label}>
                                    {t('transactionHash')}:
                                </p>
                                <div className={style.transBlock__hashWrapper}>
                                    <p>{ADDRESS}</p>
                                    <CopyToClipboard text={ADDRESS} onCopy={this.copied}>
                                        <div className={style.transBlock__copy}>
                                            <CopyIcon />
                                        </div>
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <div className={style.transBlock__block}>
                                <p className={style.transBlock__label}>{t('block')}:</p>
                                <div>
                                    <Link
                                        to={`${blockPath}/${10912924}`}
                                        className={style.transBlock__block_blockNumber}
                                    >
                                        10912924
                                    </Link>
                                    <span
                                        className={style.transBlock__block_confirmations}
                                    >
                                        113 {t('blockConfirmations')}
                                    </span>
                                </div>
                            </div>
                            <div className={style.transBlock__timestamp}>
                                <p className={style.transBlock__label}>
                                    {t('timestamp')}:
                                </p>
                                <div className={style.transBlock__timestampWrapper}>
                                    <p
                                        className={
                                            style.transBlock__timestampWrapper_left
                                        }
                                    >
                                        <ClockIcon />
                                        24 mins ago (Sep-22-2020 02:46:17)
                                    </p>
                                    <p
                                        className={
                                            style.transBlock__timestampWrapper_right
                                        }
                                    >
                                        <ClockIcon />
                                        {t('confirmedWithinSecs', { digit: 30 })}
                                    </p>
                                </div>
                            </div>
                            <div className={style.transBlock__from}>
                                <p className={style.transBlock__label}>{t('from')}:</p>
                                <div className={style.transBlock__fromWrapper}>
                                    <p>{ADDRESS}</p>
                                    <CopyToClipboard text={ADDRESS} onCopy={this.copied}>
                                        <div className={style.transBlock__copy}>
                                            <CopyIcon />
                                        </div>
                                    </CopyToClipboard>
                                    <img
                                        className={style.transBlock__from_successIcon}
                                        src={successIcon}
                                        alt="icon"
                                    />
                                </div>
                            </div>
                            <div className={style.transBlock__interacted}>
                                <p className={style.transBlock__label}>
                                    {t('interactedWithTo')}:
                                </p>
                                <div className={style.transBlock__interactedWr}>
                                    <span
                                        className={
                                            style.transBlock__interactedWr_contract
                                        }
                                    >
                                        {t('contract')}
                                    </span>
                                    <p>{ADDRESS}</p>
                                    <CopyToClipboard text={ADDRESS} onCopy={this.copied}>
                                        <div className={style.transBlock__copy}>
                                            <CopyIcon />
                                        </div>
                                    </CopyToClipboard>
                                    <span
                                        className={
                                            style.transBlock__interactedWr_redBoxDapp
                                        }
                                    >
                                        {t('redBoxDapp')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={style.inputs}>
                            <p className={style.inputs__title}>{t('inputs')}</p>
                            <div className={style.inputs__wrapper}>
                                <div className={style.inputs__indexItem}>
                                    <p className={style.inputs__label}>{t('index')}</p>
                                    <p className={style.inputs__black}>0</p>
                                </div>
                                <div className={style.inputs__outputItem}>
                                    <p className={style.inputs__label}>
                                        {t('previousOutput')}
                                    </p>
                                    <Link
                                        to="/"
                                        className={style.inputs__outputItem_output}
                                    >
                                        85a0d38c114847dfjhfjewfhj234
                                    </Link>
                                    <p style={{ whiteSpace: 'nowrap' }}>
                                        <span className={style.inputs__black}>
                                            {t('in')}
                                        </span>{' '}
                                        <Link
                                            to="/"
                                            className={style.inputs__outputItem_block}
                                        >
                                            2454114
                                        </Link>
                                    </p>
                                </div>
                                <div className={style.inputs__addressItem}>
                                    <p className={style.inputs__label}>{t('address')}</p>
                                    <Link
                                        to="/"
                                        className={style.inputs__addressItem_address}
                                    >
                                        D6WRqaYKyUpA5TzeJ9386KTupo817eXmD6WRqaYKyUpA5TzeJ9386KTupo817eXm..
                                    </Link>
                                </div>
                                <div className={style.inputs__addressItem}>
                                    <p className={style.inputs__label}>{t('amount')}</p>
                                    <p className={style.inputs__black}>
                                        514.14285714 BTCU
                                    </p>
                                </div>
                            </div>
                            <p className={style.inputs__title}>{t('outputs')}</p>
                            <div className={style.inputs__wrapper}>
                                <div className={style.inputs__indexItem}>
                                    <p className={style.inputs__label}>{t('index')}</p>
                                    <p className={style.inputs__black}>0</p>
                                </div>
                                <div className={style.inputs__outputItem}>
                                    <p className={style.inputs__label}>
                                        {t('redeemedIn')}
                                    </p>
                                    <p className={style.inputs__gray}>
                                        {t('notYetRedeemed')}
                                    </p>
                                </div>
                                <div className={style.inputs__addressItem}>
                                    <p className={style.inputs__label}>{t('address')}</p>
                                    <Link
                                        to="/"
                                        className={style.inputs__addressItem_address}
                                    >
                                        D6WRqaYKyUpA5TzeJ9386KTupo817eXmD6WRqaYKyUpA5TzeJ9386KTupo817eXm..
                                    </Link>
                                </div>
                                <div className={style.inputs__addressItem}>
                                    <p className={style.inputs__label}>{t('amount')}</p>
                                    <p className={style.inputs__black}>
                                        514.14285714 BTCU
                                    </p>
                                </div>
                            </div>
                            <div className={style.inputs__wrapper}>
                                <div className={style.inputs__indexItem}>
                                    <p className={style.inputs__label}>{t('index')}</p>
                                    <p className={style.inputs__black}>1</p>
                                </div>
                                <div className={style.inputs__outputItem}>
                                    <p className={style.inputs__label}>
                                        {t('redeemedIn')}
                                    </p>
                                    <p className={style.inputs__gray}>
                                        {t('notYetRedeemed')}
                                    </p>
                                </div>
                                <div className={style.inputs__addressItem}>
                                    <p className={style.inputs__label}>{t('address')}</p>
                                    <Link
                                        to="/"
                                        className={style.inputs__addressItem_address}
                                    >
                                        D6WRqaYKyUpA5TzeJ9386KTupo817eXmD6WRqaYKyUpA5TzeJ9386KTupo817eXm..
                                    </Link>
                                </div>
                                <div className={style.inputs__addressItem}>
                                    <p className={style.inputs__label}>{t('amount')}</p>
                                    <p className={style.inputs__black}>
                                        514.14285714 BTCU
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={style.privateNote}>
                            {t('privateNote')}: {t('yoAccessPrivateNote')}{' '}
                            <Link to={loginPath}>{t('loggedIn')}</Link>
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
                        <div className={style.logs}>
                            <div className={style.logs__header}>
                                <p className={style.logs__title}>
                                    {t('transactionReceiptEventLogs')}
                                </p>
                                <div
                                    className={classNames(
                                        style.logs__left,
                                        style.logs__left_mobile,
                                    )}
                                >
                                    <span>69</span>
                                </div>
                            </div>
                            <div className={style.logs__wrapper}>
                                <div className={style.logs__left}>
                                    <span>69</span>
                                </div>
                                <div>
                                    <div className={style.logs__wrapper_item}>
                                        <p className={style.logs__wrapper_label}>
                                            {t('address')}
                                        </p>
                                        <Link className={style.logs__link} to="/">
                                            {ADDRESS} {t('matchesTopics')}
                                        </Link>
                                    </div>
                                    <div className={style.logs__wrapper_item}>
                                        <p className={style.logs__wrapper_label}>
                                            {t('name')}
                                        </p>
                                        <p>
                                            <span className={style.logs__black}>
                                                {t('transfer')} (index_topic_1
                                            </span>{' '}
                                            <span className={style.logs__green}>
                                                address
                                            </span>{' '}
                                            <span className={style.logs__red}>from </span>
                                            <span className={style.logs__black}>
                                                index_topic_2
                                            </span>{' '}
                                            <span className={style.logs__green}>
                                                address
                                            </span>{' '}
                                            <span className={style.logs__red}>to </span>
                                            <span className={style.logs__green}>
                                                uint256
                                            </span>{' '}
                                            <span className={style.logs__red}>
                                                tokens
                                            </span>
                                            <span className={style.logs__black}>) </span>
                                            <Link className={style.logs__link} to="/">
                                                {t('viewSource')}
                                            </Link>
                                        </p>
                                    </div>
                                    <div className={style.logs__wrapper_item}>
                                        <p className={style.logs__wrapper_label}>
                                            {t('topics')}
                                        </p>
                                        <div>
                                            <p className={style.logs__topicItem}>
                                                <span className={style.logs__index}>
                                                    0
                                                </span>
                                                <span className={style.logs__black}>
                                                    {ADDRESS}
                                                </span>
                                            </p>
                                            <p className={style.logs__topicItem}>
                                                <span className={style.logs__index}>
                                                    1
                                                </span>
                                                <span className={style.logs__dec}>
                                                    Dec
                                                </span>
                                                <Link to="/" className={style.logs__link}>
                                                    {ADDRESS}
                                                </Link>
                                            </p>
                                            <p className={style.logs__topicItem}>
                                                <span className={style.logs__index}>
                                                    2
                                                </span>
                                                <span className={style.logs__dec}>
                                                    Dec
                                                </span>
                                                <Link to="/" className={style.logs__link}>
                                                    {ADDRESS}
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                    <div className={style.logs__wrapper_item}>
                                        <p className={style.logs__wrapper_label}>
                                            {t('data')}
                                        </p>
                                        <div className={style.logs__data}>
                                            <span className={style.logs__data_tokens}>
                                                tokens:
                                            </span>
                                            <span className={style.logs__black}>
                                                1641318590960000000000
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab={t('state')} key="4">
                        <div className={style.state}>
                            <div className={style.state__item}>
                                <div className={style.state__addressItem}>
                                    <p className={style.state__label}>{t('address')}</p>
                                    <p className={style.state__addressItem_value}>
                                        0x7105ec15995a97496ec25de36cf7eec47b703375
                                    </p>
                                </div>
                                <div className={style.state__beforeItem}>
                                    <p className={style.state__label}>{t('before')}</p>
                                    <p className={style.state__beforeItem_value}>
                                        1,877.3065985 BTCU
                                    </p>
                                </div>
                                <div className={style.state__afterItem}>
                                    <p className={style.state__label}>{t('after')}</p>
                                    <p className={style.state__beforeItem_value}>1,877.3065985 BTCU</p>
                                </div>
                                <div className={style.state__stateItem}>
                                    <p className={style.state__label}>
                                        {t('stateDifference')}
                                    </p>
                                    <p className={style.state__stateItem_value}>
                                        0.00636409180
                                    </p>
                                </div>
                            </div>
                            <div className={style.state__item}>
                                <div className={style.state__addressItem}>
                                    <p className={style.state__label}>{t('address')}</p>
                                    <p className={style.state__addressItem_value}>
                                        0x7105ec15995a97496ec25de36cf7eec47b703375
                                    </p>
                                </div>
                                <div className={style.state__beforeItem}>
                                    <p className={style.state__label}>{t('before')}</p>
                                    <p className={style.state__beforeItem_value}>
                                        1,877.306598594643362884 BTCU
                                    </p>
                                    <p className={style.state__gray}>
                                        {t('nonce')}: 152724
                                    </p>
                                </div>
                                <div className={style.state__afterItem}>
                                    <p className={style.state__label}>{t('after')}</p>
                                    <p className={style.state__beforeItem_value}>
                                    1,877.3065985 BTCU
                                    </p>
                                    <p className={style.state__gray}>
                                        {t('nonce')}: 152724
                                    </p>
                                </div>
                                <div className={style.state__stateItem}>
                                    <p className={style.state__label}>
                                        {t('stateDifference')}
                                    </p>
                                    <p className={style.state__stateItem_value}>
                                        0.00636409180
                                    </p>
                                </div>
                            </div>
                            <div className={style.state__item}>
                                <div className={style.state__addressItem}>
                                    <p className={style.state__label}>{t('address')}</p>
                                    <p className={style.state__addressItem_value}>
                                        0x7105ec15995a97496ec25de36cf7eec47b703375
                                    </p>
                                </div>
                                <div className={style.state__beforeItem}>
                                    <p className={style.state__label} />
                                    <p className={style.state__beforeItem_value} style={{ display: 'flex' }}>
                                        RBD{' '}
                                        <span
                                            className={style.state__beforeItem_more}
                                        >
                                            {t('more')} <ArrowDownRedFilledIcon />
                                        </span>
                                    </p>
                                </div>
                            </div>
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
