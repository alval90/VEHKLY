import React from 'react';
import {Container, ContainerSize} from "../Container/Container";
import Button from '@mui/material/Button';
import {Spacer, Spacing} from "../Spacer/Spacer";

export const Startpage : React.FC<{}> = () => {
    return (
        <Container size={ContainerSize.Small}>
            <Spacer size={Spacing.m} />
            <h1>VEHKLY</h1>
            <Spacer size={Spacing.s} />
            <h2>The new and easy way to plan your weekly meals.</h2>
            <Spacer size={Spacing.s} />
            <Button variant="contained">Login</Button>
            <Spacer size={Spacing.m} />
        </Container>
    )
}