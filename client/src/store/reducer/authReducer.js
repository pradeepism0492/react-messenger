import { REGISTER_FAIL, REGISTER_SUCESS } from "../types/authType";
import deCodeToken from "jwt-decode";

const authState = {
  loading: true,
  authenticate: false,
  error: "",
  successMessage: "",
  myInfo: "",
};
const tokenDecode = (token) => {
  const tokenDecoded = deCodeToken(token);
  const expTime = new Date(tokenDecoded.exp * 1000);
  if (new Date() > expTime) return null;
  else return tokenDecoded;
};
export const authReducer = (state = authState, action) => {
  const { payload, type } = action;
  if (type === REGISTER_FAIL) {
    console.log("payload===>", payload);
    return {
      ...state,
      error: payload.error,
      authenticate: false,
      myInfo: "",
      loading: true,
    };
  } else if (type === REGISTER_SUCESS) {
    const myInfo = tokenDecode(payload.token);
    return {
      ...state,
      myInfo: myInfo,
      successMessage: payload.successMessage,
      loading: true,
      error: "",
      authenticate: false,
    };
  }
  return state;

  // switch (type) {
  //   case REGISTER_FAIL:
  //     return {
  //       ...state,
  //       error: payload.error,
  //       authenticate: false,
  //       myInfo: "",
  //       loading: true,
  //     };
  //   default:
  //     return;
  // }
};
