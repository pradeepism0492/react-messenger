import axios from "axios";
import { FRIEND_GET_SUCCESS } from "../types/messengerType";
export const getFriends = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/messenger/get-friends");
    console.log(response.data);
    dispatch({
      type: FRIEND_GET_SUCCESS,
      payload: {
        friends: response.data.friends,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageSend = (data) => async (dispatch) => {
  console.log(data);
  try {
    const response = await axios.post("/api/messenger/send-message", data);
    console.log(response);
  } catch (error) {
    console.log(error.response.data);
  }
};
