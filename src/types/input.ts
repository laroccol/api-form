import { InputType, Option } from "./form";

/**
 * Base input props shared by all input types
 * @property {string} value - The value of the input field.
 * @property {function} onChange - The function to call when the input field changes.
 * @property {boolean} [disabled] - Whether the input field is disabled.
 */
export interface BaseInputProps {
  value: string;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement
    >
  ) => void;
  disabled?: boolean;
}

/**
 * Props for a select input field
 * @property {Option[]} options - The options for the select field.
 */
export interface SelectInputProps extends BaseInputProps {
  options: Option[];
}

/**
 * Props for a number input field
 * @property {number} [min] - The minimum value for the number field.
 * @property {number} [max] - The maximum value for the number field.
 * @property {number} [step] - The step value for the number field.
 */
export interface NumberInputProps extends BaseInputProps {
  min?: number;
  max?: number;
  step?: number;
}

/**
 * Props for a radio input field
 * @property {string} id - The id of the radio field.
 */
export interface RadioInputProps extends SelectInputProps {
  id: string;
}

/**
 * Props for a text input field
 * @property {number} [maxChars] - The maximum number of characters for the text field.
 * @property {string} [type] - The type of text field (e.g. "email").
 */
export interface TextInputProps extends BaseInputProps {
  maxChars?: number;
  type?: string;
}

/**
 * Mapping of input types to their respective components
 */
export interface InputComponents {
  [InputType.BOOLEAN]?: React.FC<BaseInputProps>;
  [InputType.DATE]?: React.FC<BaseInputProps>;
  [InputType.DROPDOWN]?: React.FC<SelectInputProps>;
  [InputType.NUMBER]?: React.FC<NumberInputProps>;
  [InputType.RADIO]?: React.FC<RadioInputProps>;
  [InputType.TEXT]?: React.FC<TextInputProps>;
  [InputType.TEXTAREA]?: React.FC<TextInputProps>;
}
