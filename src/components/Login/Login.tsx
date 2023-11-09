import React from 'react';
import {Container, ContainerSize} from "../Container/Container";
import Button from '@mui/material/Button';
import {Spacer, Spacing} from "../Spacer/Spacer";
import { Link } from "react-router-dom";

export const Login : React.FC<{}> = () => {
    return (
        <Container size={ContainerSize.Small}>
            <Spacer size={Spacing.m} />
            <h1>Login</h1>
            <p>Don't have an account yet? <Link to={`/register`}>Register</Link></p>
            <h2>The new and easy way to plan your weekly meals.</h2>
            <Spacer size={Spacing.s} />
            <Button variant="contained">Continue</Button>
            <Spacer size={Spacing.m} />
        </Container>
    )
}