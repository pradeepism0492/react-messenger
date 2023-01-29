import {
  ERROR_CLEAR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SUCCESS_MESSAGE_CLEAR,
} from "../types/authType";
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
const getToken = localStorage.getItem("authToken");
if (getToken) {
  const getInfo = tokenDecode(getToken);
  if (getInfo) {
    authState.myInfo = getInfo;
    authState.authenticate = true;
    authState.loading = false;
    authState.error = "";
  }
  console.log(getToken);
}

export const authReducer = (state = authState, action) => {
  const { payload, type } = action;
  switch (type) {
    case REGISTER_FAIL:
      return {
        ...state,
        error: payload.error,
        authenticate: false,
        myInfo: "",
        loading: true,
      };
    case REGISTER_SUCCESS:
      const myInfo = tokenDecode(payload.token);
      return {
        ...state,
        myInfo: myInfo,
        successMessage: payload.successMessage,
        loading: true,
        error: "",
        authenticate: true,
      };
    case SUCCESS_MESSAGE_CLEAR:
      return {
        ...state,
        successMessage: "",
      };
    case ERROR_CLEAR:
      return {
        ...state,
        error: "",
      };

    default:
      return state;
  }
};
