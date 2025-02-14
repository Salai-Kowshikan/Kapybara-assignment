import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ErrorMessage, useField } from "formik";

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder: string;
  list: { value: string; label: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  placeholder,
  list,
  ...props
}) => {
  const [field,, helpers] = useField(name);

  return (
    <div className="my-4">
      <div className="flex md:items-center max-sm:flex-col gap-4">
        <Label htmlFor={name} className="min-w-[160px] font-bold">
          {label}
        </Label>
        <Select
          value={field.value}
          onValueChange={(value) => helpers.setValue(value)}
          {...props}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {list.map((item, index) => (
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ErrorMessage name={name} className="text-red-500" />
    </div>
  );
};

export default SelectField;
