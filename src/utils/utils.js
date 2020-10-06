const getFromLocalStorage = (key, replacing) => {
  let result;
  if (localStorage.getItem(key)) {
    result = JSON.parse(localStorage.getItem(key) || `${replacing}`);
    return result;
  }
  return replacing;
};

const setToLocalStorage = (key, property) => {
  localStorage.setItem(key, JSON.stringify(property));
};

export { getFromLocalStorage, setToLocalStorage };
