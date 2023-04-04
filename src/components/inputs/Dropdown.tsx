import React from "react";
import { SelectInputProps } from "../../types/input";

export default React.forwardRef<HTMLSelectElement, SelectInputProps>(
  function Dropdown({ value, onChange, options, disabled }, ref) {
    return (
      <select value={value} onChange={onChange} disabled={disabled} ref={ref}>
        <option value="">Select Option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.display}
          </option>
        ))}
      </select>
    );
  }
);
