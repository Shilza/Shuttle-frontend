import React, {useCallback} from "react";
import {isMobile} from "is-mobile";

import {UsersService} from "services";
import Paginator from "components/Paginator";
import Body from "./Body";
import {ListModal, MobileDrawer} from "ui";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const Follows = ({isFollowsModal, closeFollowsModal, dispatch, user}) => {

    const {id, follows_count, canSee} = user;

    const loadFollows = useCallback((page) => {
        return UsersService.getFollows(id, page)
            .then(({data}) => {
                dispatch.users.addFollows(data.data);
                return data;
            });
    }, [id, dispatch.users]);

    return (
        <>
            {
                isMobile() ?
                    <MobileDrawer
                        visible={isFollowsModal}
                        title='Follows'
                        onClose={closeFollowsModal}
                    >
                        <Paginator
                            fetcher={loadFollows}
                            useWindow={false}
                        >
                            <Body id={id} closeModal={closeFollowsModal}/>
                        </Paginator>
                    </MobileDrawer>
                    :
                    <>
                        {
                            (isFollowsModal && !!follows_count && canSee) &&
                            <Paginator
                                fetcher={loadFollows}
                                useWindow={false}
                            >
                                <ListModal onClose={closeFollowsModal} title={'Follows'} visible>
                                    <Body id={id} closeModal={closeFollowsModal}/>
                                </ListModal>
                            </Paginator>
                        }
                    </>
            }
        </>
    )
};

Follows.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        follows_count: PropTypes.number.isRequired,
        canSee: PropTypes.bool,
    })
};

const mapStateToProps = state => ({
    user: state.users.user
});

export default connect(mapStateToProps)(Follows);