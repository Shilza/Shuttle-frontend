import React, {useRef} from "react"
import PropTypes from "prop-types"
import moment from "moment"

import {isMobile} from "utils"
import TopPagination from "components/TopPagination"
import Loader from "components/Paginator/Loader"
import StartMessagingLabel from "components/ExplainingLabels/StartMessagingLabel/StartMessagingLabel"

import Message from "../Message"
import Slider from "./Slider"

import s from "./messagesList.module.css"

const getMessageDate = (created_at, lastMessageRef) => {
  let text;
  if (lastMessageRef.current) {
    let momentLst = moment(lastMessageRef.current);
    let momentCur = moment(created_at);

    if (momentLst.format("D MMMM YYYY") !== momentCur.format("D MMMM YYYY")) {
      if (momentLst.year() === momentCur.year()) {
        if (momentCur.format("D MMMM") === moment().format("D MMMM"))
          text = "today";
        else
          text = momentCur.format("D MMMM");
      } else
        text = momentCur.format("D MMMM YYYY");
    }
  } else {
    if (moment(created_at).format("D MMMM") === moment().format("D MMMM"))
      text = "today";
    else
      text = moment(created_at).format("D MMMM")
  }
  lastMessageRef.current = created_at;

  return text && <div className={s.date}>{text}</div>;
};

const MessagesList = ({messages, getScrollParent, myId, getMessages, deleteMsg, isFirstLoading}) => {

  let lastMessage = useRef(null);

  return (
    <TopPagination
      fetcher={getMessages}
      loader={<Loader/>}
      withScrollHandler
      getScrollParent={getScrollParent}
      className={s.container}
      toBottom
    >
      <Slider>
        <div className={isMobile() ? s.mobileMessages : s.messages}>
          <div className={s.absoluteWrapper}>
            {
              !isFirstLoading && messages.length === 0 ?
                <div className={s.explainingContainer}>
                  <StartMessagingLabel/>
                </div>
                :
                messages.map((message) => (
                    <>
                      {getMessageDate(message.created_at, lastMessage)}
                      <Message
                        key={message.id}
                        id={message.id}
                        my={message.owner_id === myId}
                        text={message.text}
                        read={message.read}
                        time={message.created_at}
                        images={message.images}
                        post={message.post}
                        deleteMsg={deleteMsg}
                      />
                    </>
                  )
                )
            }
          </div>
        </div>
      </Slider>
    </TopPagination>
  );
};

MessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  myId: PropTypes.number.isRequired,
  getMessages: PropTypes.func.isRequired,
  isFirstLoading: PropTypes.bool.isRequired,
  deleteMsg: PropTypes.func.isRequired,
  getScrollParent: PropTypes.func.isRequired
};

export default MessagesList;
