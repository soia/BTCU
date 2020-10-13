import React, { Fragment } from 'react';
import FirstScreen from './first-screen';
import LatestScreen from './latest-screen';
import BlockScreen from './block-screen';

const HomePage = () => (
    <Fragment>
        <FirstScreen />
        <BlockScreen />
        <LatestScreen />
    </Fragment>
);

export default HomePage;
