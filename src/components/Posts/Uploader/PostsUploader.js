import React, {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {message} from "antd";

import {Modal, MobileDrawer} from "ui";
import Uploader from "./Modal/Uploader";
import UploadPost from "./Modal/UploadPost";
import {isMobile} from "utils";

const PostsUploader = ({dispatch, trigger}) => {

    let [isModalOpen, setIsModalOpen] = useState(false);
    let [media, setMedia] = useState(false);

    const closeModal = () => setIsModalOpen(false);

    const loadMedia = event => {
        if (event.target.files[0].size > 10485760)
            message.warn('File must be less than 10 MB');
        else {
            setIsModalOpen(true);
            setMedia(event.target.files[0]);
        }
    };

    const upload = postData => {
        dispatch.posts.create(postData)
            .then(data => message.success(data.message));
        closeModal();
    };

    return (
        <>
            {
                isMobile() ?
                    <MobileDrawer visible={isModalOpen} onClose={closeModal}>
                        <UploadPost media={media} upload={upload}/>
                    </MobileDrawer>
                    :
                    <Modal visible={isModalOpen} onClose={closeModal} closeByClickOnCover={false} withCloseButton>
                        <UploadPost media={media} upload={upload}/>
                    </Modal>
            }
            <Uploader loadMedia={loadMedia} trigger={trigger}/>
        </>
    )
};

PostsUploader.propTypes = {
    dispatch: PropTypes.func.isRequired,
    trigger: PropTypes.element
};

export default connect()(PostsUploader);
