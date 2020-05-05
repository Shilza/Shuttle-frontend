import React from "react";
import PropTypes from 'prop-types';
import {message} from "antd/lib/index";
import {connect} from "react-redux";

import {useModal} from "hooks";
import {ShareModal} from "components/Posts/PostsModal/PostsControl/Actions/Share/ShareModal";

const ActionsBody = ({closeModal, dispatch, userId, username, avatar, blacklisted}) => {

    const {
        isOpen: isShareOpen,
        openModal: openShareModal,
        closeModal: closeShareModal
    } = useModal();

    const addToBlackList = () => {
        dispatch.blacklist.addToBlacklist({id: userId})
            .then(data => message.success(data))
            .catch(err => message.error(err.response.data.message));
    };

    const removeFromBlacklist = () => {
        dispatch.blacklist.removeFromBlacklistAsync(userId)
            .then(data => message.success(data))
            .catch(err => message.error(err.response.data.message));
    };

    const copyUserLinkToClipboard = () => {
        let el = document.createElement('textarea');
        el.value = `${window.location.origin}/${username}`;
        el.setAttribute('readonly', '');
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        message.success('Link copied to clipboard');

        closeModal();
    };

    return (
        <>
            <li>Complain</li>
            {
                blacklisted
                    ? <li onClick={removeFromBlacklist}>Remove from blacklist</li>
                    : <li onClick={addToBlackList}>Add to blacklist</li>
            }
            <li onClick={copyUserLinkToClipboard}>Copy link</li>
            <li onClick={openShareModal}>Share profile</li>
            <li onClick={closeModal}>Cancel</li>
            <ShareModal
                isVisible={isShareOpen}
                src={avatar}
                entityMessage={`${window.location.origin}/${username}`}
                onClose={closeShareModal}
            />
        </>
    );
};

ActionsBody.propTypes = {
    closeModal: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    blacklisted: PropTypes.bool
};

const mapStateToProps = state => ({
    userId: state.users.user.id,
    username: state.users.user.username,
    avatar: state.users.user.avatar,
    blacklisted: state.users.user.blacklisted
});

export default connect(mapStateToProps)(ActionsBody);
