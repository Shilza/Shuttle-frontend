import React from "react";
import PropTypes from "prop-types";
import {Drawer} from "react-pretty-drawer";
import {useSwipeable} from "react-swipeable";
import {Title} from "./Title";
import s from "./mobileDrawer.module.css";

const swipeableConfig = {
    delta: window.screen.height / 100 * 40,
};

export const MobileDrawer = React.memo(({
                                            children, title, visible, className, containerClassName, placement, height,
                                            header,
                                            ...props
                                        }) => {

    const handleSwipable = useSwipeable({onSwipedDown: props.onClose, ...swipeableConfig});

    return (
        <Drawer
            visible={visible}
            className={`${s.drawer} ${className || ""}`}
            placement={placement || 'bottom'}
            height={height || '90%'}
            {...props}
        >
            <div {...handleSwipable}>
                {title && <Title>{title}</Title>}
                {header || null}
                <div className={`${s.containerClassName} ${containerClassName || ''}`}>
                    {children}
                </div>
            </div>
        </Drawer>
    )
});

MobileDrawer.propTypes = {
    children: PropTypes.ReactNode,
    title: PropTypes.ReactNode,
    header: PropTypes.ReactNode,
    visible: PropTypes.bool,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    titleClassName: PropTypes.string,
    placement: PropTypes.string,
    height: PropTypes.string
};