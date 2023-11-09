import React from 'react';
import {Container, ContainerSize} from "../Container/Container";

export const Startpage : React.FC<{}> = () => {
    return (
        <Container size={ContainerSize.Small}>
            <h1>VEHKLY</h1>
            <h2>The new and easy way to plan your weekly meals.</h2>
            <button>Login</button>
        </Container>
    )
}