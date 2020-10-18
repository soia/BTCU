import i18n from '../../../i18n';
import { BTCUDirectoryPath } from '../../../constants';

console.log(i18n.t('blockchain'), '!!!!!!!!!!!!!!!!!!!!!!!!');
const listOfLinks = [
    {
        id: 1,
        name: i18n.t('home'),
        path: '/',
        subLinks: null,
    },
    {
        id: 2,
        name: i18n.t('blockchain'),
        path: '/',
        subLinks: [
            {
                title: i18n.t('viewTxns'),
                subPath: '/',
                border: false,
            },
            {
                title: i18n.t('pendingTxns'),
                subPath: '/',
                border: false,
            },
            {
                title: i18n.t('contractInternalTxns'),
                subPath: '/',
                border: false,
            },
            {
                title: i18n.t('blocks'),
                subPath: '/',
                border: true,
            },
            {
                title: i18n.t('topAccounts'),
                subPath: '/',
                border: false,
            },
            {
                title: i18n.t('verifiedСontracts'),
                subPath: '/',
                border: false,
            },
        ],
    },
    {
        id: 3,
        name: i18n.t('tokens'),
        path: '/',
        subLinks: [
            {
                title: i18n.t('ERC20TopTokens'),
                subPath: '/',
                border: false,
            },
            {
                title: i18n.t('viewERC20Transfers'),
                subPath: '/',
                border: false,
            },
        ],
    },
    {
        id: 4,
        name: i18n.t('resources'),
        subLinks: [
            {
                title: i18n.t('сhartsStats'),
                subPath: '/',
                border: false,
            },
            {
                title: i18n.t('topStatistics'),
                subPath: '/',
                border: true,
            },
            {
                title: i18n.t('BTCUDirectory'),
                subPath: BTCUDirectoryPath,
                border: false,
            },
            {
                title: i18n.t('exploredApps'),
                subPath: '/',
                border: false,
            },
        ],
    },
];

export default listOfLinks;
