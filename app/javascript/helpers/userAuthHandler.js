export default () => {
  const prevUser = localStorage.getItem("user");
  if (prevUser) return JSON.parse(prevUser);
  return null;
  // if (prevUser) return prevUser;
};
