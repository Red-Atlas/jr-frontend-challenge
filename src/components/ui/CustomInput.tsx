import { ErrorMessage, Field } from "formik";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  id: string;
  className?: string;
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
}

const CustomInput = ({
  placeholder,
  id,
  className,
  fontSize,
  ...props
}: Props) => {
  return (
    <div className="relative w-full h-full">
      <Field
        id={id}
        className={`block pr-2 pl-3 pb-2 pt-4 w-full h-full text-custom-blue-50 bg-transparent border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer text-${fontSize} ${className}`}
        placeholder=""
        name={id}
        {...props}
      />

      <label
        htmlFor={id}
        className={`absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:font-semibold px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-${fontSize}`}
      >
        {placeholder}
      </label>
      <ErrorMessage
        className="text-red-500 text-xs w-full"
        name={id}
        component="p"
      />
    </div>
  );
};

export default CustomInput;
