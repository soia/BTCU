import axios from 'axios';
import { store } from 'react-notifications-component';
import i18n from '../i18n';

export default class GetService {
    getResource = async url => {
        const user = JSON.parse(localStorage.getItem('user'));
        const currentLang = localStorage.getItem('i18nextLngBTCU');
        const getToken = () => user.data.access_token;
        const accessToken = user ? `${getToken()}` : '';

        const response = await axios.get(`${process.env.REACT_APP_API_URL}${url}`, {
            headers: {
                accessToken,
                language: currentLang,
            },
        });

        if (response.status !== 200) {
            throw new Error(
                `Could not fetch ${process.env.REACT_APP_API_URL}${url},
                received ${response.status}`,
            );
        }
        return response.data;
    };

    logout = () => {
        localStorage.removeItem('user');
        document.location.reload(true);
        store.addNotification({
            title: i18n.t('error.sessionTimedOut'),
            message: i18n.t('error.loginAgain'),
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'slideInRight'],
            animationOut: ['animated', 'zoomOut'],
            dismiss: {
                duration: 3000,
                pauseOnHover: true,
            },
        });
    };

    getModl = async () => {
        const res = await this.getResource('/modl');
        return res;
    };
}
