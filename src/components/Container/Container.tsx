import React, {ReactNode} from 'react';
import './Container.css';

export enum ContainerSize {
    Small = "410px",
    Big = "1050px"
}
interface ContainerProps {
    children: ReactNode;
    size: ContainerSize;
}
export const Container: React.FC<ContainerProps> = ({ children, size }) => {
    return (
        <div className="Container" style={{width: size}}>
            { children }
        </div>
    )
}