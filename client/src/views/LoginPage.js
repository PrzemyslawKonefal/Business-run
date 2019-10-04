import React, { useContext } from 'react';
import styled from 'styled-components';

import { UserDataContext } from "../hoc/Authentication";
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const Main = styled.div`
  display: flex;
`;

const LoginPage = (props) => {
  const { content } = useContext(UserDataContext);
  if (content._id) {
    props.history.push('/')
  }
  return (
    <Main>
      <SignInForm />
      <SignUpForm />
    </Main>
  );
};

export default LoginPage;
