import React from "react";
import { NumberInputProps } from "../../types/input";

export default React.forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput({ value, onChange, min, max, step, disabled }, ref) {
    return (
      <input
        type="number"
        value={value}
        onChange={onChange}
        min={min ?? -1000000000}
        max={max ?? 1000000000}
        step={step ?? 1}
        disabled={disabled}
        ref={ref}
      />
    );
  }
);
