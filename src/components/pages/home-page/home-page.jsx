import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FirstScreen from './first-screen';

const HomePage = ({ loading }) => (
    <Fragment>
        <FirstScreen loading={loading} />
    </Fragment>
);

HomePage.defaultProps = {
    loading: true,
};

HomePage.propTypes = {
    loading: PropTypes.bool,
};

export default HomePage;
