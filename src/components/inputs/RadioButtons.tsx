import React from "react";
import { RadioInputProps } from "../../types/input";

export default React.forwardRef<HTMLInputElement, RadioInputProps>(
  function RadioButtons({ value, onChange, id, options, disabled }, ref) {
    return (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {options.map((option) => {
          const uid = `${id}-${option.value}`;
          return (
            <div key={uid}>
              <input
                id={uid}
                type="radio"
                value={option.value}
                name={id}
                checked={value === option.value}
                onChange={onChange}
                disabled={disabled}
                ref={ref}
              />
              <label htmlFor={uid}>{option.display}</label>
            </div>
          );
        })}
      </div>
    );
  }
);
