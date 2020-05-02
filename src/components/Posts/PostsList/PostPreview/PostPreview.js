import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";

import {shortifyNumber} from "utils";

import Media from "./Media";
import PostsModal from "../../PostsModal";

import cameraIcon from './icons/camera.svg';
import s from './postPreview.module.css';


const PostPreview = React.memo(({post}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className={s.container} onClick={openModal}>
        <Media src={post.src}/>
        <div className={s.metaInfo}>
          <div>
            {shortifyNumber(post.likes_count)}
            <Icon className={s.icon} type='heart'/>
          </div>
          <div>
            {shortifyNumber(post.comments_count)}
            <Icon className={s.icon} type='message'/>
          </div>
        </div>
        {post.src.match('.mp4') &&
        <picture className={s.videoCamera}><img src={cameraIcon} alt={'Video'}/></picture>}
      </div>
      <PostsModal visible={isModalOpen} post={post} onClose={closeModal}/>
    </>
  );
});

PostPreview.propTypes = {
  post: PropTypes.shape({
    src: PropTypes.string.isRequired,
    likes_count: PropTypes.number.isRequired,
    comments_count: PropTypes.number.isRequired
  }),
};

export default PostPreview;
