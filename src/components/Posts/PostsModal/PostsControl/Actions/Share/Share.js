import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Drawer} from "react-pretty-drawer";

import {isMobile} from "utils";
import {IconButton, SimpleModal} from 'ui';
import planeIcon from "images/plane.svg";

import Body from "./Body";
import s from './share.module.css';

const Share = React.memo(({src, className}) => {

    const [isVisible, setIsVisible] = useState(false);

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
            {
                isMobile()
                    ?
                    <Drawer onClose={close} visible={isVisible} placement='bottom' height='90%'
                            className={s.drawer}>
                        <Body src={src} close={close}/>
                    </Drawer>
                    :
                    <SimpleModal visible={isVisible} onCancel={close}>
                        <div className={s.bodyWrapper}>
                            <Body src={src} close={close}/>
                        </div>
                    </SimpleModal>
            }
        </>
    )
});

Share.propTypes = {
    src: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Share;
