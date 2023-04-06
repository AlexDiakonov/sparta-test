import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../src/App";
import "@testing-library/jest-dom";
import React from "react";
import Cookies from "universal-cookie";

global.React = React;

describe("App component", () => {
  let cookies;

  beforeEach(() => {
    cookies = new Cookies();
    cookies.set("authToken", "test-token");
  });

  afterEach(() => {
    cookies.remove("authToken");
    localStorage.removeItem("todos");
  });
  test("renders login form when user is not authenticated", () => {
    cookies.remove("authToken");

    render(<App />);

    const loginFormElement = screen.getByTestId("login-form");
    expect(loginFormElement).toBeInTheDocument();
  });

  test("renders todo list when user is authenticated", () => {
    render(<App />);

    const todoListElement = screen.getByTestId("todo-list");
    expect(todoListElement).toBeInTheDocument();
  });

  test("logs out user when logout button is clicked", () => {
    render(<App />);

    const logoutButton = screen.getByTestId("logout-btn");
    fireEvent.click(logoutButton);

    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(cookies.get("authToken")).toBeUndefined();
    expect(localStorage.getItem("todos")).toBeNull();
  });
});
