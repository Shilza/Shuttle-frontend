import React from 'react';
import {render, fireEvent, act} from '@testing-library/react';
import { init } from '@rematch/core'
import {FriendshipActions} from "./index";
import {Provider} from "react-redux";

test('', async () => {
    const unfollowAsyncMock = jest.fn();
    const followAsyncMock = jest.fn();
    const store = init({
        models: {
            users: {
                state: {
                    user: {
                        id: 1,
                        friendshipState: 0,
                        private: false,
                        followers_count: 0
                    },
                },
                reducers: {
                    follow(state) {
                        let user = {...state.user};
                        user.friendshipState = user.private ? 1 : 2;

                        if (!user.private)
                            user.followers_count++;

                        return {
                            ...state,
                            user
                        };
                    },
                },
                effects: {
                    unfollowAsync: unfollowAsyncMock,
                    followAsync: followAsyncMock,
                }
            }
        }
    });

    const {container} = render(
        <Provider store={store}>
            <FriendshipActions/>
        </Provider>
    );

    const button = container.querySelector('button');
    expect(button).toHaveTextContent('Follow');
    await act(() => {
        fireEvent.click(button);
    });
    expect(button).toHaveTextContent('Follow');
    store.dispatch.users.follow();
    expect(button).toHaveTextContent('Unfollow');
});