/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
        filter: this.props.t('allFilters'),
    };

    inputOnChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    submitSearch = event => {
        event.preventDefault();
        const { search } = this.state;
        console.log(search, 'search');
    };

    setFilter = filter => {
        this.setState({
            filter,
        });
    }

    render() {
        const { t } = this.props;
        const { search, filter } = this.state;

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
                                {filter}
                            </p>
                            <ArrowDownIcon
                                className={style.filter__allFilters_arrowDown}
                            />
                            <div className={style.filter__allFilters_menu}>
                                <ul>
                                    <li onClick={() => this.setFilter(t('allFilters'))}>
                                        {t('allFilters')}
                                    </li>
                                    <li onClick={() => this.setFilter(t('addresses'))}>
                                        {t('addresses')}
                                    </li>
                                    <li onClick={() => this.setFilter(t('tokens'))}>
                                        {t('tokens')}
                                    </li>
                                    <li onClick={() => this.setFilter(t('nameLogs'))}>
                                        {t('nameLogs')}
                                    </li>
                                    <li onClick={() => this.setFilter(t('labels'))}>
                                        {t('labels')}
                                    </li>
                                    <li onClick={() => this.setFilter(t('websites'))}>
                                        {t('websites')}
                                    </li>
                                </ul>
                            </div>
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
                                placeholder={`${t('searchBy')} ${filter}`}
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
