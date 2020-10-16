import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ListOfMoreLinks = ({ classNameContainer, classNameSubLinks, classNameItem }) => {
    const { t } = useTranslation();

    const data = [
        {
            label: t('developers'),
            list: [
                {
                    title: 'APIs',
                    path: '/',
                },
                {
                    title: t('verifyContract'),
                    path: '/',
                },
                {
                    title: t('byteToOpcode'),
                    path: '/',
                },
                {
                    title: t('broadcastTXN'),
                    path: '/',
                },
                {
                    title: t('vyperOnlineCompiler'),
                    path: '/',
                },
            ],
        },
        {
            label: t('deFiStuff'),
            list: [
                {
                    title: t('deFiLeaderboard'),
                    path: '/',
                },
                {
                    title: t('dexTracker'),
                    path: '/',
                },
                {
                    title: t('yieldFarms'),
                    path: '/',
                },
                {
                    title: t('yieldFarmingCalculator'),
                    path: '/',
                },
            ],
        },
        {
            label: t('explore'),
            list: [
                {
                    title: t('nodeTracker'),
                    path: '/',
                },
                {
                    title: t('BTCUNameLookup'),
                    path: '/',
                },
                {
                    title: t('BTCUConnect'),
                    path: '/',
                },
            ],
        },
        {
            label: t('tools'),
            list: [
                {
                    title: t('labelWordCloud'),
                    path: '/',
                },
                {
                    title: t('BTCUMiningCalculator'),
                    path: '/',
                },
                {
                    title: t('verifiedSignature'),
                    path: '/',
                },
            ],
        },
    ];

    return (
        <div className={classNameContainer}>
            {t('more')}
            <div className={classNameSubLinks}>
                {data.map(item => {
                    const { label, list } = item;

                    return (
                        <div key={label} className={classNameItem}>
                            <p>{label}</p>
                            {list.map(value => {
                                const { title, path } = value;
                                return (
                                    <Link key={title} to={path}>
                                        {title}
                                    </Link>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

ListOfMoreLinks.defaultProps = {
    classNameContainer: '',
    classNameItem: '',
    classNameSubLinks: '',
};

ListOfMoreLinks.propTypes = {
    classNameContainer: PropTypes.string,
    classNameItem: PropTypes.string,
    classNameSubLinks: PropTypes.string,
};

export default ListOfMoreLinks;
