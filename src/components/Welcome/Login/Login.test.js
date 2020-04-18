import React from 'react';
import {render, fireEvent, act} from '@testing-library/react';
import {init} from '@rematch/core'
import {Provider} from "react-redux";
import {models} from 'store/models';

jest.mock('services', () => ({
    AuthService: {
        login: async () => ({
            data: {
                token: 'token',
                expiresIn: 123123334534,
                refreshToken: 'refreshToken',
                user: {}
            }
        })
    }
}));

const getMockStore = () => (
    init({models})
);

describe('Welcome/Login', () => {
    test('should change subscription button text by click Follow -> Unfollow', async () => {
        const store = getMockStore(0);

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
});