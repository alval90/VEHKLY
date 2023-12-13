import React from "react";
import { Container } from "../Container/Container.tsx";
import { Spacer } from "../Spacer/Spacer.tsx";
import { Spacing } from "../Spacer/Spacing.ts";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ContainerSize } from "../Container/ContainerSize.tsx";

export const Startpage: React.FC = () => {
  return (
    <Container size={ContainerSize.Small}>
      <Spacer size={Spacing.xl} />
      <h1>VEHKLY</h1>
      <Spacer size={Spacing.s} />
      <h2>The new and easy way to plan your weekly meals.</h2>
      <Spacer size={Spacing.s} />
      <Link to="login">
        <Button variant="contained">Login</Button>
      </Link>
    </Container>
  );
};
