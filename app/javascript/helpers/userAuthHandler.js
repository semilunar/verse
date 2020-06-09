import generateUUID from "./generateUUID";

export default () => {
  const prevUserId = localStorage.getItem("userid");
  if (prevUserId) return prevUserId;

  const userId = generateUUID();
  localStorage.setItem("userid", userId);

  return userId;
};
