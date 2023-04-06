import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import LoginForm from "../../src/components/LoginForm";
import React from "react";

global.React = React;

describe("LoginForm component", () => {
  it("calls logInUser function with correct arguments on form submission", () => {
    // Mock the cookies object and setAuth function
    const cookies = {
      set: jest.fn(),
    };
    const setAuth = jest.fn();

    // Render the component
    render(<LoginForm cookies={cookies} setAuth={setAuth} />);

    // Simulate user input and form submission
    const loginInput = screen.getByTestId("login-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByText("Log in");
    fireEvent.change(loginInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    // Check that logInUser function was called with correct arguments
    expect(cookies.set).toHaveBeenCalledWith(
      "authToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      expect.objectContaining({
        path: "/",
        secure: true,
        sameSite: true,
        // expires should be approximately 1 hour from now
        expires: expect.any(Date),
      })
    );
    expect(setAuth).toHaveBeenCalledWith(true);
  });
});
