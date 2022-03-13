import React from "react";
import { useState } from "react";
import {
  Typography,
  Stack,
  Box,
  Paper,
  TextField,
  Button,
} from "@mui/material";

import { signupUser, signinUser } from "../app/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState("signin");
  const dispatch = useDispatch();
  var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var objs;
  const { loading, error } = useSelector((state) => state.user);

  function handleSubmit(e) {
    e.preventDefault();
    if (auth == "signin") {
      dispatch(signinUser({ email, password }));
    } else {
      dispatch(signupUser({ email, password }));
    }
  }

  return (
    <div>
      {loading && <CircularProgress />}
      {error && <Typography variant="h4">{error}</Typography>}
      <Stack component={"form"} onSubmit={(e) => handleSubmit(e)}>
        <Typography variant={"h1"}>{auth}</Typography>
        <TextField
          name="email"
          value={email}
          label="email"
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <TextField
          name="password"
          value={password}
          label="password"
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <Box>
          {auth == "signin" ? (
            <Typography onClick={() => setAuth("signup")} component={"h6"}>
              Doesn't have an account
            </Typography>
          ) : (
            <Typography onClick={() => setAuth("signin")} component="h6">
              Already have an account
            </Typography>
          )}
        </Box>
        <Button type="submit">{auth}</Button>
      </Stack>
    </div>
  );
}

export default Auth;
