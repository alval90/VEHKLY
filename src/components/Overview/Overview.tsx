import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContextProps, useAuth } from '../../contexts/AuthContext';
import { Container, ContainerSize } from '../Container/Container';
import { Spacer, Spacing } from '../Spacer/Spacer';
import { Pagination } from '@mui/material';
import { MediaCard } from '../MediaCard/MediaCard';
import { ActionCard } from '../ActionCard/ActionCard';

export const Overview: React.FC<{}> = () => {
  const { user } = useAuth();
  const { week } = useParams();
  const navigate = useNavigate();

  const [breakfast, setBreakfast] = useState<string[]>([]);
  const [lunch, setLunch] = useState<string[]>([]);
  const [dinner, setDinner] = useState<string[]>([]);

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      let newArray = [...breakfast, "test"]
      setBreakfast(newArray);
    }
    /*if (!user) {
      navigate("/login");
    }*/
  })

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/overview/${value}`);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const dayLabelRow = days.map((day) => dayLabel({ day }));

  const updateBreakfast = () => {
    console.log("test");
  }

  return (
    <Container size={ContainerSize.Big}>
      <Spacer size={Spacing.m} />
      <h1>Week</h1>
      <Spacer size={Spacing.s} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={52}
          defaultPage={Number(week)}
          onChange={handleChange}
          color={'primary'}
          shape="rounded"
        />
      </div>
      <Spacer size={Spacing.m} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '95%',
          alignSelf: 'center'
        }}
      >
        {dayLabelRow}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '95%',
          alignSelf: 'center'
        }}
      >
        <MediaCard
          imageTitle={'test'}
          imagePath={'bla'}
          clickEvent={updateBreakfast}
        />
        <ActionCard label={'+ Add meal'} href={'test'} />
        <ActionCard label={'+ Add meal'} href={'test'} />
        <ActionCard label={'+ Add meal'} href={'test'} />
        <ActionCard label={'+ Add meal'} href={'test'} />
      </div>
      <div>{week}</div>
    </Container>
  );
};

interface DayProps {
  day: String;
}
const dayLabel: React.FC<DayProps> = ({ day }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '140px',
        height: '40px'
      }}
    >
      {day}
    </div>
  );
};
