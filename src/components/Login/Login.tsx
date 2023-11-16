import React, { useState } from 'react';
import { Container, ContainerSize } from '../Container/Container';
import Button from '@mui/material/Button';
import { Spacer, Spacing } from '../Spacer/Spacer';
import {Link, useNavigate} from 'react-router-dom';
import { TextField } from '@mui/material';
import {getCurrentWeekMealPlanURL} from "../../utils/dateUtils";

export const Login: React.FC<{}> = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // TODO error handling being managed by material ui. No error on submit or when invalid value
    if (email === '' || !email.includes('@')) {
      setEmailError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }

    if (emailError || passwordError) {
      return;
    }
    if (email && password) {
      // TODO Login

      navigate(getCurrentWeekMealPlanURL());
      console.log(email, password);
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
  return (
    <Container size={ContainerSize.Small}>
      <Spacer size={Spacing.m} />
      <h1>Login</h1>
      <Spacer size={Spacing.xs} />
      <p>
        Don't have an account yet? <Link to={`/register`}>Register</Link>
      </p>
      <form method={'post'} onSubmit={handleSubmit}>
        <Spacer size={Spacing.m} />
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
        <Button type="submit" variant="contained">
          Continue
        </Button>
      </form>
      <Spacer size={Spacing.m} />
    </Container>
  );
};
