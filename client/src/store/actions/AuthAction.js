import axios from "axios";
import { REGISTER_FAIL, REGISTER_SUCESS } from "../types/authType";

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/josn",
      },
    };
    try {
      const response = await axios.post(
        "/api/messenger/user-register",
        data,
        config
      );
      console.log("data loaded===>", response.data.token);
      localStorage.setItem("authToken", response.data.token);
      dispatch({
        type: REGISTER_SUCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
      console.log(error.response.data);
    }
  };
};
