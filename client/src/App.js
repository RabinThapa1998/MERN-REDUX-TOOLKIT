import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Todo from "./components/Todo";
import Auth from "./components/Auth";
import { addToken } from "./app/reducers/authReducer";

function App() {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const stableSetter = useCallback(() => {
    dispatch(addToken());
  }, []);

  useEffect(() => {
    stableSetter();
  }, [stableSetter]);
  return (
    <div className="App">
      <h3>APP JS</h3>
      {token ? <Todo /> : <Auth />}
    </div>
  );
}

export default App;
