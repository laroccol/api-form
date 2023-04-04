import moment from "moment";
import { InputType } from "../types/form";

/**
 * Callback function for handling boolean input changes.
 * @param {React.ChangeEvent<HTMLInputElement>} event - Event object containing details about the change event.
 * @param {(value: boolean) => void} setValue - Function to set the boolean value in the parent component.
 */
const booleanChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
  setValue: (value: boolean) => void
) => {
  setValue(event.target.checked);
};

/**
 * Callback function for handling date input changes.
 * @param {React.ChangeEvent<HTMLInputElement>} event - Event object containing details about the change event.
 * @param {(value: string) => void} setValue - Function to set the string value in the parent component.
 * @param {number} [maxChars] - Optional maximum number of characters allowed in the input.
 */
const dateChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
  setValue: (value: string) => void,
  maxChars?: number
) => {
  if (maxChars != null && event.target.value.length > maxChars) return;
  if (moment.isMoment(event.target.value)) {
    setValue(event.target.value.format("YYYY-MM-DD"));
  } else {
    setValue(event.target.value);
  }
};

/**
 * Callback function for handling text input changes.
 * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event - Event object containing details about the change event.
 * @param {(value: string) => void} setValue - Function to set the string value in the parent component.
 * @param {number} [maxChars] - Optional maximum number of characters allowed in the input.
 */
const textChangeHandler = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
  setValue: (value: string) => void,
  maxChars?: number
) => {
  const value = event.target.value;
  if (maxChars != null && value.length > maxChars) return;
  setValue(value);
};

/**
 * Object containing the change handler functions for each input type.
 */
export const CHANGE_HANDLERS = {
  [InputType.BOOLEAN]: booleanChangeHandler,
  [InputType.DATE]: dateChangeHandler,
  [InputType.DROPDOWN]: textChangeHandler,
  [InputType.NUMBER]: textChangeHandler,
  [InputType.RADIO]: textChangeHandler,
  [InputType.TEXT]: textChangeHandler,
  [InputType.TEXTAREA]: textChangeHandler,
};
