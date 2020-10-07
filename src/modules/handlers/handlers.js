import { getFromLocalStorage, setToLocalStorage } from '../../utils/utils';
import { createStaticCardLayout } from '../layouts/layouts';
import { CARDS } from '../../constants/constants';

function changeCardType() {
  const visa = document.getElementById('visa');
  const master = document.getElementById('master');
  const card = document.getElementById('card-edit');
  const logo = document.getElementById('logo-edit');
  if (visa.checked) {
    card.style.backgroundImage = 'url(../img/background-visa.jpg)';
    logo.src = 'img/visa.png';
    logo.style.backgroundColor = 'transparent';
  }
  if (master.checked) {
    card.style.backgroundImage = 'url(../img/background-master-card.jpg)';
    logo.src = 'img/master-card.png';
  }
}

function showModal() {
  document.querySelector('.modal').style.display = 'block';
  document.getElementById('visa').onclick = changeCardType;
  document.getElementById('master').onclick = changeCardType;
  document.getElementById('cardNumber').oninput = inputCardNumberHandler;
  document.querySelectorAll('.close-modal').forEach((item) => item.onclick = () => closeModal('modal-add'));
  document.querySelector('.save-card').onclick = saveCard;
}

function showModalConfirm(event) {
  const deleteNumber = event.target.dataset.number;
  document.querySelector('.modal-confirm').style.display = 'block';
  document.querySelectorAll('.close-modal').forEach((item) => item.onclick = () => closeModal('modal-confirm'));
  document.querySelector('.delete-card').onclick = () => { deleteCard(deleteNumber) };
}

function closeModal(elemClass) {
  document.querySelector(`.${elemClass}`).style.display = 'none';
  document.getElementById("cardNumber").value = '';
  document.getElementById("displayNumber-edit").innerHTML = '';
  document.querySelector('.card-rules') ? document.querySelector('.card-rules').outerHTML = '' : null;
  document.getElementById("card-comment").value = '';
}

function saveCard() {
  const cards = getFromLocalStorage(CARDS, []);
  const number = document.getElementById("cardNumber").value;
  document.querySelector('.card-rules') ? document.querySelector('.card-rules').outerHTML = '' : null;
  const repeatCards = cards.some((card) => card.number == number);
  const cardIsValid = checkCardNumber();
  if (!cardIsValid || repeatCards) {
    invalidNumberHandler(repeatCards);
    return;
  }
  const type = document.getElementById('visa').checked ? 'visa' : 'master-card';
  const comment = document.getElementById("card-comment").value;
  const newCard = createStaticCardLayout(number, type, comment);
  document.querySelector('.cards-list').insertAdjacentHTML('beforeend', newCard);
  setToLocalStorage(CARDS, [...cards, { number, type, comment }]);
  closeModal('modal-add');
  document.querySelectorAll('.delete').forEach((button) => button.onclick = showModalConfirm);
  document.querySelectorAll('.btn-collapse').forEach((button) => button.onclick = showComment);
}

function deleteCard(deleteNumber) {
  const cards = getFromLocalStorage(CARDS, []);
  const deleteIdx = cards.findIndex(item => item.number == deleteNumber);
  cards.splice(deleteIdx, 1);
  setToLocalStorage(CARDS, cards);
  document.querySelectorAll('.list-group-item').forEach((item) => {
    if (item.dataset.number == deleteNumber) {
      item.remove();
    }
  });
  closeModal('modal-confirm');
}

function inputCardNumberHandler() {
  document.querySelector('.card-rules') ? document.querySelector('.card-rules').outerHTML = '' : null;
  let number = document.getElementById("cardNumber").value;
  number = number.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  document.getElementById("cardNumber").value = number;
  document.getElementById("displayNumber-edit").innerHTML = number.slice(0, 4) + " " + number.slice(4, 8) + " " + number.slice(8, 12) + " " + number.slice(12, 16);
};

function checkCardNumber() {
  const visa = document.getElementById('visa');
  const master = document.getElementById('master');
  const numberInput = document.getElementById("cardNumber").value;
  const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const masterCardRegEx = /^(?:5[1-5][0-9]{14})$/;
  if (visa.checked) {
    if (!visaRegEx.test(numberInput)) {
      return false;
    }
  }
  if (master.checked) {
    if (!masterCardRegEx.test(numberInput)) {
      return false;
    }
  }
  return true;
}

function invalidNumberHandler(repeatCards) {
  const rulesVisa = `<div class="alert alert-danger card-rules" role="alert">
  The credit card "Visa" must be of the form 4XXX-XXXX-XXXX-XXXX.
</div>`;
  const rulesMasterCard = `<div class="alert alert-danger card-rules" role="alert">
  The credit card "Master-card" must be of the form 5[1-5]XX-XXXX-XXXX-XXXX.
</div>`;
  const repeatCard = `<div class="alert alert-danger card-rules" role="alert">
A card with the same name already exists.
</div>`;
  const visa = document.getElementById('visa');
  const master = document.getElementById('master');
  document.getElementById("cardNumber").value = '';
  document.getElementById("cardNumber").placeholder = 'Invalid number';
  document.getElementById("displayNumber-edit").innerHTML = '';
  if (repeatCards) {
    document.querySelector('.card-number-container').insertAdjacentHTML('afterend', repeatCard);
    return;
  }
  if (visa.checked) {
      document.querySelector('.card-number-container').insertAdjacentHTML('afterend', rulesVisa);
    }
  if (master.checked) {
    document.querySelector('.card-number-container').insertAdjacentHTML('afterend', rulesMasterCard);
  }
}

function showComment(event) {
  const cardNumber = event.target.dataset.number;
  document.querySelectorAll('.collapse').forEach((item) => {
    if (item.dataset.number == cardNumber) {
      if (item.classList.contains('show')) {
        item.classList.remove('show');
        return;
      }
      item.classList.add('show');
    }
  })
}

export { changeCardType, showComment, invalidNumberHandler, checkCardNumber, inputCardNumberHandler, deleteCard, saveCard, closeModal, showModalConfirm, showModal };
