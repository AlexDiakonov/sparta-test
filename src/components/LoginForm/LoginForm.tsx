import { useState } from "react";
import { UserData, UserLoginComponent } from "../../interfaces/userLogin";
import Button from "../ButtonComponent/Button";
import "./login.scss";
const LoginForm: React.FC<UserLoginComponent> = ({ cookies, setAuth }) => {
  const [userData, setUserData] = useState<UserData>({
    login: "",
    password: "",
  });

  const inputHandler = (
    e: React.FormEvent<HTMLInputElement>,
    objKey: string
  ) => {
    setUserData({
      ...userData,
      [objKey]: e.currentTarget.value,
    });
  };

  const logInUser = (e: React.SyntheticEvent, token: string): void => {
    e.preventDefault();

    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 1 * 60 * 60 * 1000);

    cookies.set("authToken", token, {
      path: "/",
      secure: true,
      sameSite: true,
      expires: expirationDate,
    });
    setAuth(true);
  };

  return (
    <form
      data-testid="login-form"
      className="login__form"
      onSubmit={(e) => {
        logInUser(
          e,
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        );
      }}
    >
      <input
        data-testid="login-input"
        className="login__form__input"
        onChange={(e) => inputHandler(e, "login")}
        type="text"
        placeholder="Enter login"
      />
      <input
        data-testid="password-input"
        className="login__form__input"
        onChange={(e) => inputHandler(e, "password")}
        type="text"
        placeholder="Enter password"
      />
      <Button className="login__form__submitBtn" type="submit">
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
