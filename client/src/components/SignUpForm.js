import React, { useContext } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  FormControl,
  CardHeader,
} from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";
import styled from 'styled-components';
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from "final-form";
import { validateSignUp } from "../utils/formValidations";
import UserAvatar from "./UserAvatar";
import { createUser } from "../queries/queries";
import { graphql } from 'react-apollo';
import {UserDataContext} from "../hoc/Authentication";

const FormWrap = styled(Card)`
  flex: 2;
  &:focus-within {
    box-shadow: 3px 3px 10px #000;
  }
`;
const InnerForm = styled.form`
  display: flex;
  flex-direction: column;
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
`
const InlineInputsGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateSelector = styled(DatePicker)`
  && {
    margin: 16px 0 8px 0;
  }
`;

const AvatarSelector = styled.div`
  display: flex;
  justify-content: space-between;
`;
const avatarsArray = [1, 2, 3, 4];

const SignUpForm = (props) => {
  const { handleLogin } = useContext(UserDataContext);

  const onSubmit = (values) => {
    props.createUser({ variables: values })
      .then(({data}) => {
        if (data.createUser) {
          handleLogin({email: values.email, password: values.password})
        }
      })
  };

  return (
    <FormWrap>
      <Header title="Utwórz nowe konto" avatar={<PersonAdd/>}/>
      <CardContent>
        <Form
          onSubmit={onSubmit}
          validate={validateSignUp}
          initialValues={{birthDate: new Date(), gender: 'female', imgNumber: 1}}
          render={({handleSubmit, invalid, values, form, submitting, submitError }) => (
            <InnerForm onSubmit={handleSubmit}>
              {submitError}
              <Field name="email">
                {
                  ({input, meta}) => (
                    <TextField
                      {...input}
                      error={meta.error && meta.touched && input.value.length > 0}
                      name="email"
                      label="Email"
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
                  ({input, meta}) => (
                    <TextField
                      {...input}
                      error={meta.error && meta.touched}
                      name="password"
                      label="Password"
                      type="password"
                      helperText={meta.touched && meta.error}
                      margin="normal"
                      variant="outlined"
                    />
                  )
                }
              </Field>
              <InlineInputsGroup>
                <Field name="name">
                  {
                    ({input, meta}) => (
                      <TextField
                        {...input}
                        error={meta.error && meta.touched}
                        name="name"
                        label="Name"
                        type="text"
                        helperText={meta.touched && meta.error}
                        margin="normal"
                        variant="outlined"
                      />
                    )
                  }
                </Field>
                <Field name="birthDate">
                  {
                    ({input, meta}) => (
                      <DateSelector
                        {...input}
                        name="birthDate"
                        label="Birth Date"
                        format={"dd/MM/yyyy"}
                        inputVariant="outlined"
                        maxDate={new Date()}
                        minDate={new Date(1910, 1, 1)}
                        error={meta.error && meta.touched}
                      />
                    )
                  }
                </Field>
              </InlineInputsGroup>
              <InlineInputsGroup>
                <Field name="gender" type="radio">
                  {
                    ({input}) => (
                      <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup {...input} aria-label="gender" name="gender" >
                          <FormControlLabel value="female" control={<Radio color="primary"/>} label="Female"  />
                          <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male"  />
                        </RadioGroup>
                      </FormControl>
                    )
                  }
                </Field>
                <Field name="imgNumber">
                  {
                    ({input}) => (
                      <AvatarSelector>
                        {
                          avatarsArray.map(position => (
                            <UserAvatar
                              key={position}
                              type={`${values.gender}-${position}`}
                              active={input.value === position}
                              onClick={() => form.change('imgNumber', position)}
                            />
                          ))
                        }
                      </AvatarSelector>
                    )
                  }
                </Field>
              </InlineInputsGroup>
              <Button type="submit" disabled={submitting} variant="contained" color="primary" size="small" fullWidth={false}>
                Zarejestruj
              </Button>
            </InnerForm>
          )}
        />
      </CardContent>
    </FormWrap>
  );
};

export default graphql(createUser, { name: 'createUser'} )(SignUpForm);
