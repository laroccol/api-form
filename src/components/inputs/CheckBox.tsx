import React from "react";
import { BaseInputProps } from "../../types/input";

export default React.forwardRef<HTMLInputElement, BaseInputProps>(
  function CheckBox({ value, onChange, disabled }, ref) {
    return (
      <input
        style={{ alignSelf: "flex-start", margin: 0 }}
        type={"checkbox"}
        value={value}
        onChange={onChange}
        disabled={disabled}
        ref={ref}
      />
    );
  }
);
