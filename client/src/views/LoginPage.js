import React, { useContext } from 'react';
import styled from 'styled-components';

import { UserDataContext } from "../hoc/Authentication";
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const Main = styled.main`
  display: flex;
  padding: 1em;
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
