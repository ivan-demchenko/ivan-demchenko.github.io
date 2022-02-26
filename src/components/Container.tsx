import * as React from "react";
import cx from "classnames";
import * as ContainerCSS from "./Container.module.css";

export type ContainerProps = {
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
}) => {
  return <div className={cx(ContainerCSS.wrapper, className)}>{children}</div>;
};
