import generateUUID from "./generateUUID";

export default username => {
  const userId = generateUUID();
  const userInfo = { id: userId, username };
  localStorage.setItem("user", JSON.stringify(userInfo));

  return userInfo;
};
