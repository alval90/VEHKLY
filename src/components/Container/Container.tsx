import React, { ReactNode } from 'react';
import './Container.css';

export enum ContainerSize {
  Small = '410px',
  Big = '1050px'
}
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
        display: 'flex',
        flexDirection: 'column',
        width: size,
        minHeight: minHeight
      }}
    >
      {children}
    </div>
  );
};
