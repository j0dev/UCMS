import React from "react";
import styled from "styled-components";
import { Grid, Row, Col } from "react-flexbox-grid";

const AuthBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: #f2f3f8;
  justify-content: center;
`;

const Title = styled.div`
  width: 100%;
  height: 3.75rem;

  text-align: center;
  margin-bottom: 2rem;
  h1 {
    font-size: 2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  outline: none;
  border: none;
  font-size: 1rem;
  border-bottom: 1px solid #343a40;
  border-radius: 0;
  -webkit-appearance: none;
  /* margin-bottom: 0.75rem; */
`;

const Button = styled.button`
  width: 100%;
  height: 3rem;
  border-radius: 5px;
  background: #343a40;
  cursor: pointer;
  border: none;
  color: #fff;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;

  &:hover {
    background: #495057;
  }
`;

const Result = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  text-align: center;
`;

const ButtonWrapper = styled.div``;

const Wrapper = styled.div`
  max-width: 420px;
  background: #fff;
  border-radius: 5px;
  padding: 1.5em;
`;

function Login({ form, onChange, onRegister, loginSubmit, error }) {
  return (
    <AuthBox>
      <Wrapper>
        <Title>
          <h1>UCMS</h1>
        </Title>
        <Grid>
          <form>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Input
                  name="userid"
                  onChange={onChange}
                  value={form.userid}
                  placeholder="학번/아이디 (ID)"
                ></Input>
                <Input
                  type="password"
                  name="password"
                  onChange={onChange}
                  value={form.password}
                  placeholder="비밀번호 (Password)"
                ></Input>
              </Col>
            </Row>
            <Result>{error}</Result>
            <ButtonWrapper>
              <Button type="button" onClick={loginSubmit}>
                로그인
              </Button>
              <Button type="button" onClick={onRegister}>
                계정 생성하기
              </Button>
            </ButtonWrapper>
          </form>
        </Grid>
      </Wrapper>
    </AuthBox>
  );
}

export default Login;
