import React from "react";

interface InputWrapperProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  children: React.ReactNode;
}

export default function InputWrapper({
  label,
  required,
  helperText,
  errorMessage,
  children,
}: InputWrapperProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "0.5rem",
      }}
    >
      {label && (
        <label>
          <span>{`${label.toUpperCase()}${required ? " * " : ""}`}</span>
        </label>
      )}
      {children}
      {helperText && <label>{helperText}</label>}
      {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
    </div>
  );
}
