/**
 * @author Niklas Nguyen
 * @description this service exports finnished function that can save,get and remove from sessionStorage with a ref
 */

function saveLocalValue(ref, value) {
  sessionStorage.setItem(ref, JSON.stringify(value));
}

function getLocalValue(ref) {
  const value = sessionStorage.getItem(ref);
  if (value == null) throw new Error(`${ref} not found in local storage`);
  return JSON.parse(value);
}

function removeLocalValue(ref) {
  sessionStorage.removeItem(ref);

  return "You have logged out";
}

/**
 * @author Isac Zetterström
 * @description Checks if token is in sessionStorage, if not returns false. Used to see if user is logged in.
 */
function isLoggedIn() {
  if (!sessionStorage.getItem("token")) return false;
  return true;
}

const cacheService = {
  saveLocalValue,
  getLocalValue,
  removeLocalValue,
  isLoggedIn,
};
export default cacheService;
