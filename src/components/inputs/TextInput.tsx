import React from "react";
import { TextInputProps } from "../../types/input";

export default React.forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ value, onChange, maxChars, type, disabled }, ref) {
    return (
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        maxLength={maxChars}
        disabled={disabled}
        ref={ref}
      />
    );
  }
);
