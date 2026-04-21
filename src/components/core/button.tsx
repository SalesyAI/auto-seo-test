import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const variantStyles = {
    "primary": "btn btn-primary",
    "outline": "btn btn-outline",
    "ghost": "btn btn-ghost",
  };

  const sizeStyles = {
    "sm": "btn-sm",
    "md": "",
    "lg": "btn-lg",
  };

  const combinedStyles = `${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedStyles}
      disabled={disabled}
    >
      {children}
    </button>
  );
}