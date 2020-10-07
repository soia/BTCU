import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './first-screen.module.scss';
import { compose } from '../../../../utils';
import HomeHeader from '../../../layouts/header/header-home';
import ArrowDownIcon from '../../../assets/images/icons/arrow-down-icon';
import SearchIcon from '../../../assets/images/icons/search-icon';
import verctor1 from './images/vector1.svg';
import verctor2 from './images/vector2.svg';

class FirstScreen extends Component {
    static defaultProps = {
        t: () => {},
    };

    static propTypes = {
        t: PropTypes.func,
    };

    state = {
        search: '',
    };

    inputOnChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    }

    submitSearch = event => {
        event.preventDefault();
        const { search } = this.state;
        console.log(search, 'search');
    }

    render() {
        const { t } = this.props;
        const { search } = this.state;

        return (
            <div className={style.firstScreen}>
                <HomeHeader />
                <div className={style.firstScreen__container}>
                    <h1 className={style.firstScreen__title}>
                        The <span>BTCU</span> Explorer
                    </h1>
                    <div className={style.filter}>
                        <div className={style.filter__allFilters}>
                            <p className={style.filter__allFilters_text}>
                                {t('allFilters')}
                            </p>
                            <ArrowDownIcon
                                className={style.filter__allFilters_arrowDown}
                            />
                        </div>
                        <form
                            className={style.filter__inputtWrapper}
                            onSubmit={this.submitSearch}
                        >
                            <input
                                type="text"
                                name="search"
                                value={search}
                                className={style.filter__inputtWrapper_input}
                                placeholder={t('searchBy')}
                                onChange={this.inputOnChange}
                            />
                            <button
                                className={style.filter__inputtWrapper_button}
                                type="submit"
                            >
                                <SearchIcon
                                    className={style.filter__inputtWrapper_searchIcon}
                                />
                            </button>
                        </form>
                    </div>
                    <h3 className={style.firstScreen__subTitle}>
                        {t('sponsored')}: {t('sponsorText')}.{' '}
                        <Link to="/">{t('learnMore')}.</Link>
                    </h3>
                </div>
                <img
                    className={style.firstScreen__vector1}
                    src={verctor1}
                    alt="verctor1"
                />
                <img
                    className={style.firstScreen__vector2}
                    src={verctor2}
                    alt="verctor2"
                />
            </div>
        );
    }
}

export default compose(withTranslation())(FirstScreen);
