import React from 'react';
import {render, fireEvent, act} from '@testing-library/react';
import {init} from '@rematch/core'
import {FriendshipActions} from "./index";
import {Provider} from "react-redux";
import {models} from 'store/models';

jest.mock('services', () => ({
    FriendshipsService: {
        follow: async () => {
        },
        unfollow: async () => ({
            data: {
                canSee: true
            }
        })
    }
}));

const getMockStoreWithFriendshipState = (friendshipState) => (
    init({
        models: {
            ...models,
            users: {
                ...models.users,
                state: {
                    ...models.users.state,
                    user: {
                        id: 1,
                        private: false,
                        friendshipState: friendshipState
                    }
                }
            }
        }
    })
);

describe('FriendshipActions', () => {
    test('should change subscription button text by click Follow -> Unfollow', async () => {
        const store = getMockStoreWithFriendshipState(0);

        const {container} = render(
            <Provider store={store}>
                <FriendshipActions/>
            </Provider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveTextContent('Follow');
        await act(async () => {
            await fireEvent.click(button);
        });
        expect(button).toHaveTextContent('Unfollow');
    });

    test('should change subscription button text by click "Subscription request sent" -> Follow', async () => {
        const store = getMockStoreWithFriendshipState(1);

        const {container} = render(
            <Provider store={store}>
                <FriendshipActions/>
            </Provider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveTextContent('Subscription request sent');
        await act(async () => {
            await fireEvent.click(button);
        });
        expect(button).toHaveTextContent('Follow');
    });

    test('should change subscription button text by click Unfollow -> Follow', async () => {
        const store = getMockStoreWithFriendshipState(2);

        const {container} = render(
            <Provider store={store}>
                <FriendshipActions/>
            </Provider>
        );

        const button = container.querySelector('button');
        expect(button).toHaveTextContent('Unfollow');
        await act(async () => {
            await fireEvent.click(button);
        });
        expect(button).toHaveTextContent('Follow');
    });
});