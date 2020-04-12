import React, {useCallback} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {Button} from "antd"
import {compose} from "redux"
import {withRouter} from "react-router"

import DirectionActions from "./DirectionActions/DirectionActions";
import {FriendshipActions} from "./FriendshipActions"

import s from './direction.module.css';

const Direction = ({username, me, amBlacklisted, canSee, history}) => {

  const goToMessages = useCallback(() => {
    history.push(`/u/messages/${username}`);
  }, [username, history]);

  return (
    <>
      <div className={s.directionContainer}>
        <span className={s.username}>
          {username}
        </span>
        <DirectionActions me={me}/>
      </div>
      <div className={s.friendshipMessageContainer}>
        {
          !amBlacklisted && !me &&
          <>
            <FriendshipActions/>
            {canSee && <Button size='small' onClick={goToMessages}>Send message</Button>}
          </>
        }
      </div>
    </>
  );
};


Direction.propTypes = {
  username: PropTypes.string.isRequired,
  me: PropTypes.bool.isRequired,
  amBlacklisted: PropTypes.bool.isRequired,
  canSee: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  me: state.auth.user.id === state.users.user.id,
  amBlacklisted: state.users.user.amBlacklisted,
  canSee: state.users.user.canSee
});

export default compose(
  connect(mapStateToProps),
  withRouter
)(Direction);
