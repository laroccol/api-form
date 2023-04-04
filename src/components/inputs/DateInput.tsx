import React from "react";
import { BaseInputProps } from "../../types/input";

export default React.forwardRef<HTMLInputElement, BaseInputProps>(
  function DateInput({ value, onChange, disabled }, ref) {
    return (
      <input
        type={"date"}
        value={value}
        onChange={onChange}
        disabled={disabled}
        ref={ref}
      />
    );
  }
);
