import { passwordStrength } from "check-password-strength";

export const checkPasswordComplexity = (password: string): boolean => {
  if (
    passwordStrength(password).value.includes("Weak") ||
    passwordStrength(password).value.includes("Too weak")
  ) {
    return false;
  }

  return true;
};
