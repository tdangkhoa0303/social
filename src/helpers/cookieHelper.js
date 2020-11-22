export const getCookie = (key) => {
  const cookieString = document.cookie;

  if (!cookieString) return;

  const cookie = cookieString.split("; ").find((e) => e.startsWith(key));
  if (cookie) return cookie.split("=")[1];
  return;
};

export const setCookie = (key, value, ttl) => {
  let time = new Date();
  time.setDate(time.getTime() + ttl);
  const expires = time ? `expires=${time.toUTCString()}` : "";
  document.cookie = `${key}=${value};${expires};path="/"`;
};
