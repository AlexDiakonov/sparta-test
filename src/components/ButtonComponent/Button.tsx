import React from "react";
import { ButtonProps } from "../../interfaces/Button";
import "./button.scss";
const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  type = "button",
  children,
  testid,
}) => {
  return (
    <button
      className={`${className} btn_style`}
      type={type}
      onClick={onClick}
      data-testid={testid}
    >
      {children}
    </button>
  );
};

export default Button;
