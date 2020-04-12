import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {useModal} from 'hooks';

import {Followers} from "./Followers";
import {Follows} from "./Follows";
import PostsCount from "./PostsCount";
import FollowersButton from "./FollowersButton";
import FollowsButton from "./FollowsButton";

import styles from './userInfo.module.css';

const UserInfo = ({user}) => {

    const {posts_count, followers_count, follows_count} = user;

    const {
        isOpen: isFollowersModalOpen,
        openModal: openFollowersModal,
        closeModal: closeFollowersModal,
    } = useModal();

    const {
        isOpen: isFollowsModalOpen,
        openModal: openFollowsModal,
        closeModal: closeFollowsModal,
    } = useModal();

    return (
        <>
            <ul className={styles.mainContainer}>
                <PostsCount postsCount={posts_count}/>
                <FollowersButton followersCount={followers_count} onClickFollowers={openFollowersModal}/>
                <FollowsButton followsCount={follows_count} onClickFollows={openFollowsModal}/>
            </ul>
            <Follows
                isFollowsModal={isFollowsModalOpen}
                closeFollowsModal={closeFollowsModal}
            />
            <Followers
                isFollowersModal={isFollowersModalOpen}
                closeFollowersModal={closeFollowersModal}
            />
        </>
    );
};

UserInfo.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        posts_count: PropTypes.number.isRequired,
        follows_count: PropTypes.number.isRequired,
        followers_count: PropTypes.number.isRequired,
        canSee: PropTypes.bool,
    })
};

const mapStateToProps = state => ({
    user: state.users.user
});

export default connect(mapStateToProps)(UserInfo);
