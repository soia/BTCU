import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import ScrollToTop from '../../helpers/scroll-to-top';
import { PageNotFound } from '../pages';
import HomePage from '../pages/home-page/home-page';
import SearchPage from '../pages/search-page';
import DirectoryPage from '../pages/directory-page';
import BlockPage from '../pages/block-page';
import TransactionPage from '../pages/transaction-page';
import Footer from '../layouts/footer';
import Login from '../auth/login';
import Registration from '../auth/registration';
import HeaderMain from '../layouts/header/header-main';
import {
    loginPath,
    registartionPath,
    passowrdRecoveryPath,
    resetPasswordPath,
    searchPath,
    BTCUDirectoryPath,
    blockPath,
    transactionPath,
} from '../../constants';
import '../assets/styles/reset.scss';
import './app.scss';
import '../assets/styles/fonts.scss';
import 'react-notifications-component/dist/theme.css';
import PasswordRestore from '../auth/password-restore';
import ResetPassword from '../auth/reset-password';

const App = () => (
    <Router>
        <ScrollToTop>
            <HeaderMain />
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path={loginPath} component={Login} exact />
                <Route path={registartionPath} component={Registration} exact />
                <Route path={passowrdRecoveryPath} component={PasswordRestore} exact />
                <Route path={resetPasswordPath} component={ResetPassword} exact />
                <Route path={searchPath} component={SearchPage} exact />
                <Route path={BTCUDirectoryPath} component={DirectoryPage} exact />
                <Route path={`${blockPath}/:id?`} component={BlockPage} exact />
                <Route path={`${transactionPath}/:id?`} component={TransactionPage} exact />
                <Route component={PageNotFound} />
            </Switch>
            <Footer />
        </ScrollToTop>
        <ReactNotification />
    </Router>
);

export default App;
