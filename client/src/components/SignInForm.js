import React from 'react';
import { Card, CardContent, TextField, Button } from "@material-ui/core";
import styled from 'styled-components';
import { Form, Field } from 'react-final-form'
import { validateSignIn } from "../utils/formValidations";

import {UserDataContext} from "../hoc/Authentication";

const FormWrap = styled(Card)`
  flex: 1;
  &:focus-within {
    box-shadow: 3px 3px 10px #000;
  }
`;

const SignInForm = () => {
  const { handleLogin } = React.useContext(UserDataContext);
  const onSubmit = (values) => {
    if (values.email && values.password) {
       handleLogin({...values})
    }
  };
  return (
    <FormWrap>
      <CardContent>
        <Form
          onSubmit={onSubmit}
          validate={validateSignIn}
          render={({ handleSubmit, invalid}) => (
            <form onSubmit={handleSubmit}>
              <Field name="email">
                {
                  ({input, meta}) => (
                    <TextField
                      {...input}
                      error={meta.error && meta.touched && input.value.length > 0}
                      name="email"
                      label="email"
                      type="email"
                      helperText={meta.touched && input.value.length && meta.error}
                      margin="normal"
                      variant="outlined"
                    />
                  )
                }
              </Field>
              <Field name="password">
                {
                  ({input, meta}) => (
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
              <Button type="submit" disabled={invalid}>
                Zaloguj
              </Button>
            </form>
        )}
        />
      </CardContent>
    </FormWrap>
  );
};

export default SignInForm;
