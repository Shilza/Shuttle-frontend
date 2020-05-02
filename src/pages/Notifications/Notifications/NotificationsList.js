import React, {useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Paginator from "components/Paginator/Paginator";
import NotificationsExplainingLabel from "components/ExplainingLabels/NotificationsLabel/NotificationsExplainingLabel";
import NotificationsShimmer from "./NotificationsShimmer";
import Notification from "./Notification";
import styles from './notifications.module.css';


const NotificationsList = ({dispatch, subscriptionsCount, notifications}) => {

    const [firstLoading, setFirstLoading] = useState(false);

    const fetchNotifications = useCallback((page) => {
        return dispatch.notifications.get(page).then(data => {
            if (!firstLoading)
                setFirstLoading(true);
            return data;
        })
    }, [dispatch.notifications]); // eslint-disable-line

    return (
        <>
            <div className={notifications.length > 0 ? styles.notificationsList : ''}>
                {
                    notifications.length > 0 && <span className={styles.title}>Notifications</span>
                }
                {
                    !firstLoading && <NotificationsShimmer/>
                }
                <Paginator fetcher={fetchNotifications}>
                    {
                        !!notifications && notifications.map((item, index) =>
                            <Notification key={index} item={item}/>
                        )
                    }
                </Paginator>
            </div>
            {firstLoading && notifications.length === 0 && subscriptionsCount === 0 && <NotificationsExplainingLabel/>}
        </>
    );
};

NotificationsList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    notifications: PropTypes.array,
    subscriptionsCount: PropTypes.number,
    notificationsCount: PropTypes.number,
};

const mapStateToProps = state => ({
    notifications: state.notifications
});

export default connect(mapStateToProps)(NotificationsList);
