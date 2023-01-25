import axios from "axios";
export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/messenger/user-register",
        data,
        config
      );
      console.log("response===>", response);
    } catch (error) {
      console.log("error===>", error.response.data);
    }
  };
};
