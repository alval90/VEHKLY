import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container } from "../Container/Container";
import Button from "@mui/material/Button";
import { Spacer } from "../Spacer/Spacer";
import { Spacing } from "../Spacer/Spacing.ts";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { getCurrentWeekMealPlanURL } from "../../utils/dateUtils";
import { HttpStatusCode } from "../../api/HttpStatusCodes.ts";
import { login } from "../../api/UserApi.ts";
import { ContainerSize } from "../Container/ContainerSize.tsx";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      await login({ username: email, password: password })
        .then((res) => {
          if (res.status == HttpStatusCode.OK) {
            navigate(getCurrentWeekMealPlanURL());
          } else {
            throw Error("Invalid credentials");
          }
        })
        .catch((err) => {
          setEmailError(true);
          setPasswordError(true);
          setHelperText(err.message);
        });
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (emailError) {
      setHelperText("");
      setEmailError(false);
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (passwordError) {
      setHelperText("");
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
      <form method={"post"} onSubmit={handleSubmit}>
        <Spacer size={Spacing.m} />
        <TextField
          required
          id="outlined-basic"
          label="Email"
          type="email"
          onChange={handleEmailChange}
          value={email}
          error={emailError}
          helperText={helperText}
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
          helperText={helperText}
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
