
import { combineReducers } from 'redux';
import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { currentLocale } from './current-locale.reducer';
import modl from './get-modl.reducer';
import passwordRecovery from './post-password-recovery.reducer';
import resetPassword from './post-reset-password.reducer';
import verificationUser from './post-verification-user.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';

const rootReducer = combineReducers({
    alert,
    authentication,
    currentLocale,
    modl,
    verificationUser,
    registration,
    users,
    passwordRecovery,
    resetPassword,
});

export default rootReducer;
