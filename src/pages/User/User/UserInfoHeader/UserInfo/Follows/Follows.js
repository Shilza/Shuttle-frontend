import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {isMobile} from "utils";
import {UsersService} from "services";
import {ListModal, MobileDrawer} from "ui";
import Paginator from "components/Paginator";
import Loader from "components/Paginator/Loader";

import Body from "./Body";

const Follows = ({isFollowsModal, closeFollowsModal, dispatch, user}) => {

    const {id, follows_count, canSee} = user;
    const [isLoading, setIsLoading] = useState(false);

    const loadFollows = useCallback((page) => {
        setIsLoading(true);
        return UsersService.getFollows(id, page)
            .then(({data}) => {
                dispatch.users.addFollows(data.data);
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
                        visible={isFollowsModal}
                        title='Follows'
                        onClose={closeFollowsModal}
                    >
                        <Paginator
                            fetcher={loadFollows}
                            useWindow={false}
                        >
                            {
                                isLoading
                                    ? <Loader/>
                                    : <Body id={id} closeModal={closeFollowsModal}/>
                            }
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