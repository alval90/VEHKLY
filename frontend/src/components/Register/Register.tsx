import React, { useState } from "react";
import { Container, ContainerSize } from "../Container/Container";
import Button from "@mui/material/Button";
import { Spacer, Spacing } from "../Spacer/Spacer";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCurrentWeekMealPlanURL } from "../../utils/dateUtils";
import { HttpStatusCode, useAuth } from "../../contexts/AuthContext.tsx";

export const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const authContext = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (password !== repPassword) {
      setPasswordHelperText("Passwords do not match");
      setPasswordError(true);
      return;
    }
    if (email && password) {
      await authContext
        .register({ username: email, password: password })
        .then(async (res) => {
          if (res.status == HttpStatusCode.OK) {
            navigate(getCurrentWeekMealPlanURL());
          } else {
            throw Error("Username is already taken");
          }
        })
        .catch((err) => {
          setEmailError(true);
          setEmailHelperText(err.message);
        });
    }
  };

  const handleEmailChange = (e: any) => {
    e.preventDefault();
    if (emailError) {
      setEmailError(false);
      setEmailHelperText("");
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    e.preventDefault();
    if (passwordError) {
      setPasswordError(false);
      setPasswordHelperText("");
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
      <form method={"post"} onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined-basic"
          label="Email"
          type="email"
          onChange={handleEmailChange}
          value={email}
          error={emailError}
          helperText={emailHelperText}
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
          helperText={passwordHelperText}
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
          helperText={passwordHelperText}
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
