import * as React from "react";

export type ContainerProps = {
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`container mx-auto px-4 md:px-10 max-w-5xl ${className}`}>
      {children}
    </div>
  );
};
