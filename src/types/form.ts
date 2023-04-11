/**
 * The type of data that can be entered into the form (primitive types).
 */
export type InputDataType = boolean | number | string;

/**
 * The type of input field that will be displayed on the form.
 */
export enum InputType {
  BOOLEAN = "boolean",
  DATE = "date",
  DROPDOWN = "dropdown",
  NUMBER = "number",
  RADIO = "radio",
  TEXT = "text",
  TEXTAREA = "textarea",
}

/**
 * The conditions for hiding the field.
 * @property {string} id - The id of the field to check.
 * @property {InputDataType | InputDataType[]} values - The values to check for.
 * @example
 * { id: "field_1", values: ["1", "2"] } // Hide field if the field with key "field_1" has a value of "1" or "2"
 */
export interface HideCondition {
  id: string;
  values: InputDataType[];
}

/**
 * The options for a dropdown or radio field.
 * @property {string} display - The display value of the option.
 * @property {string} value - The value of the option.
 * @example
 * {
 *  display: "Option 1",
 *  value: "option-1"
 * }
 */
export interface Option {
  display: string;
  value: string | number;
}

/**
 * Configuration for each field on the form.
 * @property {string} id - Required - The id of the field.
 * @property {InputType} inputType - Required - The type of input field that will be displayed on the form.
 * @property {number} length - Required - The number of columns the field will span (0-10).
 * @property {InputDataType} [defaultValue] - The default value for the field.
 * @property {string} [displayValue] - The display value for the field.
 * @property {boolean} [fillLine] - Whether the field will be on its own line.
 * @property {Object[]} [hideConditions] - The conditions for hiding the field (see HideCondition)
 * @property {number} [maxChars] - The maximum number of characters allowed in the field.
 * @property {Object[]} [options] - The options for a dropdown or radio field (see Option).
 * @property {number} [paddingLeft] - The number of columns of padding to the left of the field.
 * @property {number} [paddingRight] - The number of columns of padding to the right of the field.
 * @property {number} [precision] - The number of decimal places to display for a number field.
 * @property {boolean} [required] - Whether the field is required.
 */
export interface FieldOptions {
  id: string;
  inputType: InputType | string;
  length: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | number;
  defaultValue?: InputDataType;
  displayValue?: string;
  fillLine?: boolean;
  hideConditions?: HideCondition[];
  maxChars?: number;
  options?: Option[];
  paddingLeft?: number;
  paddingRight?: number;
  precision?: number;
  required?: boolean;
}

/**
 * The layout of the form.
 * @property {FieldOptions} [key] - The configuration for the field.
 * @example
 * [
 *  {
 *   id: "field_1",
 *   inputType: InputType.TEXT,
 *   length: 10,
 *   required: true
 *  },
 *  {
 *   id: "field_2",
 *   inputType: InputType.NUMBER,
 *   length: 5,
 *   required: true
 *  }
 * ]
 */
export type FormLayout = FieldOptions[];

/**
 * The data entered into the form as key value pairs.
 * @property {InputDataType} [key] - The data entered into the field.
 * @example
 * {
 *  field_1: "test",
 *  field_2: 1,
 *  field_3: true
 * }
 */
export type FormData = Record<string, InputDataType>;

/**
 * The errors that exist in the form.
 * @property {string} [key] - The error message for the field.
 * @example
 * {
 *  field_1: "This field is required",
 *  field_2: "This field must be a number"
 * }
 */
export type FormErrors = Record<string, string>;
