import Cookies from "js-cookie";
import * as Constants from "../constants/String"
//specifically for userCookies
export function setUserCookies(userName, userType, userId) {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  Cookies.set(Constants.userName, userName, { expires, path: "/" });
  Cookies.set(Constants.userType, userType, { expires, path: "/" });
  Cookies.set(Constants.userId, userId, { expires, path: "/" });
}

export function setCookies(key,value) {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  Cookies.set(key, value, { expires, path: "/" });
}

export function getCookies() {
  const userName = Cookies.get(Constants.userName);
  const userType = Cookies.get(Constants.userType);
  const userId = Cookies.get(Constants.userId);
  const cookies = { userName, userType, userId};
  return cookies;
}

export function removeCookies() {
  Cookies.remove(Constants.userName);
  Cookies.remove(Constants.userType);
  Cookies.remove(Constants.userId);
  Cookies.remove(Constants.companyName);
  Cookies.remove(Constants.token);
  Cookies.remove(Constants.picture);
  sessionStorage.clear();
}
