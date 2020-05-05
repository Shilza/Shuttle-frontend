import React, {useMemo, useState} from "react";
import PropTypes from 'prop-types';

import {IconButton} from 'ui';
import planeIcon from "images/plane.svg";

import {ShareModal} from "./ShareModal";

import s from './share.module.css';


const Share = React.memo(({src, className}) => {

    const [isVisible, setIsVisible] = useState(false);

    const postCode = useMemo(() => {
        if(src) {
            const srcSplitted = src.split('/');
            return srcSplitted[srcSplitted.length - 1].split('.')[0];
        }
        return '';
    }, [src]);

    const open = () => {
        setIsVisible(true);
    };

    const close = () => {
        setIsVisible(false);
    };

    return (
        <>
            <IconButton
                iconProps={{title: 'Share', icon: planeIcon, className: s.icon}}
                ariaLabel='Share post'
                title='Share post'
                className={`${s.button} ${className}`} onClick={open}
            />
            <ShareModal
                isVisible={isVisible}
                src={src}
                entityMessage={`${window.location.origin}/p/${postCode}`}
                onClose={close}
            />
        </>
    )
});

Share.propTypes = {
    src: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Share;
