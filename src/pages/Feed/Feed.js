import React, {useCallback, useEffect} from "react";
import {connect} from 'react-redux';

import Paginator from "components/Paginator/Paginator";
import FeedExplainingLabel from "components/ExplainingLabels/FeedLabel/FeedLabel";
import Loader from "components/Paginator/Loader";

import FeedList from "./FeedList";
import {Stories} from "./Stories";

import s from './feed.module.css';

const Feed = ({posts, dispatch}) => {

    useEffect(() => {
        return () => {
            dispatch.posts.resetFeed();
        }
    }, [dispatch.posts]);

    const fetcher = useCallback((page) => dispatch.posts.fetchFeed(page), [dispatch.posts]);

    return (
        <div>
            <Stories/>
            <div className={s.container} data-testid='feed'>
                <div className={s.list}>
                    <Paginator fetcher={fetcher}>
                        <FeedList posts={posts}/>
                    </Paginator>
                    {
                        posts?.length === 0 &&
                        <FeedExplainingLabel/>
                    }
                    {!posts && <Loader className={s.loader} label='Feed fetching'/>}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    posts: state.posts.feed
});

export default connect(mapStateToProps)(Feed);
