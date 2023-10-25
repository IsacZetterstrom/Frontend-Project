/**
 * @author Niklas Nguyen
 * @description this service exports finnished function that can save,get and remove from localStorage with a ref
 */

function saveLocalValue(ref, value) {
  localStorage.setItem(ref, JSON.stringify(value));
}

function getLocalValue(ref) {
  const value = localStorage.getItem(ref);
  if (value == null) throw new Error(`${ref} not found in local storage`);
  return JSON.parse(value);
}

function removeLocalValue(ref) {
  localStorage.removeItem(ref);

  return "You have logged out";
}

function isLoggedIn() {
  if (!localStorage.getItem("token")) return false;
}

const cacheService = {
  saveLocalValue,
  getLocalValue,
  removeLocalValue,
  isLoggedIn,
};
export default cacheService;
