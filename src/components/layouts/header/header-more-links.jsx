import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from 'react-i18next';
import { mobileSublinksActions } from '../../../actions/mobile-sublinks.actions';
import { compose } from '../../../utils';
import { MORE_LINKS } from '../../../constants';

const ListOfMoreLinks = ({
    classNameContainer,
    classNameSubLinks,
    classNameItem,
    setSubLinks,
    mobileSublinks,
}) => {
    const { t } = useTranslation();
    const mobileWidth = window.innerWidth < 500;
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

    const selectCategory = () => {
        if (mobileWidth) {
            setSubLinks(MORE_LINKS);
        }
    };

    if (mobileSublinks === MORE_LINKS) {
        return (
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
        );
    }

    if (mobileSublinks && mobileSublinks !== MORE_LINKS) {
        return null;
    }

    return (
        <div className={classNameContainer} onClick={selectCategory}>
            {t('more')}
            {!mobileWidth ? (
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
            ) : null}
        </div>
    );
};

ListOfMoreLinks.defaultProps = {
    setSubLinks: () => {},
    classNameContainer: '',
    classNameItem: '',
    classNameSubLinks: '',
    mobileSublinks: '',
};

ListOfMoreLinks.propTypes = {
    setSubLinks: PropTypes.func,
    classNameContainer: PropTypes.string,
    classNameItem: PropTypes.string,
    classNameSubLinks: PropTypes.string,
    mobileSublinks: PropTypes.string,
};

const mapStateToProps = state => {
    const {
        mobileSublinks: { data: mobileSublinks },
    } = state;

    return {
        mobileSublinks,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        setSubLinks: data => mobileSublinksActions.set(data),
    },
    dispatch,
);

export default compose(connect(mapStateToProps, mapDispatchToProps))(ListOfMoreLinks);
