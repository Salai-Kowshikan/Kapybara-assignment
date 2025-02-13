// filepath: /C:/Users/Kowshik/Documents/GitHub/Kapybara-assignment/src/components/Form/text-field.tsx
import { useField, ErrorMessage } from 'formik';

interface TextFieldProps {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}

function TextField({ label, placeholder, name, type , ...props }: TextFieldProps) {
  const [field, meta] = useField(name);

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <input
        {...field}
        {...props}
        placeholder={placeholder}
        type={type}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
}

export default TextField;