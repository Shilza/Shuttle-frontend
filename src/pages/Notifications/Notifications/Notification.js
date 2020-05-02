import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

import DefaultAvatar from "components/DefaultAvatar";
import PostLink from "./PostLink";

import s from './notifications.module.css';

dayjs.extend(relativeTime);


const Notification = ({item}) => {
  const {username, avatar, info, post_src, text, created_at} = item;

  let postLink;

  if (post_src)
    postLink = `/p/${post_src.match(/(?!.*\/.*).+(?=\.)/)[0]}`;

  return (
    <div className={s.notificationCard}>
      <Link to={`/${username}`} className={s.avatar}>
        {
          avatar ? <img src={avatar} alt={'avatar'}/> : <DefaultAvatar fontSize={'30px'}/>
        }
      </Link>
      <div className={s.infoWrapper}>
        <div className={s.infoContainer}>
          <Link to={`/${username}`} className={s.usernameLink}>
            <span>{username}</span>
          </Link>
          <span>{info}</span>
          {
            text && <Link to={postLink} className={s.comment}>{text}</Link>
          }
        </div>
        <span className={s.timeContainer}>
          <time>{dayjs(created_at).fromNow()}</time>
        </span>
      </div>
      {
        post_src && <PostLink postSrc={post_src} link={postLink}/>
      }
    </div>
  );
};

Notification.propTypes = {
  item: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    info: PropTypes.string,
    post_src: PropTypes.string,
    text: PropTypes.string,
    created_at: PropTypes.string
  })
};

export default Notification;
