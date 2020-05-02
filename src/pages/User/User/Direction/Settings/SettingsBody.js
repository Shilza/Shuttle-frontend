import React from "react";
import PropTypes from 'prop-types';
import {Switch} from 'antd';
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import {Link} from "react-router-dom";

import {shortifyNumber} from "utils";
import DefaultAvatar from "components/DefaultAvatar";

import Theme from "./Theme";
import Logout from "./Logout";

import s from './settings.module.css';

const SettingsBody = ({isPrivate, username, avatar, countOfUnreadMessages, notificationsCount, close, dispatch}) => {

  const changePrivacy = checked => {
    (checked ? dispatch.users.setPrivateAsync() : dispatch.users.setPublicAsync())
      .then(data => message.success(data))
      .catch(data => {
        message.success(data)
      });
  };

  return (
    <ul className={s.settingsContainer}>
      <li>
        <Link to={'/' + username} onClick={close} className={s.user}>
          {
            avatar
              ? <img src={avatar} alt='avatar' className={s.avatar}/>
              : <div className={s.avatar}><DefaultAvatar fontSize={'16px'}/></div>
          }
          <span>{username}</span>
        </Link>
      </li>
      <li>
        <Link to={'/posts/archive'} className={s.linkStyle}>Archive</Link>
      </li>
      <li>
        <Link to={'/posts/liked'} className={s.linkStyle}>Liked</Link>
      </li>
      <li>
        <Link to={'/u/messages'} className={s.messagesLink} data-countofunreadmessages={countOfUnreadMessages}>
          Messages
        </Link>
      </li>
      <li>
        <Link to={'/account/blacklist'} className={s.linkStyle}>Blacklist</Link>
      </li>
      <li>
        <Link to={'/account/notifications'} className={s.notificationsLink} countofunreadnotifications={notificationsCount}>
          Notifications
        </Link>
      </li>
      <li className={s.privateContainer}>
        <span>Private account</span>
        <Switch defaultChecked={!!isPrivate} size='small' onChange={changePrivacy}/>
      </li>
      <li className={s.privateContainer}>
        <Theme/>
      </li>
      <Logout/>
    </ul>
  )
};

SettingsBody.propTypes = {
  close: PropTypes.func.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  username: PropTypes.string,
  avatar: PropTypes.string,
  notificationsCount: PropTypes.number,
  countOfUnreadMessages: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isPrivate: state.auth.user.private,
  username: state.auth.user.username,
  avatar: state.auth.user.avatar,
  notificationsCount: shortifyNumber(state?.auth?.user?.notificationsCount),
  countOfUnreadMessages: shortifyNumber(state?.auth?.user?.unreadDialogs?.length)
});

export default connect(mapStateToProps)(SettingsBody);
