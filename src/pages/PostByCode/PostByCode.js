import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {isMobile} from "utils";
import {useAsync} from "hooks";
import PostModalBody from "components/Posts/PostsModal/PostModalBody";
import Loader from "components/Paginator/Loader";

import styles from './postByCode.module.css';

const PostByCode = ({dispatch, match, currentPost}) => {
  const {execute, isLoading, error, wasFetched} = useAsync(dispatch.posts.getPostByCode, false);

  useEffect(() => {
    if (!wasFetched)
      execute(match.params.code);
  }, [execute, wasFetched, match]);

  return (
    <div className={isMobile() ? styles.mobileContainer : styles.container}>
      {isLoading && <Loader center/>}
      {
        error
          ? <div>{error?.response?.data?.message}</div>
          : currentPost && <PostModalBody post={currentPost} needReplaceLocation={false}/>
      }
    </div>
  )
};

PostByCode.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object
};

export default connect((state) => ({currentPost: state.posts.postByCode[0]}))(PostByCode);
