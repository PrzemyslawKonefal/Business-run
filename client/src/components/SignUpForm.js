import React from 'react';
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
import { validateSignUp } from "../utils/formValidations";

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


const SignUpForm = () => {
  const onSubmit = (values) => {
    if (values.email && values.password) {
      console.log({...values})
    }
  };
  return (
    <FormWrap>
      <Header title="Utwórz nowe konto" avatar={<PersonAdd/>}/>
      <CardContent>
        <Form
          onSubmit={onSubmit}
          validate={validateSignUp}
          initialValues={{birthDate: new Date()}}
          render={({handleSubmit, invalid}) => (
            <InnerForm onSubmit={handleSubmit}>
              <Field name="email">
                {
                  ({input, meta}) => (
                    <TextField
                      {...input}
                      error={meta.error && meta.touched && input.value.length > 0}
                      name="email"
                      label="Email *"
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
                      label="Password *"
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
                <Field name="birthDate" type="radio">
                  {
                    ({input, meta}) => (
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup {...input} aria-label="gender" name="gender">
                          <FormControlLabel value="female" control={<Radio />} label="Female" color="primary" />
                          <FormControlLabel value="male" control={<Radio />} label="Male" color="primary" />
                        </RadioGroup>
                      </FormControl>
                    )
                  }
                </Field>
              </InlineInputsGroup>
              <Button type="submit" disabled={invalid}>
                Zarejestruj
              </Button>
            </InnerForm>
          )}
        />
      </CardContent>
    </FormWrap>
  );
};

export default SignUpForm;
