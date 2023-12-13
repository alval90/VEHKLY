import React, { ReactNode } from "react";
import "./Container.css";
import { ContainerSize } from "./ContainerSize.tsx";

interface ContainerProps {
  children: ReactNode;
  size: ContainerSize;
}
export const Container: React.FC<ContainerProps> = ({ children, size }) => {
  let minHeight = "230px";
  if (size === ContainerSize.Big) {
    minHeight = "700px";
  }
  return (
    <div
      className="Container"
      style={{
        display: "flex",
        flexDirection: "column",
        width: size,
        minHeight: minHeight,
      }}
    >
      {children}
    </div>
  );
};
