import React from "react";
import PropTypes from 'prop-types';
import Login from "components/Welcome/Login/Login";
import nLogo from 'images/nLogo.png';
// import PostCards from "./PostCards";
import styles from './welcome.module.css';

const Welcome = ({children = <Login/>}) => (
  <div className={styles.welcome}>
    {/*<PostCards/>*/}
    <div className={styles.nLogoContainer}>
      <img src={nLogo} className={styles.nLogo} alt='Shuttle logo'/>
      <h1 className={styles.nTitle}>Shuttle</h1>
    </div>
    <div className={styles.card}>
      {children}
    </div>
  </div>
);

Welcome.propTypes = {
  children: PropTypes.node
};

export default Welcome;
