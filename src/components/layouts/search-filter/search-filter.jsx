/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { searchPath } from '../../../constants/pathLocation';
import { compose } from '../../../utils';
import ArrowDownIcon from '../../assets/images/icons/arrow-down-icon';
import style from './search-filter.module.scss';

class SearchFilter extends Component {
    static defaultProps = {
        t: () => {},
        button: {},
        history: {},
        inputClassName: '',
        filterClassName: '',
    };

    static propTypes = {
        t: PropTypes.func,
        button: PropTypes.object,
        history: PropTypes.object,
        inputClassName: PropTypes.string,
        filterClassName: PropTypes.string,
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
        const { history } = this.props;
        const { search } = this.state;
        history.push(searchPath);
        console.log(search, 'search');
    };

    setFilter = filter => {
        this.setState({
            filter,
        });
    };

    render() {
        const {
            t, button, inputClassName, filterClassName,
        } = this.props;
        const { search, filter } = this.state;

        const inputStyle = inputClassName
            ? classNames(style.filter__inputtWrapper_input, inputClassName)
            : style.filter__inputtWrapper_input;

        const containerStyle = classNames(style.filter, filterClassName);

        return (
            <div className={containerStyle}>
                <div className={style.filter__allFilters}>
                    <p className={style.filter__allFilters_text}>{filter}</p>
                    <ArrowDownIcon className={style.filter__allFilters_arrowDown} />
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
                        className={inputStyle}
                        placeholder={`${t('searchBy')} ${filter}`}
                        onChange={this.inputOnChange}
                    />
                    {button}
                </form>
            </div>
        );
    }
}

export default compose(withTranslation(), withRouter)(SearchFilter);
