import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import UserFriendshipCard from "../UserFriendshipCard";
import SearchInput from "components/SearchInput";
import {searchFollows} from "services/user";

import s from '../friendships.module.css';

const Body = ({closeModal, me, id, dispatch, follows}) => {

  const search = (username) => {
    if (username.length <= 12)
      searchFollows(id, username)
        .then(({data}) => {
          dispatch.users.setFollows(data.data);
          return data;
        });
  };

  const unfollow = (id) => {
    dispatch.users.unfollowAsync({id});
  };

  return (
      <div className={s.friendshipsContainer}>
          <SearchInput
              search={search}
              placeholder={'Username'}
              className={s.search}
              maxLength={12}
          />
        <ul>
          {
            follows.map(user =>
              <UserFriendshipCard
                key={user.id}
                id={user.id}
                avatar={user.avatar}
                username={user.username}
                closeModal={closeModal}
                onUnfollow={me && unfollow}
              />
            )
          }
        </ul>
      </div>
  );
};

Body.propTypes = {
  closeModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  follows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }))
};

const mapStateToProps = state => ({
  follows: state.users.follows,
  me: state.auth.user.id === (state.users.user && state.users.user.id)
});

export default connect(mapStateToProps)(Body);
