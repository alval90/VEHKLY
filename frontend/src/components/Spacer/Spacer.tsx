import React from "react";
import { Spacing } from "./Spacing.ts";

interface SpacerProps {
  size: Spacing;
}
export const Spacer: React.FC<SpacerProps> = ({ size }) => {
  return <div style={{ height: size }} />;
};
