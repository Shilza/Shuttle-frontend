import React from "react";
import PropTypes from 'prop-types';

const ModalBody = ({closeModal, canDelete, onReply, onRemoveComment}) => (
    <>
        {
            canDelete &&
            <li onClick={onRemoveComment}>
                Delete
            </li>
        }
        <li onClick={onReply}>
            Reply
        </li>
        <li onClick={closeModal}>
            Cancel
        </li>
    </>
);

ModalBody.propTypes = {
    closeModal: PropTypes.func.isRequired,
    canDelete: PropTypes.bool.isRequired,
    onRemoveComment: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired
};

export default ModalBody;
