import "./Tag.scss";

interface TagProps {
  type: string;
  className?: string;
  children?: React.ReactNode;
}

export const Tag = ({ type, className, children }: TagProps) => {
  return (
    <span className={`tag ${className ?? ""}`}>
      {type}
      {children}
    </span>
  );
};
