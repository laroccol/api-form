import React, { useReducer } from "react";
import {
  FormData,
  FormErrors,
  FormLayout,
  InputDataType,
  InputType,
} from "../types/form";

/**
 * Set default values if any exist otherwise set to respective empty value (string | number: "", boolean: false)
 * @param formLayout - The layout of the form.
 * @param defaultData - The default data for the form (If the form corresponds to a piece of data that is to be edited).
 * @returns The default data for the form.
 */
const generateDefaultFormData = (
  formLayout: FormLayout,
  defaultData?: FormData | null
): FormData => {
  const formData: FormData = defaultData || {};

  formLayout.map(({ id, inputType, defaultValue }) => {
    if (formData[id] != null) return; // If the field already has a value then don't overwrite it

    // If the field doesn't spcify a default value then set it to the respective empty value
    if (defaultValue == null) {
      if (inputType === InputType.BOOLEAN) {
        formData[id] = false;
        return;
      } else {
        formData[id] = "";
        return;
      }
    }
    formData[id] = defaultValue;
  });

  return formData;
};

/**
 * Reset the form to an empty state.
 * @param state - The current state of the form.
 * @param formLayout - The layout of the form.
 * @returns The new state of the form.
 */
const reset = (
  state: FormControlState,
  formLayout: FormLayout
): FormControlState => {
  const formData = generateDefaultFormData(formLayout, null);

  return { ...state, formData, formErrors: {} };
};

/**
 * Change a field in the form.
 * @param state - The current state of the form.
 * @param key - The key of the field to change.
 * @param value - The new value of the field.
 * @returns The new state of the form.
 */
const changeField = (
  state: FormControlState,
  key: string,
  value: InputDataType
): FormControlState => {
  return { ...state, formData: { ...state.formData, [key]: value } };
};

/**
 * Check if the form data is valid.
 * @param data - The form data.
 * @param formLayout - The layout of the form.
 * @returns The errors in the form data (see FormErrors).
 */
const checkData = (data: FormData, formLayout: FormLayout): FormErrors => {
  const errors: FormErrors = {};
  formLayout.map(({ id, required }) => {
    if ((required && data[id] === "") || data[id] === null) {
      errors[id] = "Field is required";
    }
  });
  return errors;
};

/**
 * Numbers in the form data are stored as strings so they need to be parsed to numbers.
 * @param data - The form data.
 * @param formLayout - The layout of the form.
 * @returns The form data with numbers parsed.
 */
const parseNumbers = (data: FormData, formLayout: FormLayout): FormData => {
  const parsedData: FormData = {};
  formLayout.map(({ id, inputType }) => {
    if (inputType === InputType.NUMBER) {
      parsedData[id] = Number(data[id]);
    } else {
      parsedData[id] = data[id];
    }
  });
  return parsedData;
};

/**
 * Submit the form.
 * @param state - The current state of the form.
 * @param formLayout - The layout of the form.
 * @param onSubmit - The function to call when the form is submitted.
 * @returns The new state of the form.
 */
const submit = (
  state: FormControlState,
  formLayout: FormLayout,
  onSubmit: (data: FormData) => any | Promise<any>
): FormControlState => {
  // Check if the form data is valid
  const errors = checkData(state.formData, formLayout);

  // If there are no errors then submit the form
  if (Object.keys(errors).length === 0) {
    onSubmit(parseNumbers(state.formData, formLayout)); // Parse numbers before submitting
  }

  return { ...state, formErrors: errors };
};

// Actions
interface ResetAction {
  type: "reset";
  formLayout: FormLayout;
}
interface SubmitAction {
  type: "submit";
  formLayout: FormLayout;
  onSubmit: (data: FormData) => any | Promise<any>;
}

interface ChangeFieldAction {
  type: "changeField";
  key: string;
  value: InputDataType;
}

export type FormDataReducerAction =
  | ResetAction
  | SubmitAction
  | ChangeFieldAction;

/**
 * The reducer for the form state.
 * @param state - The current state of the form.
 * @param action - The action to perform on the form state.
 * @returns The new state of the form.
 */
const reducer = (
  state: FormControlState,
  action: FormDataReducerAction
): FormControlState => {
  switch (action.type) {
    case "reset":
      return reset(state, action.formLayout);
    case "submit":
      return submit(state, action.formLayout, action.onSubmit);
    case "changeField":
      return changeField(state, action.key, action.value);
    default:
      throw new Error();
  }
};

export interface FormControlState {
  formData: FormData;
  formErrors: FormErrors;
}

/**
 * Hook for managing the state of a form.
 * @param formLayout - REQUIRED - The layout of the form.
 * @param onSubmit - The function to call when the form is submitted.
 * @param defaultData - The default data for the form.
 * @returns The form state and dispatch functions.
 */
export function useFormControl(
  formLayout: FormLayout,
  onSubmit: (data: FormData) => any | Promise<any>,
  defaultData?: FormData
) {
  const [formState, formDispatch] = useReducer(reducer, {
    formData: generateDefaultFormData(formLayout, defaultData),
    formErrors: {},
  });

  /**
   * Reset the form to an empty state.
   */
  const reset = () => {
    formDispatch({ type: "reset", formLayout });
  };

  /**
   * Check if the form data is valid and submit the form if it is.
   */
  const submit = () => {
    formDispatch({ type: "submit", formLayout, onSubmit });
  };

  /**
   * Change a field in the form.
   * @param key - The key of the field to change.
   * @param value - The new value of the field.
   */
  const changeField = (key: string, value: InputDataType) => {
    formDispatch({ type: "changeField", key, value });
  };

  return {
    formState,
    changeField,
    submit,
    reset,
  };
}
