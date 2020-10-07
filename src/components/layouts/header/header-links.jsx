import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ListOfLinks = ({ classNameList, classNameItem }) => {
    const { t } = useTranslation();

    const listOfLinks = [
        {
            id: 1,
            name: t('home'),
            path: '/',
        },
        {
            id: 2,
            name: t('blockchain'),
            path: '/',
        },
        {
            id: 3,
            name: t('tokens'),
            path: '/',
        },
        {
            id: 4,
            name: t('resources'),
            path: '/',
        },
        {
            id: 5,
            name: t('more'),
            path: '/',
        },
    ];

    return (
        <ul className={classNameList}>
            {listOfLinks.map(item => {
                const { name, path, id } = item;
                return (
                    <li key={id} className={classNameItem}>
                        <Link to={path}>{name}</Link>
                    </li>
                );
            })}
        </ul>
    );
};

ListOfLinks.defaultProps = {
    classNameList: '',
    classNameItem: '',
};

ListOfLinks.propTypes = {
    classNameList: PropTypes.string,
    classNameItem: PropTypes.string,
};

export default ListOfLinks;
