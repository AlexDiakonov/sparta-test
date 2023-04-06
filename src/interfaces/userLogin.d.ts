import React, { Dispatch, SetStateAction } from "react";
import Cookies from "universal-cookie";

export interface UserLoginComponent {
  cookies: Cookies;
  setAuth: (val: boolean) => void;
}

export interface UserData {
  login: string;
  password: string;
}
