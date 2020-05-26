import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string | undefined;
}

export default function getValidationErrors(error: ValidationError): Errors {
  const errors = error.inner.reduce(
    (previousError, currentError) => ({
      ...previousError,
      [currentError.path]: currentError.message,
    }),
    {},
  );

  return errors;
}
