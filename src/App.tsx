import "./App.scss";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import LoginForm from "./components/LoginForm";
import ToDoList from "./components/ToDoList";
import Button from "./components/ButtonComponent/Button";

const cookies = new Cookies();

const App: React.FC = () => {
  const [authUser, setAuth] = useState(false);

  useEffect(() => {
    cookies.get("authToken") ? setAuth(true) : setAuth(false);
  }, []);

  const logOutUser = (): void => {
    setAuth(false);
    cookies.remove("authToken");
    localStorage.removeItem("todos");
  };

  return (
    <div className="toDoApp">
      <div className="toDoApp__content">
        {!authUser ? (
          <LoginForm cookies={cookies} setAuth={setAuth} />
        ) : (
          <div>
            <Button testid="logout-btn" onClick={logOutUser}>
              Log out
            </Button>
            <ToDoList />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
