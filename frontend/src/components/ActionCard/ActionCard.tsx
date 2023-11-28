import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActionCard.css';

interface ActionCardProps {
  label: string;
  href: string;
}
export const ActionCard: React.FC<ActionCardProps> = ({ label, href }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(href);
  };
  return (
    <div onClick={handleClick} className={'ActionCard'}>
      <p>{label}</p>
    </div>
  );
};
