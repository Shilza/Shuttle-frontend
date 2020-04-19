import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import {shortifyNumber} from "utils";

import Save from "./Save";
import Share from "./Share";
import Like from "./Like";
import LikesListModal from "./Like/LikesListModal";

import s from './actions.module.css';

dayjs.extend(relativeTime);

const Actions = ({post, dispatch, className}) => {

  const {likes_count, created_at, isLiked, id} = post;

  const [isListOpen, setIsListOpen] = useState(false);

  const openList = (event) => {
    event.stopPropagation();
    setIsListOpen(true);
  };

  const closeList = useCallback((event) => {
    event && event.stopPropagation();
    setIsListOpen(false);
  }, []);

  const onLike = useCallback(({id, liked}) => {
    liked ? dispatch.posts.like(id) : dispatch.posts.unLike(id);
  }, [dispatch.posts]);

  return (
    <>
      <div className={`${s.actionsContainer} ${className}`}>
        <div className={s.actions}>
          <div className={s.likeContainer}>
            {
              !!likes_count &&
              <span onClick={openList} className={s.likesCount}>{shortifyNumber(likes_count)}</span>
            }
            <Like type='post' id={id} isLiked={isLiked} onLike={onLike}/>
          </div>
          <Share src={post.src}/>
          <Save post={post}/>
        </div>
        <time dateTime={created_at}>{dayjs(created_at).fromNow()}</time>
      </div>
      <LikesListModal isVisible={isListOpen} onClose={closeList} type={'post'} id={id}/>
    </>
  );
};

Actions.propTypes = {
  post: PropTypes.shape({
    likes_count: PropTypes.number,
    created_at: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    className: PropTypes.string
  }).isRequired,
};

export default connect()(Actions);
