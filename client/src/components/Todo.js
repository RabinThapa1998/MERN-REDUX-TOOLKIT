import {
  Typography,
  Paper,
  Stack,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { createTodo, fetchTodo, removeTodo } from "../app/reducers/todoReducer";
import { logOut } from "../app/reducers/authReducer";

function Todo() {
  const dispatch = useDispatch();

  const [mytodo, setTodo] = useState("");
  const addTodo = (e) => {
    e.preventDefault();
    dispatch(createTodo({ todo: mytodo }));
  };
  useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  const data = useSelector((state) => state.todos);
  console.log("data", data);

  return (
    <>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Typography variant="h3">TODO</Typography>
        <Paper
          sx={{ width: "500px", display: "flex", flexDirection: "column" }}
        >
          <TextField
            value={mytodo}
            onChange={(e) => setTodo(e.target.value)}
            label="add todo"
            rows={4}
            multiline
          />
        </Paper>
        <Button
          onClick={(e) => addTodo(e)}
          sx={{ my: "20px" }}
          variant={"contained"}
        >
          ADD
        </Button>
        <Paper sx={{ width: "500px", my: "20px" }}>
          <Stack>
            {data.map((eachdata) => {
              return (
                <Typography
                  key={eachdata._id}
                  onClick={() => dispatch(removeTodo(eachdata._id))}
                  sx={{
                    textAlign: "center",
                    "&:hover": {
                      background: "#f00",
                      textDecoration: "line-through",
                    },
                  }}
                >
                  {eachdata.todo}
                </Typography>
              );
            })}
          </Stack>
        </Paper>
        <Button
          variant={"contained"}
          sx={{ mt: "100px" }}
          onClick={() => dispatch(logOut())}
        >
          Logout
        </Button>
      </Box>
    </>
  );
}

export default Todo;
