import { useField, ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TextFieldProps {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}

function TextField({
  label,
  placeholder,
  name,
  type,
  ...props
}: TextFieldProps) {
  const [field] = useField(name);

  return (
    <div className="my-4 flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        {...field}
        {...props}
        placeholder={placeholder}
        type={type}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
}

export default TextField;
