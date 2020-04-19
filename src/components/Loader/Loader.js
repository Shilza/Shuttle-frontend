import React from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import s from './loader.module.css';

const LoaderIcon = (props) => <Icon type="loading" {...props}/>;

function WithLoading(Component) {
    return function WihLoadingComponent({isLoading, loaderLabel, loaderIconProps, ...props}) {
        if (!isLoading) return (<Component {...props} />);
        return (
            <div className={s.container}>
                <LoaderIcon {...loaderIconProps}/>
                {loaderLabel}
            </div>
        )
    }
}

WithLoading.propTypes = {
    Component: PropTypes.element.isRequired,
    loaderLabel: PropTypes.element,
    loaderIconProps: PropTypes.any
};

export default WithLoading;
