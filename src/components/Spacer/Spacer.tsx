import React from 'react';

export enum Spacing {
  xs = '5px',
  s = '20px',
  m = '24px',
  l = '29px',
  xl = '40px'
}

interface SpacerProps {
  size: Spacing;
}
export const Spacer: React.FC<SpacerProps> = ({ size }) => {
  return <div style={{ height: size }} />;
};
