import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

import DefaultAvatar from "components/DefaultAvatar"
import Typing from "components/Typing";
import {getPostCode, getUsername} from "../../Dialog/utils/useMessages";

import s from './dialog.module.css';

dayjs.extend(relativeTime);


const Dialog = ({ownerId, username, avatar, text, read, myId, createdAt, isTyping}) => {
  const media = text.match(/https?:\/\/[^"' ]+\.(?:png|jpg|jpeg|gif|mp4).*?(?=( |$))/g, '');

  const image = media && media.length > 0 && 'Image';
  const postCode = getPostCode(text);
  const post = postCode?.length === 36 && 'Post';
  const usernameFromText = getUsername(text);
  const profile = usernameFromText && `@${usernameFromText}`;

  return (
    <div className={!read && ownerId !== myId ? s.unreadContainer : s.container}>
      <Link to={`/${username}`} className={s.avatar}>
        {
          avatar ? <img src={avatar} alt={'avatar'} /> : <DefaultAvatar fontSize={'30px'} />
        }
      </Link>
      <Link to={`/u/messages/${username}`} className={s.infoContainer}>
        <div className={s.infoHeader}>
          <span className={s.username}>{username}</span>
          <time className={s.lastMessageTime} dateTime={createdAt}>{dayjs(createdAt).fromNow()}</time>
        </div>
        {
          isTyping
            ? <Typing/>
            : <div className={!read && ownerId === myId ? s.myMessageIsUnread : s.text}>{post || image || profile || text}</div>
        }
      </Link>
    </div>
  );
};

Dialog.propTypes = {
  ownerId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  text: PropTypes.string.isRequired,
  read: PropTypes.number,
  myId: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  isTyping: PropTypes.bool
};

export default Dialog;
