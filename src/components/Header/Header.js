import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {IconButton} from "ui";
import {isMobile, shortifyNumber} from "utils";
import logoIcon from 'images/nLogo.png';
import planeIcon from 'images/plane.svg';

import Search from "./Search";
import DefaultAvatar from "../DefaultAvatar";

import s from './header.module.css';

const messagesIconProps = {
    icon: planeIcon,
    width: 24,
    height: 24
};

const Header = ({username, avatar, countOfUnreadMessages}) => (
  <div className={s.header}>
    <Link to='/' className={s.logo}>
      <img src={logoIcon} alt={'Shuttle logo'}/>
    </Link>
    <Search/>
    <div className={s.rightContainer}>
      <Link to={'/u/messages'} className={s.messagesLink} data-countofunreadmessages={countOfUnreadMessages}>
        <IconButton
          iconProps={messagesIconProps}
          ariaLabel='Open messages'
          title='Messages'
          className={s.messagesIcon}
        />
      </Link>
      {
        !isMobile() &&
        <Link to={'/' + username} className={s.username}>
          {
            avatar
              ? <img src={avatar} alt='avatar' className={s.avatar}/>
              : <div className={s.avatar}><DefaultAvatar fontSize={'16px'}/></div>
          }
        </Link>
      }
    </div>
  </div>
);

Header.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.any,
  countOfUnreadMessages: PropTypes.number,
};

const mapStateToProps = state => ({
  username: state.auth.user.username,
  avatar: state.auth.user.avatar,
  countOfUnreadMessages: shortifyNumber(state?.auth?.user?.unreadDialogs?.length),
});

export default connect(mapStateToProps)(Header);
