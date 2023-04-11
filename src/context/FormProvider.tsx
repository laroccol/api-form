import React from "react";
import { InputComponents } from "../types";

interface FormContextProps {
  inputComponents?: InputComponents;
}

const FormContext = React.createContext<FormContextProps>({});

export const useFormContext = () => React.useContext(FormContext);

interface FormProviderProps {
  inputComponents: InputComponents;
  children: React.ReactNode;
}

export const FormProvider = ({
  inputComponents,
  children,
}: FormProviderProps) => {
  return (
    <FormContext.Provider value={{ inputComponents }}>
      {children}
    </FormContext.Provider>
  );
};
