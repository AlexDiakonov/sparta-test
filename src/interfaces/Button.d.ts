export interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  testid?: string;
}
