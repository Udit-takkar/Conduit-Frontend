export const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  return token;
};
