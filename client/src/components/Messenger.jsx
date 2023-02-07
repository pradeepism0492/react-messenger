import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEllipsisH, FaEdit, FaSistrix } from "react-icons/fa";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import RightSide from "./RightSide";
import { useEffect } from "react";
import { getFriends, messageSend } from "../store/actions/messangerAction";
import { useState } from "react";

const Messenger = () => {
  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const inputMessageHandle = (e) => {
    setNewMessage(e.target.value);
  };

  // sendMessage evemt
  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      senderName: myInfo.userName,
      reseverId: currentFriend._id,
      message: newMessage ? newMessage : "❤",
    };
    dispatch(messageSend(data));
  };

  const { friends } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);
  useEffect(() => {
    if (friends?.length) {
      setCurrentFriend(friends[0]);
    }
  }, [friends]);
  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`/images/${myInfo.image}`} alt="" />
                </div>
                <div className="nam">
                  <h3> {myInfo.userName}</h3>
                </div>
              </div>
              <div className="icons">
                <div className="icon">
                  <FaEllipsisH />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
              </div>
            </div>
            <div className="friend-search">
              <div className="search">
                <button>
                  <FaSistrix />
                </button>
                <input
                  type="text"
                  placeholder="search"
                  className="form-control"
                />
              </div>
            </div>
            <div className="active-friends">
              <ActiveFriend />
            </div>
            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((fd) => (
                    <div
                      onClick={() => setCurrentFriend(fd)}
                      className={
                        currentFriend?._id === fd._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                    >
                      <Friends friend={fd} />
                    </div>
                  ))
                : "No Friend"}
            </div>
          </div>
        </div>
        {currentFriend ? (
          <RightSide
            currentFriend={currentFriend}
            inputMessageHandle={inputMessageHandle}
            newMessage={newMessage}
            sendMessage={sendMessage}
          />
        ) : (
          "Please select your friend"
        )}
      </div>
    </div>
  );
};

export default Messenger;
