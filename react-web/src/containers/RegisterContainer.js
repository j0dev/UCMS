import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  initializeForm,
  initialState,
  userRegister,
  changeRegisterField
} from "../store/modules/auth";
import Register from "../components/auth/Register";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";

function RegisterContainer() {
  let history = useHistory();
  const dispatch = useDispatch();

  const register = useSelector(state => state.auth.register || initialState);

  //handle form state

  const onChange = e => {
    const { name, value } = e.target;

    dispatch(
      changeRegisterField({ form: "register", key: name, value: value })
    );
  };

  const onLogin = e => {
    e.preventDefault();
    dispatch(initializeForm(""));
    history.push("/login");
  };

  const registerSubmit = useCallback(
    async e => {
      e.preventDefault();
      await dispatch(userRegister(register));
      await history.push("/login");
    },
    [dispatch, history, register]
  );

  const radioHandle = e => {
    const target = e.target.value;
    if (target === "student") {
      dispatch(
        changeRegisterField({ form: "register", key: "type", value: 2 })
      );
    } else {
      dispatch(
        changeRegisterField({ form: "register", key: "type", value: 1 })
      );
    }
  };

  const { authError, result } = useSelector(
    state => state.auth || initialState
  );

  const loading = useSelector(state => state.loading["auth/LOGIN"]);

  const [data, setData] = useState("");
  useEffect(() => {
    if (loading) {
      setData("loading...");
    } else if (authError) {
      setData(authError);
    } else {
      setData(result);
    }
  }, [authError, loading, result]);

  return (
    <>
      <Register
        form={register}
        onChange={onChange}
        onLogin={onLogin}
        registerSubmit={registerSubmit}
        radioHandle={radioHandle}
        result={data}
      ></Register>
      <Footer background="#f2f3f8"></Footer>
    </>
  );
}

export default RegisterContainer;
