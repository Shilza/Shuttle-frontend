import React, {useEffect, useState} from "react";
import ColorThief from "colorthief";
import Loadable from 'react-loadable';

import {useModal} from 'hooks';
import {FullScreen} from "ui";

import s from './story.module.css';


const LoadableInstaStories = Loadable({
    loader: () => import('react-insta-stories'),
    loading: 'Loading...',
});

const getColor = (url) => {
    return new Promise((resolve, reject) => {
        if (!url) {
            reject();
        }
        const image = new Image();
        image.crossorigin = 'Anonymous';
        image.src = url;

        image.onload = function (data) {
            console.log(data);
            try {
                const colorThief = new ColorThief();
                const palette = colorThief.getColor(this);
                resolve(palette.join(', '));
            } catch (e) {
                console.error(e);
            }
        }
    });
};

const stories = [
    {
        content: ({action, isPaused}) => {
            const handleClick = (e) => {
                e.preventDefault();
                action(isPaused ? 'play' : 'pause')
            };
            return (
                <div onClick={handleClick}
                     style={{height: '100%', width: '100%', background: 'white', padding: '50px 15px 0 15px'}}>
                    <h2>Attention! Reactive guys is here</h2>
                    <spam>Экспериментальный блок</spam>
                </div>
            );
        }
    },
    {
        url: 'https://picsum.photos/1080/1920',
        seeMore: ({close}) => (
            <div style={{width: '100%', height: '100%'}}>Hello</div>
        ),
        header: {
            heading: 'Mohit Karekar',
            subheading: 'Posted 5h ago',
            profileImage: 'https://picsum.photos/1000/1000'
        }
    },
    {
        url:
            'https://fsa.zobj.net/crop.php?r=dyJ08vhfPsUL3UkJ2aFaLo1LK5lhjA_5o6qEmWe7CW6P4bdk5Se2tYqxc8M3tcgYCwKp0IAyf0cmw9yCmOviFYb5JteeZgYClrug_bvSGgQxKGEUjH9H3s7PS9fQa3rpK3DN3nx-qA-mf6XN',
        header: {
            heading: 'Mohit Karekar',
            subheading: 'Posted 32m ago',
            profileImage: 'https://picsum.photos/1080/1920'
        }
    },
    {
        url:
            'https://media.idownloadblog.com/wp-content/uploads/2016/04/iPhone-wallpaper-abstract-portrait-stars-macinmac.jpg',
        header: {
            heading: 'test',
            subheading: 'Posted 32m ago',
            profileImage:
                'https://avatars0.githubusercontent.com/u/24852829?s=400&v=4'
        }
    },
    {
        url: 'https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4',
        type: 'video',
        duration: 1000
    },
    'https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80'
];

// const swipeableConfig = {
//     delta: window.screen.height / 100 * 30,
// };

export const Story = React.memo(({avatar, username, preview}) => {

    const {
        isOpen,
        openModal,
        closeModal
    } = useModal();

    const [boxShadowColor, setBoxShadowColor] = useState('0,0,0');

    useEffect(() => {
        getColor(preview).then(setBoxShadowColor);
    }, [preview]);

    // const handleSwipable = useSwipeable({onSwipedDown: closeModal, ...swipeableConfig});

    return (
        <div className={s.container} onClick={isOpen ? closeModal : openModal}>
            <img className={s.avatar}
                 src={avatar}
                 alt='User avatar'
            />
            <img className={s.previewImage}
                 src={preview}
                 style={{boxShadow: `0 14px 28px rgba(${boxShadowColor},0.25), 0 10px 10px rgba(${boxShadowColor},0.22)`}}
                 alt='Story preview'
            />
            <span className={s.username}>{username}</span>
            {
                isOpen &&
                <FullScreen onClose={closeModal}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <LoadableInstaStories
                            stories={
                                username === 'tiempo'
                                ? [{url: 'https://only-paper.ru/_ld/0/13932801.jpg', duration: 2000}, ...stories]
                                : stories
                            }
                            defaultInterval={1500}
                            onAllStoriesEnd={closeModal}
                        />
                    </div>
                </FullScreen>
            }
        </div>
    )
});