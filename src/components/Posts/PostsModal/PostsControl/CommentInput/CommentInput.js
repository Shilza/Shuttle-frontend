import React, {useCallback, useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
import {Icon, message} from 'antd';
import {connect} from 'react-redux';

import Loader from "components/Paginator/Loader";
import {CommentsService} from 'services';

import s from './commentInput.module.css';

const resetReplyIconStyles = {
    fontSize: 12
};

const CommentInput = ({post_id, onComment, replyPostId, replyUsername, dispatch}) => {
    let [isLoading, setIsLoading] = useState(false);
    let [isButtonVisible, setIsButtonVisible] = useState(false);

    let inputRef = useRef();

    const resetReply = useCallback(() => {
        if (inputRef.current.value.indexOf(`@${replyUsername}`) === 0)
            inputRef.current.value = inputRef.current.value.substring(replyUsername.length + 1);
        dispatch.commentsUi.reset();
    }, [dispatch.commentsUi, replyUsername]);

    useEffect(() => {
        if (replyPostId === post_id && replyUsername) {
            inputRef.current.value = `@${replyUsername} ${inputRef.current.value}`;

            return resetReply;
        }
    }, [resetReply, post_id, replyUsername, replyPostId]);

    const submit = (event) => {
        event.preventDefault();

        const text = inputRef.current.value;

        if (text) {
            setIsLoading(true);
            CommentsService.create({post_id, text})
                .then(({data}) => {
                    onComment(data);
                })
                .catch((err) => {
                    message.error(err?.response?.data?.message || "Something went wrong");
                })
                .finally(() => {
                    inputRef.current.value = '';
                    resetReply();
                    setIsButtonVisible(false);
                    setIsLoading(false);
                });
        }
    };

    const onInputChange = (event) => {
        setIsButtonVisible(event.target.value.length > 0);
    };

    return (
        <div className={s.container}>
            <form onSubmit={submit} className={s.commentInputContainer} id={'commentInputContainer' + post_id}>
                <input
                    ref={inputRef}
                    placeholder='Add comment'
                    className={s.commentInput}
                    onChange={onInputChange}
                    disabled={isLoading}
                />
                {
                    isButtonVisible && !isLoading &&
                    <button
                        type={'submit'}
                        className={s.submitButton}
                    >
                        Send
                    </button>
                }
                {isLoading && <Loader className={s.loader}/>}
            </form>
            {
                replyUsername &&
                <div className={s.replyContainer}>
                    <span>Reply to: {replyUsername}</span>
                    <Icon type={'close'} style={resetReplyIconStyles} onClick={resetReply} title={'Reset reply'}/>
                </div>
            }
        </div>
    );
};

CommentInput.propTypes = {
    post_id: PropTypes.number.isRequired,
    onComment: PropTypes.func.isRequired,
    replyUsername: PropTypes.string,
    replyPostId: PropTypes.number,
};

export default connect((state) => ({
    replyUsername: state.commentsUi.username,
    replyPostId: state.commentsUi.postId
}))(CommentInput);
