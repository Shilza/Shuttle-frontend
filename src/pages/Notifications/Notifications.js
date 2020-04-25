import React, {useEffect, useState} from "react";
import {SubscriptionRequestsService} from "services";
import SubscriptionRequests from "./SubscriptionRequests/SubscriptionRequests";
import NotificationsList from "./Notifications/NotificationsList";
import styles from './notifications.module.css';

const Notifications = React.memo(() => {

    let [mainAvatar, setMainAvatar] = useState(undefined);
    let [subscriptionsCount, setSubscriptionCount] = useState(0);

    useEffect(() => {
        SubscriptionRequestsService.getSubsRequestsPreview().then(({data: {avatar, count}}) => {
            setMainAvatar(avatar);
            setSubscriptionCount(count || 0);
        });
    }, []);

    return (
        <div className={styles.notificationsContainer}>
            <SubscriptionRequests
                subscriptionsCount={subscriptionsCount}
                mainAvatar={mainAvatar}
            />
            <NotificationsList subscriptionsCount={subscriptionsCount}/>
        </div>
    );
});

export default Notifications;
