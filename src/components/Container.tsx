import * as React from "react";

export type ContainerProps = {
  as?: string;
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  as,
  children,
  className,
}) => {
  const elemName = as ? as : "div";
  return React.createElement(
    elemName,
    {
      className: `container mx-auto py-4 px-4 ${className}`,
    },
    children
  );
};
