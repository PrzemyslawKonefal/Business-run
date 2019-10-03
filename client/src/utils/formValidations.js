import { EMAIL_REGEX} from "./regexes";

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

  return errors
};
