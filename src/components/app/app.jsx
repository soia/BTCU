import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import ScrollToTop from '../../helpers/scroll-to-top';
import { PageNotFound } from '../pages';
import HomePage from '../pages/home-page/home-page';
import Footer from '../layouts/footer';
import Login from '../auth/login';
import { loginPath } from '../../constants';
import '../assets/styles/reset.scss';
import './app.scss';
import '../assets/styles/fonts.scss';
import 'react-notifications-component/dist/theme.css';

const App = () => (
    <Router>
        <ScrollToTop>
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path={loginPath} component={Login} exact />
                <Route component={PageNotFound} />
            </Switch>
            <Footer />
        </ScrollToTop>
        <ReactNotification />
    </Router>
);

export default App;
