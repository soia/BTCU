import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { mobileSublinksActions } from '../../../actions/mobile-sublinks.actions';
import { BTCUDirectoryPath } from '../../../constants';
import { compose } from '../../../utils';

class ListOfLinks extends Component {
    mobileWidth = window.innerWidth;

    static defaultProps = {
        t: () => {},
        setSubLinks: () => {},
        classNameList: '',
        classNameItem: '',
        classNameSubLinks: '',
        mobileSublinks: '',
    };

    static propTypes = {
        t: PropTypes.func,
        setSubLinks: PropTypes.func,
        classNameList: PropTypes.string,
        classNameItem: PropTypes.string,
        classNameSubLinks: PropTypes.string,
        mobileSublinks: PropTypes.string,
    };

    selectCategory = id => {
        const { setSubLinks } = this.props;
        if (this.mobileWidth < 500) {
            setSubLinks(id);
        }
    };

    render() {
        const {
            t, classNameList, classNameItem, classNameSubLinks, mobileSublinks,
        } = this.props;

        const links = [
            {
                id: '1',
                name: t('home'),
                path: '/',
                subLinks: null,
            },
            {
                id: '2',
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
                id: '3',
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
                id: '4',
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
                        subPath: BTCUDirectoryPath,
                        border: false,
                    },
                    {
                        title: t('exploredApps'),
                        subPath: '/',
                        border: false,
                    },
                ],
            },
        ];

        const borderStyle = {
            borderBottom: '0.072vw solid rgba(38, 38, 66, 0.1)',
        };

        const activeSublinks = links.find(item => item.id === mobileSublinks);

        if (activeSublinks) {
            return (
                <ul className={classNameSubLinks}>
                    {activeSublinks.subLinks.map(list => {
                        const { title, subPath, border } = list;

                        return (
                            <li key={title}>
                                <Link to={subPath}>{title}</Link>
                                {border ? <div style={borderStyle} /> : null}
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return (
            <ul className={classNameList}>
                {links.map(item => {
                    const {
                        name, path, id, subLinks,
                    } = item;

                    return (
                        <li key={id} className={classNameItem}>
                            {!subLinks ? (
                                <Link to={path}>{name}</Link>
                            ) : (
                                <div onClick={() => this.selectCategory(id)}>{name}</div>
                            )}
                            {this.mobileWidth > 499 && subLinks ? (
                                <div className={classNameSubLinks}>
                                    {subLinks.map(list => {
                                        const { title, subPath, border } = list;

                                        return (
                                            <Fragment key={title}>
                                                <Link to={subPath}>{title}</Link>
                                                {border ? (
                                                    <div style={borderStyle} />
                                                ) : null}
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
    }
}

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

export default compose(
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps),
)(ListOfLinks);
