export function checkEmail(param: string): string {
  let value: string;
  if (!param) {
    value = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(param)) {
    value = "Email is invalid.";
  }

  return value;
}
export function checkPassword(param: string): string {
  let value: string;
  if (!param) {
    value = "Password is required.";
  } else if (param.length < 6) {
    value = "Password must be at least 6 characters.";
  }

  return value;
}
