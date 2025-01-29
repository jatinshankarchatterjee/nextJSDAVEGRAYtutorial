import { Input } from "@/components/ui/input";
import { InputHTMLAttributes, useState, useEffect } from "react";

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
} & InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce]);// eslint-disable-line

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
}

export default DebouncedInput;
