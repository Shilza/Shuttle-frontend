import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

import CLinkify from "components/CLinkify";
import Like from "components/Posts/PostsModal/PostsControl/Actions/Like";
import DefaultAvatar from "components/DefaultAvatar";
import LikesListModal from "components/Posts/PostsModal/PostsControl/Actions/Like/LikesListModal";
import {shortifyNumber} from "utils";
import {useModal} from "hooks";
import CommentsModal from "./Modal/CommentsModal";

import s from './comment.module.css';

dayjs.extend(relativeTime);


const Comment = ({comment, setCommentLiked, onRemove}) => {

    const {isLiked, likes_count, owner, text, created_at, id, avatar} = comment;
    const {
        isOpen: isModalOpen,
        openModal,
        closeModal
    } = useModal();
    const [isListOpen, setIsListOpen] = useState(false);

    const openList = (event) => {
        event.stopPropagation();
        setIsListOpen(true);
    };

    const closeList = useCallback((event) => {
        event && event.stopPropagation();
        setIsListOpen(false);
    }, []);

    return (
        <>
            <div className={s.comment} onClick={openModal}>
                <div className={s.infoAvatarContainer}>
                    <Link to={'/' + owner} onClick={e => e.stopPropagation()}>
                        {
                            avatar
                                ? <img src={avatar} alt={`${owner} avatar`} className={s.avatar}/>
                                : <DefaultAvatar fontSize={'16px'} className={s.avatar}/>
                        }
                    </Link>
                    <div className={s.container}>
                        <div>
                            <Link to={'/' + owner} onClick={e => e.stopPropagation()}
                                  className={s.username}>{owner}</Link>
                            <CLinkify className={s.text}>{text}</CLinkify>
                        </div>
                        <div className={s.metaContainer}>
                            <time dateTime={created_at}>{dayjs(created_at).fromNow()}</time>
                            {
                                !!likes_count &&
                                <span className={s.likesCount}
                                      onClick={openList}>Likes: {shortifyNumber(likes_count)}</span>
                            }
                        </div>
                    </div>
                    <Like
                        type='comment'
                        id={id}
                        isLiked={isLiked}
                        onLike={setCommentLiked}
                        className={s.like}
                    />
                </div>
            </div>
            <CommentsModal
                isModalOpen={isModalOpen}
                id={comment.id}
                postId={comment.post_id}
                ownerId={comment.owner_id}
                owner={owner}
                postOwnerId={comment.postOwnerId}
                closeModal={closeModal}
                onRemove={onRemove}
            />
            <LikesListModal isVisible={isListOpen} onClose={closeList} type={'comment'} id={id}/>
        </>
    )
};

Comment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number.isRequired,
        isLiked: PropTypes.bool.isRequired,
        likes_count: PropTypes.number,
        owner: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        text: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired
    }).isRequired,
    onRemove: PropTypes.func.isRequired
};

export default Comment;
