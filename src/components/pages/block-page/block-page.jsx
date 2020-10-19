import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
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
        const { match: { params: { id } } } = this.props;

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
                    {t('BTCU block height')}{' '}#{block}
                </h1>
            </div>
        );
    }
}

export default compose(withTranslation(), withRouter)(BlockPage);
