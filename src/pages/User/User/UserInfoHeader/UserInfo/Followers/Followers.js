import React from "react";
import {isMobile} from "is-mobile";

import {UsersService} from "services";
import Paginator from "components/Paginator/Paginator";
import Body from "./Body";
import {ListModal, MobileDrawer} from "ui";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const Followers = ({isFollowersModal, closeFollowersModal, dispatch, user}) => {

    const {id, followers_count, canSee} = user;

    const loadFollowers = page => UsersService.getFollowers(id, page)
        .then(({data}) => {
            dispatch.users.addFollowers(data.data);
            return data;
        });

    return (
        <>
            {
                isMobile() ?
                    <MobileDrawer
                        visible={isFollowersModal}
                        title='Followers'
                        onClose={closeFollowersModal}
                    >
                        <Paginator
                            fetcher={loadFollowers}
                            useWindow={false}
                        >
                            <Body id={id} closeModal={closeFollowersModal}/>
                        </Paginator>
                    </MobileDrawer>
                    :
                    <>
                        {
                            (isFollowersModal && !!followers_count && canSee) &&
                            <Paginator
                                fetcher={loadFollowers}
                                useWindow={false}
                            >
                                <ListModal onClose={closeFollowersModal} title={'Followers'} visible>
                                    <Body id={id} closeModal={closeFollowersModal}/>
                                </ListModal>
                            </Paginator>
                        }
                    </>
            }
        </>
    )
};

Followers.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        followers_count: PropTypes.number.isRequired,
        canSee: PropTypes.bool,
    })
};

const mapStateToProps = state => ({
    user: state.users.user
});

export default connect(mapStateToProps)(Followers);