import React from 'react';
import {
  Card, CardContent, TextField, Button, CardHeader,
} from '@material-ui/core';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import { validateSignIn } from '../utils/formValidations';

import { UserDataContext } from '../hoc/Authentication';
import {PersonAdd} from "@material-ui/icons";

const FormWrap = styled(Card)`
  flex: 1;
  margin-right: 1em;
  &:focus-within {
    box-shadow: 3px 3px 10px #000;
  }
`;

const PrimaryButton = styled(Button)`
  && {
    max-width: 200px;
    width: 200px;
    
    margin-top: 16px;
  }
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled(CardHeader)`
  display: flex;
  justify-content: center;
  align-items: center;
  
  & > div {
    flex: none;
    
    svg {
    font-size: 2em;
    }
  }
`;

const SignInForm = () => {
  const { handleLogin } = React.useContext(UserDataContext);
  const onSubmit = (values) => {
    handleLogin({ ...values });
  };
  return (
    <FormWrap>
      <Header title="Zaloguj" avatar={<PersonAdd />} />
      <CardContent>
        <Form
          onSubmit={onSubmit}
          validate={validateSignIn}
          render={({ handleSubmit, invalid }) => (
            <FormStyled onSubmit={handleSubmit}>
              <Field name="email">
                {
                  ({ input, meta }) => (
                    <TextField
                      {...input}
                      error={meta.error && meta.touched && input.value.length > 0}
                      name="email"
                      label="email"
                      type="email"
                      helperText={meta.touched && input.value.length > 0 && meta.error}
                      margin="normal"
                      variant="outlined"
                    />
                  )
                }
              </Field>
              <Field name="password">
                {
                  ({ input, meta }) => (
                    <TextField
                      {...input}
                      error={meta.error && meta.touched}
                      name="password"
                      label="password"
                      helperText={meta.touched && meta.error}
                      margin="normal"
                      variant="outlined"
                      type="password"
                    />
                  )
                }
              </Field>
              <PrimaryButton type="submit" disabled={invalid} variant="contained" color="primary" size="small">
                Zaloguj
              </PrimaryButton>
            </FormStyled>
          )}
        />
      </CardContent>
    </FormWrap>
  );
};

export default SignInForm;
