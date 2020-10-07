import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

const currentLang = localStorage.getItem('i18nextLngBTCU');

if (localStorage.getItem('i18nextLngBTCU') === null) {
    localStorage.setItem('i18nextLngBTCU', 'en');
}

i18n.use(Backend)

    .use(initReactI18next)

    .init({
        fallbackLng: currentLang || 'en',
        lng: currentLang || 'en',
        debug: true,

        interpolation: {
            escapeValue: false,
        },
    });
export default i18n;
