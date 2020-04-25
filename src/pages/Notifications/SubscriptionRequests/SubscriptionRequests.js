import React, {useState} from "react";
import PropTypes from 'prop-types';
import SubRequestList from "./SubRequestsList";
import SubscriptionRequestsLabel from "./SubscriptionRequestsLabel";

const SubscriptionRequests = React.memo(({subscriptionsCount, mainAvatar}) => {

  let [isListOpen, setIsListOpen] = useState(false);

  const openList = () => setIsListOpen(true);

  return (
    <>
      {
        isListOpen
          ? <SubRequestList/>
          : <SubscriptionRequestsLabel
            count={subscriptionsCount}
            avatar={mainAvatar}
            openList={openList}
          />
      }
    </>
  );
});

SubscriptionRequests.propTypes = {
  subscriptionsCount: PropTypes.number,
  mainAvatar: PropTypes.string
};

export default SubscriptionRequests;
