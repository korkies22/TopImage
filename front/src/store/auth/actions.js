export const setToken = token => ({
  type: "SET_TOKEN",
  payload: token,
});

export const setEmail = user => ({
  type: "SET_USER",
  payload: user,
});

export const setAuth = data => ({
  type: "SET_AUTH",
  payload: data,
});

export const logout = () => ({
  type: "LOGOUT",
});
