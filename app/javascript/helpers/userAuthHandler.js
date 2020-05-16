import generateUUID from "./generateUUID";

export default () => {
  const prevUser = localStorage.getItem("user");
  if (prevUser) return prevUser;

  const userInfo = generateUUID();
  localStorage.setItem("user", userInfo);

  return userInfo;
};
