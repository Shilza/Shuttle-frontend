import React from "react";
import {Drawer} from "react-pretty-drawer";
import PropTypes from "prop-types";
import {Title} from "./Title";
import s from "./mobileDrawer.module.css";

export const MobileDrawer = React.memo(({
                                            children, title, visible, className, containerClassName, placement, height,
                                            header,
                                            ...props
}) => (
    <Drawer
        visible={visible}
        className={`${s.drawer} ${className || ""}`}
        placement={placement || 'bottom'}
        height={height || '90%'}
        {...props}
    >
        <>
            {title && <Title>{title}</Title>}
            {header || null}
            <div className={`${s.containerClassName} ${containerClassName || ''}`}>
                {children}
            </div>
        </>
    </Drawer>
));

MobileDrawer.propTypes = {
    children: PropTypes.ReactNode,
    title: PropTypes.ReactNode,
    header: PropTypes.ReactNode,
    visible: PropTypes.bool,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    placement: PropTypes.string,
    height: PropTypes.string
};