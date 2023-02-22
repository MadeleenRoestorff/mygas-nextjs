/**
 * If the browser has localStorage, and the user is saving a new token, save the new token to local
 * storage and set the token as the current state. If setToken is truthy, return the token from localStorage.
 * If destroyToken is truthy, set the token in localStorage to an empty string and return an empty string
 * @param state - string - The current state of the token.
 * @param TokenDispatchInterface.saveNewToken - This is the token that we want to save to
 * localStorage.
 * @param TokenDispatchInterface.setStorageToken - boolean - if true get the token from local storage
 * and set it as current state of the token.
 * @param TokenDispatchInterface.destroyToken - boolean - remove token from local storage and
 * clear the token state.
 * @returns The tokenReducer is is returning the state.
 */

const tokenReducer = (
  state: string,
  {
    saveNewToken = "",
    setStorageToken = false,
    destroyToken = false
  }: TokenDispatchInterface
): string => {
  if (typeof localStorage !== "undefined") {
    if (saveNewToken) {
      localStorage.setItem("token", saveNewToken);
      return saveNewToken;
    }

    if (setStorageToken) {
      return localStorage.getItem("token");
    }

    if (destroyToken) {
      localStorage.setItem("token", "");
      return "";
    }
  }
  return state;
};

export default tokenReducer;
