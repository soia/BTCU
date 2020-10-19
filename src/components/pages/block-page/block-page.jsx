import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from '../../../utils';
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

        return (
            <div className={style.block}>
                <h1 className={style.block__title}>
                    BTCU{t(' blockHeight')} #{block}
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
            </div>
        );
    }
}

export default compose(withTranslation(), withRouter)(BlockPage);
