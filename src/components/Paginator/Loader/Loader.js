import React from "react";
import PropTypes from "prop-types";
import {Icon} from "antd";
import styles from './loader.module.css';

const style = {
  color: 'var(--icon)'
};

const Loader = ({center = false, label, className}) => (
  <div className={[styles.loader, className, center ? styles.center : ''].join(' ')}>
    <Icon type={'loading'} style={style}/>
    {label}
  </div>
);

Loader.propTypes = {
    center: PropTypes.bool,
    label: PropTypes.element,
    className: PropTypes.string
};

export default Loader;
