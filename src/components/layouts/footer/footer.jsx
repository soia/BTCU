import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DocIcon from '../../assets/images/footer-icons/doc-icon';
import whitepaper from '../../assets/documents/white_paper_etalonium.pdf';
import termsAndConditions from '../../assets/documents/t_c_etalonium.pdf';
import WebSiteIcon from '../../assets/images/footer-icons/web-site_icon';
import style from './footer.module.scss';

const Footer = ({ className }) => {
    const { t } = useTranslation();

    return (
        <footer className={className} id="footer">
            <a
                href={whitepaper}
                target="_blank"
                rel="noopener noreferrer"
                className={style.footer_item}
            >
                <DocIcon className={style.footer_img} />
                Whitepaper
            </a>
            <a
                href={termsAndConditions}
                target="_blank"
                rel="noopener noreferrer"
                className={style.footer_item}
            >
                <DocIcon className={style.footer_img} />
                {t('termsAndConditions')}
            </a>
            <a
                href="https://www.etalonium.io/"
                target="_blank"
                rel="noopener noreferrer"
                className={style.footer_item}
            >
                <WebSiteIcon className={style.footer_img} />
                {t('webSite')}
            </a>
        </footer>
    );
};

Footer.defaultProps = {
    className: '',
};

Footer.propTypes = {
    className: PropTypes.string,
};

export default Footer;
