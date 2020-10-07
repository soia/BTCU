/* eslint-disable camelcase */
import axios from 'axios';

const currentLang = localStorage.getItem('i18nextLngBTCU');

const logout = () => {
    localStorage.removeItem('user');
};
const userJson = JSON.parse(localStorage.getItem('user'));

if (localStorage.getItem('user') === 'undefined') {
    logout();
} else if (userJson && !userJson.data) {
    logout();
}

const login = (loginValue, password, captchaToken) => {
    const formData = new FormData();
    formData.append('login', loginValue);
    formData.append('password', password);
    formData.append('captcha', captchaToken);
    const options = {
        method: 'POST',
        headers: {
            language: currentLang,
        },
        data: formData,
        url: `${process.env.REACT_APP_API_URL}/users/login`,
    };

    return axios(options).then(user => user);
};

const registration = user => {
    const formData = new FormData();
    const {
        login: loginValue, email, password, confirm_password, referral_code, captcha,
    } = user;
    formData.append('login', loginValue);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirm_password);
    formData.append('captcha', captcha);
    if (referral_code) {
        formData.append('referral_code', referral_code);
    }

    const options = {
        method: 'POST',
        headers: {
            language: currentLang,
        },
        data: formData,
        url: `${process.env.REACT_APP_API_URL}/users/signup`,
    };

    return axios(options).then(data => data);
};

export { login, registration, logout };
