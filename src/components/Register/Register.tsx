import React, {useState} from 'react';
import {Container, ContainerSize} from '../Container/Container';
import Button from '@mui/material/Button';
import {Spacer, Spacing} from '../Spacer/Spacer';
import {TextField} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {getCurrentWeekMealPlanURL} from "../../utils/dateUtils";

export const Register: React.FC<{}> = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [repPassword, setRepPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // TODO error handling being managed by material ui. No error on submit or when invalid value
    if (password !== repPassword) {
      setPasswordError(true);
      return;
    }
    if (email && password) {
      // TODO Login

      navigate(getCurrentWeekMealPlanURL());
    }
  };

  const handleEmailChange = (e: any) => {
    e.preventDefault();
    if (emailError) {
      setEmailError(false);
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    e.preventDefault();
    if (passwordError) {
      setPasswordError(false);
    }
    setPassword(e.target.value);
  };

  const handleRepPasswordChange = (e: any) => {
    e.preventDefault();
    if (passwordError) {
      setPasswordError(false);
    }
    setRepPassword(e.target.value);
  };

  return (
    <Container size={ContainerSize.Small}>
      <Spacer size={Spacing.m} />
      <h1>Register</h1>
      <Spacer size={Spacing.m} />
      <form method={'post'} onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined-basic"
          label="Email"
          type="email"
          onChange={handleEmailChange}
          value={email}
          error={emailError}
          variant="filled"
        />
        <Spacer size={Spacing.m} />
        <TextField
          required
          id="outlined-basic"
          label="Password"
          type="password"
          onChange={handlePasswordChange}
          value={password}
          error={passwordError}
          variant="filled"
        />
        <Spacer size={Spacing.m} />
        <TextField
          required
          id="outlined-basic"
          label="Password"
          type="password"
          onChange={handleRepPasswordChange}
          value={repPassword}
          error={passwordError}
          variant="filled"
        />
        <Spacer size={Spacing.m} />
        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
      <Spacer size={Spacing.m} />
    </Container>
  );
};
