import React, { Fragment } from 'react';
import FirstScreen from './first-screen';
import PriceScreen from './price-screen';
import LatestScreen from './latest-screen';

const HomePage = () => (
    <Fragment>
        <FirstScreen />
        <PriceScreen />
        <LatestScreen />
    </Fragment>
);

export default HomePage;
