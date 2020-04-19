import React, {useCallback} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {OptionsModal} from 'ui';
import {CommentsService} from "services";
import ModalBody from "./ModalBody";

const CommentsModal = ({id, postId, owner, canDelete, closeModal, isModalOpen, onRemove, dispatch}) => {

    const removeComment = () => {
        CommentsService.remove(id).then(() => onRemove(id));
    };

    const handleReply = useCallback(() => {
        dispatch.commentsUi.setReply({
            username: owner,
            postId
        });
        closeModal();
    }, [dispatch.commentsUi, owner, postId, closeModal]);

    return (
        <OptionsModal visible={isModalOpen} onClose={closeModal}>
            <ModalBody closeModal={closeModal} canDelete={canDelete} onReply={handleReply} onRemoveComment={removeComment}/>
        </OptionsModal>
    );
};

CommentsModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    postId: PropTypes.number.isRequired,
    postOwnerId: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    canDelete: PropTypes.bool.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    selectedComment: PropTypes.object
};


const mapStateToProps = (state, props) => ({
    canDelete: props.postOwnerId === state?.auth?.user?.id || props.ownerId === state?.auth?.user?.id,
});

export default connect(mapStateToProps)(CommentsModal);
