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

const checkCardValidation = (digits) => {
  let nCheck = 0, bEven = false;
  for (let n = cardNumber.length - 1; n >= 0; n--) {
    let cDigit = cardNumber.charAt(n),
      nDigit = parseInt(cDigit, 10);
    if (bEven && (nDigit *= 2) > 9) {
      nDigit -= 9;
    }
    nCheck += nDigit;
    bEven = !bEven;
  }

  return (nCheck % 10) == 0;
}

const transformDataCards = (type, comment) => {
  const classType = type === 'visa' ? 'visa-card' : 'master-card';
  const newComment = comment == undefined ? '' : comment;
  const disabled = newComment ? '' : 'disabled';
  return [newComment, classType, disabled];
}

export { getFromLocalStorage, setToLocalStorage, checkCardValidation, transformDataCards };
