import React, {useCallback, useState} from "react"
import PropTypes from "prop-types"
import dayjs from 'dayjs';

import CLinkify from 'components/CLinkify'
import {OptionsModal} from 'ui';

import Post from "./Post";
import Images from "./Images";
import SingleImage from "./Images/SingleImage";

import s from "./message.module.css";


const Message = ({id, post, images, text, my, read, time, deleteMsg}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    if (my)
      setModalVisible(true);
  };

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const deleteMessage = useCallback(() => {
    deleteMsg(id);
  }, [deleteMsg, id]);

  return (
    <>
      <div className={my ? s.myWrapper : s.wrapper} onClick={openModal}>
        {
          post
            ? <Post post={post} my={my} postCode={text.split('/')[4]}/>
            : <div className={s.container}>
              {
                text.length > 0 || (images && images.length > 1) ?
                  <div className={my ? s.myText : s.text}>
                    {my && !read && <div className={s.unreadBadge}/>}
                    <CLinkify>{text}</CLinkify>
                    <Images images={images}/>
                  </div>
                  :
                  <SingleImage my={my} images={images}/>
              }
            </div>
        }
        <time className={my ? s.myTime : s.time}>{dayjs(time).format('HH:mm')}</time>
      </div>
      <OptionsModal visible={modalVisible && dayjs().diff(time, 'hours') <= 24} onClose={closeModal}>
        {
          dayjs().diff(time, 'hours') <= 24 &&
          <li onClick={deleteMessage}>Delete</li>
        }
        <li onClick={closeModal}>Cancel</li>
      </OptionsModal>
    </>
  );
};

Message.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  my: PropTypes.bool.isRequired,
  read: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  deleteMsg: PropTypes.func.isRequired
};

export default Message;
