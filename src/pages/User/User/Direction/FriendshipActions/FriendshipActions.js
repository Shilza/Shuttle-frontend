import React from "react";
import PropTypes from 'prop-types';
import {Button} from "antd";
import {connect} from "react-redux";

const getSubscriptionButtonText = (friendshipState) => {
  switch (friendshipState) {
    case 0:
      return 'Follow';
    case 1:
      return 'Subscription request sent';
    case 2:
      return 'Unfollow';
    default:
      return 'Undefined';
  }
};

const FriendshipActions = ({id, friendshipState, dispatch}) => {

  const friendships = () => (friendshipState !== 0)
    ? dispatch.users.unfollowAsync({id})
    : dispatch.users.followAsync({id});

  return (
    <Button size={'small'} onClick={friendships}>
      {getSubscriptionButtonText(friendshipState)}
    </Button>
  );
};

FriendshipActions.propTypes = {
  id: PropTypes.number.isRequired,
  friendshipState: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  id: state.users.user.id,
  friendshipState: state.users.user.friendshipState
});

export default connect(mapStateToProps)(FriendshipActions);
