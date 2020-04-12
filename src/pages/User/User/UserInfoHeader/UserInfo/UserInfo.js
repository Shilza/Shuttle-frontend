import React, {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {Followers} from "./Followers";
import {Follows} from "./Follows";
import PostsCount from "./PostsCount";
import FollowersButton from "./FollowersButton";
import FollowsButton from "./FollowsButton";

import styles from './userInfo.module.css';

const UserInfo = ({user}) => {

    const {posts_count, followers_count, follows_count} = user;

    let [isFollowersModal, setIsFollowersModal] = useState(false);
    let [isFollowsModal, setIsFollowsModal] = useState(false);

    const closeFollowersModal = () => setIsFollowersModal(false);

    const closeFollowsModal = () => setIsFollowsModal(false);

    const openFollowsModal = () => setIsFollowsModal(true);

    const openFollowersModal = () => setIsFollowersModal(true);

    return (
        <>
            <ul className={styles.mainContainer}>
                <PostsCount postsCount={posts_count}/>
                <FollowersButton followersCount={followers_count} onClickFollowers={openFollowersModal}/>
                <FollowsButton followsCount={follows_count} onClickFollows={openFollowsModal}/>
            </ul>
            <Follows
                isFollowsModal={isFollowsModal}
                closeFollowsModal={closeFollowsModal}
            />
            <Followers
                isFollowersModal={isFollowersModal}
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
