interface TextAreaProps {
  placeholder?: string;
  value?: string;
  name?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({
  placeholder,
  value,
  name,
  required = false,
  rows = 4,
  className = "",
  onChange,
}: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      name={name}
      required={required}
      rows={rows}
      onChange={onChange}
      className={`input textarea ${className}`}
    />
  );
}