interface InputProps {
  type?: "text" | "email" | "search" | "password";
  placeholder?: string;
  value?: string;
  name?: string;
  required?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  name,
  required = false,
  className = "",
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      required={required}
      onChange={onChange}
      className={`input ${className}`}
    />
  );
}