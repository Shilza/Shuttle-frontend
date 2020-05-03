import React from "react";
import FlipMove from 'react-flip-move';

import {useModal} from 'hooks';

import {Story} from "./Story";

import s from './stories.module.css';

const stories = [
    {
        id: 1,
        avatar: 'https://lh3.googleusercontent.com/proxy/k9JgOkx2d2kxUuIgsjgolTTQ3-gk7dpki-WiCXvIX4_I7wmandK2vpb0z1D3wHZRTll8Bx_qRMtNM4gZxXzW8jrbasA_ThA_ARBHP_o2BOWFHqWZ5ANaL5keqLqt3UFKr8Yu',
        username: 'jenifer',
        preview: 'https://s6.weddbook.com/t4/2/6/2/2625972/wonderful-places.jpg'
    },
    {
        id: 2,
        avatar: 'https://i.pinimg.com/originals/9f/a6/e6/9fa6e69f9d7dcd86989c8254f1483be8.jpg',
        username: 'kobalt',
        preview: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg'
    },
    {
        id: 3,
        avatar: 'https://i.pinimg.com/originals/97/e4/2a/97e42a82fc7911961d3ca55f54d1372c.jpg',
        username: 'rebecca',
        preview: 'https://m.buro247.ru/images/senina/ADID-Part.jpg'
    },
    {
        id: 4,
        avatar: 'https://i.pinimg.com/originals/d6/a9/57/d6a957f1d8045c9c973c12bf5968326f.jpg',
        username: 'sarah',
        preview: 'https://static.insydo.com/wp-content/uploads/2018/05/best-view-of-iconic-dubia-landmarks-burj-khalifa-e1527595214977-640x465.jpg'
    },
    {
        id: 5,
        avatar: 'https://i.pinimg.com/236x/b3/27/67/b32767980ada815185092f6d199ed55e.jpg',
        username: 'olivia',
        preview: 'https://i.pinimg.com/originals/f6/87/78/f6877851e81f9e70438679086316fcb7.jpg'
    },
    {
        id: 6,
        avatar: 'https://scontent-arn2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/54731758_422976725146209_6175135205368057185_n.jpg?_nc_ht=scontent-arn2-1.cdninstagram.com&_nc_cat=109&_nc_ohc=Df-qgr0mWUsAX-M7kR1&oh=293c258d1f36aa95c4b4a397202d22c7&oe=5ED8E94C',
        username: 'tiempo',
        preview: 'https://scontent-arn2-2.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/53882623_321331465234868_8166018443124263539_n.jpg?_nc_ht=scontent-arn2-2.cdninstagram.com&_nc_cat=108&_nc_ohc=6oNyGycSh0YAX9AT4Mh&oh=7c6cd0aecaca0d0c6dfa03467d4d46c8&oe=5ED9D64A'
    },
    {
        id: 7,
        avatar: 'https://scontent-arn2-2.cdninstagram.com/v/t51.2885-19/s150x150/67885529_510401589509264_3979583281904484352_n.jpg?_nc_ht=scontent-arn2-2.cdninstagram.com&_nc_ohc=jxlga0Wl8kkAX-njio7&oh=bd429cb4aaa0a2d25cfa73aa98121e72&oe=5ED7F3F6',
        username: 'kpss',
        preview: 'https://i1.sndcdn.com/artworks-000338902536-3lfgjj-t500x500.jpg'
    }
];

export const Stories = React.memo(() => {

    const {
        isOpen,
        openModal,
        closeModal
    } = useModal();

    return (
        <div className={s.container} style={isOpen ? {margin: '20px 0 0'} : {}}>
            <h2 className={s.title} onClick={isOpen ? closeModal : openModal}>Stories</h2>
            <FlipMove appearAnimation='none' enterAnimation='none' leaveAnimation='fade' duration='150'>
                {
                    isOpen &&
                    <FlipMove appearAnimation='accordionHorizontal' duration='200'>
                        <div className={s.storiesList}>
                            {
                                stories.map((story) => (
                                    <Story
                                        key={story.id}
                                        avatar={story.avatar}
                                        username={story.username}
                                        preview={story.preview}
                                    />
                                ))
                            }
                        </div>
                    </FlipMove>
                }
            </FlipMove>
        </div>
    )
});