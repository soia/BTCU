import React from 'react';
import PropTypes from 'prop-types';

const ArrowDownIcon = ({ className }) => (
    <svg
        className={className}
        width="8"
        height="5"
        viewBox="0 0 8 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.83502 0.676452L4.54464 4.7224C4.23251 5.09253 3.75131 5.09253 3.45219 4.7224L0.161815 0.676452C-0.150315 0.293555 0.00575015 0 0.486951 0H7.50988C8.00409 0 8.14715 0.293555 7.83502 0.676452Z"
            fill="white"
        />
    </svg>
);

ArrowDownIcon.defaultProps = {
    className: '',
};

ArrowDownIcon.propTypes = {
    className: PropTypes.string,
};

export default ArrowDownIcon;
