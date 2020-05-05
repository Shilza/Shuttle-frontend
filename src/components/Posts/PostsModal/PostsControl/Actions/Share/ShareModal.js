import React from "react";
import {Drawer} from "react-pretty-drawer";

import {isMobile} from "utils";
import {SimpleModal} from "ui";

import Body from "./Body";

import s from "./share.module.css";

export const ShareModal = React.memo(({isVisible, src, entityMessage, onClose}) => {
    return (
        <>
            {
                isMobile()
                    ?
                    <Drawer onClose={onClose} visible={isVisible} placement='bottom' height='90%'
                            className={s.drawer}>
                        <Body src={src} entityMessage={entityMessage} close={onClose}/>
                    </Drawer>
                    :
                    <SimpleModal visible={isVisible} onCancel={onClose}>
                        <div className={s.bodyWrapper}>
                            <Body src={src} entityMessage={entityMessage} close={onClose}/>
                        </div>
                    </SimpleModal>
            }
        </>
    )
});