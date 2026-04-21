interface CardProps {
  children: React.ReactNode;
  elevated?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  elevated = false,
  className = "",
  onClick,
}: CardProps) {
  const baseStyles = "bg-surface rounded-card p-4 transition-all duration-300";
  const elevatedStyles = elevated ? "card-elevated" : "card";
  
  return (
    <div 
      className={`${baseStyles} ${elevatedStyles} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
