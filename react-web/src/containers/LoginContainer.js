import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userLogin,
  initialState,
  initializeForm,
  changeField
} from "../store/modules/auth";
import { useHistory } from "react-router-dom";
import Login from "../components/auth/Login";
import Footer from "../components/Footer";
import styled from "styled-components";
// import { check } from "../store/modules/user";

const Container = styled.div`
  width: 100%;

  height: 100vh;
`;

function LoginContainer() {
  const dispatch = useDispatch();
  let history = useHistory();

  //handle form state

  const login = useSelector(state => state.auth.login || initialState);

  const onChange = e => {
    const { name, value } = e.target;
    dispatch(changeField({ form: "login", key: name, value: value }));

    // setForm({
    //   ...form,
    //   [name]: value,
    // });
  };

  const { authError, token } = useSelector(state => state.auth || initialState);

  useEffect(() => {
    // async function setToken() {
    //   localStorage.setItem("accessToken", auth);
    // }
    if (token) {
      window.location.reload();
      //   history.push("/home");
      //   //   try {
      //     .then()
      //     .then();
      //   //   } catch (e) {
      //   //     console.log(e);
      //   //   }
    }
  }, [dispatch, history, token]);

  const loading = useSelector(state => state.loading["auth/LOGIN"]);

  const [data, setData] = useState("");
  useEffect(() => {
    if (loading) {
      setData("loading...");
    } else {
      setData(authError);
    }
  }, [authError, loading]);

  const loginSubmit = useCallback(
    async e => {
      e.preventDefault();
      await dispatch(userLogin(login));
    },
    [dispatch, login]
  );

  const onRegister = e => {
    e.preventDefault();
    dispatch(initializeForm("login"));
    history.push("/register");
  };

  return (
    <Container>
      <Login
        form={login}
        onChange={onChange}
        onRegister={onRegister}
        loginSubmit={loginSubmit}
        error={data}
      ></Login>
      <Footer background="#f2f3f8"></Footer>
    </Container>
  );
}

export default LoginContainer;
