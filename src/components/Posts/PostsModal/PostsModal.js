import React, {useCallback} from "react";
import PropTypes from 'prop-types';

import {Modal, MobileDrawer} from 'ui';
import {isMobile} from 'utils';

import PostModalBody from "./PostModalBody";

import s from './postsModal.module.css';

const PostsModal = ({visible, onClose, post}) => {

    const closeModal = useCallback(() => {
        onClose();
    }, [onClose]);

    return (
        <>
            {
                isMobile() ?
                    <MobileDrawer
                        visible={post && visible}
                        onClose={closeModal}
                        title={post.owner}
                        className={s.mobileDrawer}
                        containerClassName={s.mobileDrawerContainer}
                        titleClassName={s.mobileDrawerTitle}
                        height='calc(100vh - 50px)'
                        zIndex={100}
                    >
                        <PostModalBody post={post} closeModal={closeModal}/>
                    </MobileDrawer>
                    :
                    <Modal visible={post && visible} onClose={closeModal}>
                        <PostModalBody post={post} closeModal={closeModal}/>
                    </Modal>
            }
        </>
    );
};

PostsModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

export default PostsModal;
