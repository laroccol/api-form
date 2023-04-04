import React from "react";
import { TextInputProps } from "../../types/input";

export default React.forwardRef<HTMLTextAreaElement, TextInputProps>(
  function TextInput({ value, onChange, maxChars, disabled }, ref) {
    return (
      <textarea
        value={value}
        onChange={onChange}
        maxLength={maxChars}
        disabled={disabled}
        ref={ref}
      />
    );
  }
);
