import React from 'react';
import PropTypes from 'prop-types';
import s from './title.module.css';

export const Title = React.memo(({className, children}) => (
    <h2 className={`${s.container} ${className || ''}`}>{children}</h2>
));

Title.propTypes = {
    className: PropTypes.string,
    children: PropTypes.ReactNode
};