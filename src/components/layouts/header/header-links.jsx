import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { compose } from '../../../utils';
import links from './links';

class ListOfLinks extends Component {
    selectCategory = id => {
        console.log(id, 'ididid');
    }

    render() {
        const { classNameList, classNameItem, classNameSubLinks } = this.props;
        console.log(links, 'lisOfLinkslisOfLinks');
        return (
            <ul className={classNameList}>
                {links.map(item => {
                    const {
                        name, path, id, subLinks,
                    } = item;

                    const borderStyle = {
                        borderBottom: '0.072vw solid rgba(38, 38, 66, 0.1)',
                    };

                    return (
                        <li key={id} className={classNameItem}>
                            {!subLinks ? (
                                <Link to={path}>{name}</Link>
                            ) : (
                                <div onClick={() => this.selectCategory(id)}>{name}</div>
                            )}
                            {subLinks ? (
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

export default compose(withTranslation())(ListOfLinks);
