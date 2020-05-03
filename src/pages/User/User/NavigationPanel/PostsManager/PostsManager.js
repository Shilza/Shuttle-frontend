import React, {useCallback, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {PostsService} from "services";
import PostsExplainingLabel from "components/ExplainingLabels/PostsLabel/PostsExplainingLabel";
import Paginator from "components/Paginator/Paginator";
import PostsList from "components/Posts/PostsList";
import Loader from "components/Paginator/Loader";


const PostsManager = ({id, posts, dispatch}) => {

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        return () => {
            dispatch.posts.resetUser();
        }
    }, [id, dispatch.posts]);

    const fetchPosts = useCallback((page) => {
        setIsLoading(true);
        return PostsService.getPosts(id)(page)
            .then(({data}) => {
                setIsLoading(false);
                dispatch.posts.addUser(data.data);
                return data;
            })
    }, [id, dispatch.posts]);

    return (
        <>
            {posts && !posts.length && !isLoading && <PostsExplainingLabel/>}
            {isLoading && <Loader/>}
            <Paginator fetcher={fetchPosts}>
                <PostsList posts={posts}/>
            </Paginator>
        </>
    );
};

PostsManager.propTypes = {
    id: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    id: state.users.user.id,
    posts: state.posts.user
});

export default connect(mapStateToProps)(PostsManager);
