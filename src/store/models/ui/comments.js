const initialState = {
    username: null,
    postId: null
};

export const commentsUi = {
    state: initialState,
    reducers: {
        setReply(state, {username, postId}) {
            return {
                ...state,
                username,
                postId
            }
        },
        reset() {
            return initialState;
        }
    }
};
