import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ListOfLinks = ({ classNameList, classNameItem, classNameSubLinks }) => {
    const { t } = useTranslation();

    const listOfLinks = [
        {
            id: 1,
            name: t('home'),
            path: '/',
            subLinks: null,
        },
        {
            id: 2,
            name: t('blockchain'),
            path: '/',
            subLinks: [
                {
                    title: t('viewTxns'),
                    subPath: '/',
                    border: false,
                },
                {
                    title: t('pendingTxns'),
                    subPath: '/',
                    border: false,
                },
                {
                    title: t('contractInternalTxns'),
                    subPath: '/',
                    border: false,
                },
                {
                    title: t('blocks'),
                    subPath: '/',
                    border: true,
                },
                {
                    title: t('topAccounts'),
                    subPath: '/',
                    border: false,
                },
                {
                    title: t('verifiedСontracts'),
                    subPath: '/',
                    border: false,
                },
            ],
        },
        {
            id: 3,
            name: t('tokens'),
            path: '/',
            subLinks: [
                {
                    title: t('ERC20TopTokens'),
                    subPath: '/',
                    border: false,
                },
                {
                    title: t('viewERC20Transfers'),
                    subPath: '/',
                    border: false,
                },
            ],
        },
        {
            id: 4,
            name: t('resources'),
            subLinks: [
                {
                    title: t('сhartsStats'),
                    subPath: '/',
                    border: false,
                },
                {
                    title: t('topStatistics'),
                    subPath: '/',
                    border: true,
                },
                {
                    title: t('BTCUDirectory'),
                    subPath: '/',
                    border: false,
                },
                {
                    title: t('exploredApps'),
                    subPath: '/',
                    border: false,
                },
            ],
        },
        {
            id: 5,
            name: t('more'),
            path: '/',
            subLinks: null,
        },
    ];

    return (
        <ul className={classNameList}>
            {listOfLinks.map(item => {
                const {
                    name, path, id, subLinks,
                } = item;

                const borderStyle = {
                    borderBottom: '0.072vw solid rgba(38, 38, 66, 0.1)',
                };

                return (
                    <li key={id} className={classNameItem}>
                        {!subLinks ? <Link to={path}>{name}</Link> : <p>{name}</p>}
                        {subLinks ? (
                            <div className={classNameSubLinks}>
                                {subLinks.map(list => {
                                    const { title, subPath, border } = list;

                                    return (
                                        <Fragment key={title}>
                                            <Link to={subPath}>
                                                {title}
                                            </Link>
                                            {border ? <div style={borderStyle} /> : null}
                                        </Fragment>
                                    );
                                })}
                            </div>
                        ) : null}
                    </li>
                );
            })}
        </ul>
    );
};

ListOfLinks.defaultProps = {
    classNameList: '',
    classNameItem: '',
    classNameSubLinks: '',
};

ListOfLinks.propTypes = {
    classNameList: PropTypes.string,
    classNameItem: PropTypes.string,
    classNameSubLinks: PropTypes.string,
};

export default ListOfLinks;
