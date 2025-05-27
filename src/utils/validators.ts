export const validateLogin = (email: string, password: string) => {
  const errors = {} as any;
  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Invalid email address";
  }

  const passwordLength = 6;
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < passwordLength) {
    errors.password = `Password must be at least ${passwordLength} characters`;
  }
  return errors;
};

export const validateRegister = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const errors = {} as any;
  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Invalid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
