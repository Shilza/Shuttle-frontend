import React from "react";
import {Link} from "react-router-dom";

import s from "./profile.module.css";

const Profile = ({profile, my}) => {
    const onLickClick = (event) => {
        if (profile.error)
            event.preventDefault();
    };

    return (
        <div className={s.wrapper}>
            <Link to={`/${profile.username}`} className={my ? s.myContainer : s.container} onClick={onLickClick}>
                <div className={s.header}>
                    <img src={profile.avatar} className={s.avatar} alt=''/>
                    <div className={s.usernameBioContainer}>
                        <span className={s.username}>{profile.username}</span>
                        {profile.bio && <span className={s.bio}>{profile.bio}</span>}
                    </div>
                </div>
                {
                    profile.error && <div className={s.media} data-error={profile.error}/>
                }
            </Link>
        </div>
    );
};

export default Profile;
