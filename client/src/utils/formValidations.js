import { EMAIL_REGEX, NAME_REGEX } from "./regexes";

export const validateSignIn = (values) => {
  const errors = {};
  if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Nieprawidłowy format email."
  }
  if (!values.password || values.password.length < 8) {
    errors.password = 'Hasło musi mieć przynajmniej 8 znaków.'
  }

  return errors
};

export const validateSignUp = (values) => {
  const errors = {};
  if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Nieprawidłowy format email."
  }
  if (!values.password || values.password.length < 8) {
    errors.password = 'Hasło musi mieć przynajmniej 8 znaków.'
  }

  if (!values.name ) {
    errors.name = 'Imię jest wymagane.'
  } else if (values.name.length < 2) {
    errors.name = 'Imię jest zbyt krótkie'
  }
  else if (!NAME_REGEX.test(values.name)) {
    errors.name = 'Imię może zawierać wyłącznie litery angielskiego alfabetu oraz spację.'
  }

  return errors
};
