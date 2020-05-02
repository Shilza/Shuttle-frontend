import React from "react";
import PropTypes from 'prop-types';
import NotificationBlank from "./NotificationBlank";
import transitions from './transitions.module.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const NotificationsShimmer = ({count = 10}) => {
    const getNotificationsBlanks = () => {
        const notificationsBlanks = [];

        for (let i = 0; i < count; i++)
            notificationsBlanks.push(<NotificationBlank key={i}/>);

        return notificationsBlanks;
    };

    return (
        <ReactCSSTransitionGroup
            transitionName={transitions}
            transitionAppear={false}
            transitionEnter={false}
            transitionLeaveTimeout={500}>
            {
                getNotificationsBlanks()
            }
        </ReactCSSTransitionGroup>
    );
};

NotificationsShimmer.propTypes = {
    count: PropTypes.number
};

export default React.memo(NotificationsShimmer);