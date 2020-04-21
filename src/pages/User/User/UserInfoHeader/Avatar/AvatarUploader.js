import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Button} from "antd";
import {message} from "antd/lib/index";
import Avatar from "react-avatar-edit";
import {connect} from "react-redux";
import styles from './avatar.module.css';

const cropButtonStyle = {width: '100%'};

const AvatarUploader = ({onClose, media, dispatch}) => {

  let [cropRes, setCropRes] = useState();

  const uploadAvatar = () => {
    fetch(cropRes)
      .then(res => res.blob())
      .then(blob => {
        let file = new File([blob], 'file', {type: 'image/jpeg'});
        let avatar = new FormData();
        avatar.append('avatar', file);
        dispatch.users.updateAvatarAsync(avatar)
          .then((data) => {
            message.success(data.message);
          })
          .catch((err) => {
            message.error(err?.response?.data?.message || "Something went wrong");
          })
          .finally(onClose);
      });
  };

  return (
    <div className={styles.uploaderContainer}>
      <Avatar
        width={390}
        height={295}
        onCrop={setCropRes}
        onClose={onClose}
        src={media}
      />
      <Button style={cropButtonStyle} onClick={uploadAvatar}>Update</Button>
    </div>
  )
};

AvatarUploader.propTypes = {
  onClose: PropTypes.func.isRequired,
  media: PropTypes.string.isRequired,
};

export default connect()(AvatarUploader);
