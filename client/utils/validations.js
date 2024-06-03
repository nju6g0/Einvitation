const validateEmail = (value) => {
  const emailRule = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const result = emailRule.test(value);
  return result;
};
const validatePassword = (value) => {
  return value.length >= 6;
};

export { validateEmail, validatePassword };
