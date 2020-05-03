import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {isMobile} from "utils";
import {UsersService} from "services";
import {ListModal, MobileDrawer} from "ui";
import Paginator from "components/Paginator/Paginator";
import Loader from "components/Paginator/Loader";

import Body from "./Body";

const Followers = ({isFollowersModal, closeFollowersModal, dispatch, user}) => {

    const {id, followers_count, canSee} = user;
    const [isLoading, setIsLoading] = useState(false);

    const loadFollowers = useCallback((page) => {
        setIsLoading(true);
        return UsersService.getFollowers(id, page)
            .then(({data}) => {
                dispatch.users.addFollowers(data.data);
                return data;
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [id, dispatch.users]);

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
                            {
                                isLoading
                                ? <Loader/>
                                : <Body id={id} closeModal={closeFollowersModal}/>
                            }
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