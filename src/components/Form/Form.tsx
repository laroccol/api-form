import React, { Fragment } from "react";

import { FormLayout, InputDataType, InputType } from "../../types/form";
import { FormControlState } from "../../hooks/useFormControl";
import { InputComponents } from "../../types/input";
import { CHANGE_HANDLERS } from "../../utils/changeHandlers";

import InputWrapper from "../inputs/InputWrapper";

import TextInput from "../inputs/TextInput";
import DateInput from "../inputs/DateInput";
import TextArea from "../inputs/TextArea";
import CheckBox from "../inputs/CheckBox";
import Dropdown from "../inputs/Dropdown";
import RadioButtons from "../inputs/RadioButtons";
import NumberInput from "../inputs/NumberInput";

/**
 * Default input components for each input type
 */
const DEAFULT_INPUT_COMPONENTS: InputComponents = {
  [InputType.BOOLEAN]: CheckBox,
  [InputType.DATE]: DateInput,
  [InputType.DROPDOWN]: Dropdown,
  [InputType.NUMBER]: NumberInput,
  [InputType.RADIO]: RadioButtons,
  [InputType.TEXT]: TextInput,
  [InputType.TEXTAREA]: TextArea,
};

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gap: "0.5rem",
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },
} as const;

/**
 * Props for the Form component
 * @param formLayout - The layout of the form
 * @param formState - The state of the form
 * @param inputComponents - Optional object containing custom input components
 * @param loading - Optional boolean indicating if the form is loading
 * @param disableButton - Optional boolean indicating if the submit button should be removed
 * @param onSubmit - Callback function to be called when the form is submitted
 * @param onChangeField - Callback function to be called when a field is changed
 */
interface FormProps {
  formLayout: FormLayout;
  formState: FormControlState;
  inputComponents?: InputComponents;
  loading?: boolean;
  disableButton?: boolean;
  onSubmit: () => void;
  onChangeField: (key: string, value: InputDataType) => void;
}

/**
 * Component for rendering a form based on a layout.
 */
export default function Form({
  formLayout,
  formState: { formData, formErrors },
  inputComponents,
  loading,
  disableButton,
  onSubmit,
  onChangeField,
}: FormProps) {
  return (
    <form style={styles.gridContainer}>
      {formLayout.map(
        ({
          id,
          inputType,
          length,
          paddingLeft,
          paddingRight,
          fillLine,
          hideConditions,
          displayValue,
          maxChars,
          required,
          ...inputProps
        }) => {
          const SetValue = (value: InputDataType) => {
            onChangeField(id, value);
          };

          // Check if we should hide input based on other input values
          let isVisible = true;
          if (hideConditions) {
            for (const condition of hideConditions) {
              if (condition.values.includes(formData[id])) {
                isVisible = false;
                break;
              }
            }
          }

          const label = displayValue ?? id;
          const InputComponent =
            inputComponents?.[inputType as InputType] ??
            DEAFULT_INPUT_COMPONENTS[inputType as InputType]; // Use custom input component if provided, otherwise use default

          let display = null;
          if (InputComponent) {
            display = (
              <InputComponent
                value={(formData[id] ?? "") as string}
                onChange={(event) => {
                  CHANGE_HANDLERS[inputType as InputType](
                    event,
                    SetValue,
                    maxChars ?? 1000
                  );
                }}
                maxChars={maxChars}
                options={inputProps.options || []}
                id={id}
                {...inputProps}
              />
            );
          }

          const fillPercent = fillLine ? length * 10 : 100;
          return (
            <Fragment key={id}>
              {paddingLeft && (
                <div
                  style={{
                    ...styles.gridItem,
                    gridColumn: `span ${paddingLeft}`,
                  }}
                />
              )}
              <div
                style={{
                  ...styles.gridItem,
                  display: isVisible ? undefined : "none",
                  gridColumn: `span ${
                    fillLine ? 10 - (paddingLeft ?? 0) : length
                  }`,
                }}
              >
                <div style={{ width: `${fillPercent}%` }}>
                  <InputWrapper
                    label={label}
                    required={required}
                    errorMessage={formErrors[id]}
                  >
                    {display}
                  </InputWrapper>
                </div>
              </div>
              {paddingRight && (
                <div
                  style={{
                    ...styles.gridItem,
                    gridColumn: `span ${paddingRight}`,
                  }}
                />
              )}
            </Fragment>
          );
        }
      )}
      <div style={{ marginTop: "0.5rem" }}>
        {!disableButton && (
          <button type="button" onClick={onSubmit} disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        )}
      </div>
    </form>
  );
}
