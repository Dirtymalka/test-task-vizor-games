import { getFromLocalStorage, setToLocalStorage, checkCardValidation, transformDataCards } from '../../utils/utils';
import { createStaticCardLayout } from '../layouts/layouts';
import { CARDS, VISA_REG_EXP, MASTER_CARD_REG_EXP } from '../../constants/constants';

function showModal() {
  document.querySelector('.modal').style.display = 'block';
  document.getElementById(`cardNumber1`).focus();
  document.querySelectorAll('.cardNumber').forEach((input) => {
    input.value = '';
    input.oninput = () => inputCardNumberHandler(input.dataset.idx);
  });
  document.querySelectorAll('.card-number-edit').forEach((item) => {
    item.innerHTML = '';
  });
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
  document.querySelectorAll('.cardNumber').forEach((input) => {
    input.value = '';
  });
  document.querySelectorAll('.card-number-edit').forEach((item) => {
    item.innerHTML = '';
  });
  document.querySelector('.card-rules') ? document.querySelector('.card-rules').outerHTML = '' : null;
  document.getElementById("card-comment").value = '';
}

function saveCard() {
  const cards = getFromLocalStorage(CARDS, []);
  const numberParts = document.querySelectorAll('.cardNumber');
  const number = Array.from(numberParts).reduce((acc, item) => {
    return `${acc}${item.value}`;
  }, ``);
  document.querySelector('.card-rules') ? document.querySelector('.card-rules').outerHTML = '' : null;
  const repeatCards = cards.some((card) => card.number == number);
  const cardIsValid = checkCardNumber();
  if (!cardIsValid || repeatCards) {
    invalidNumberHandler(repeatCards);
    return;
  }
  const visaCheck = VISA_REG_EXP.test(number);
  const type = visaCheck ? 'visa' : 'master-card';
  const comment = document.getElementById("card-comment").value;
  const [newComment, classType, disabled] = transformDataCards(type, comment);
  const newCard = createStaticCardLayout(number, type, newComment, classType, disabled);
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

function inputCardNumberHandler(idx) {
  document.querySelector('.card-rules') ? document.querySelector('.card-rules').outerHTML = '' : null;
  let number = document.getElementById(`cardNumber${idx}`).value;
  number = number.replace(/[^0-9 .]/g, '').replace(/(\..*)\./g, '$1');
  document.getElementById(`cardNumber${idx}`).value = number;
  document.getElementById(`displayNumber-edit${idx}`).innerHTML = number
  if (number.length === 0) {
    if (idx - 1 < 1) return;
    document.getElementById(`cardNumber${idx - 1}`).focus();
  }
  if (number.length === 4) {
    if ((+idx + 1) > 4) return;
    document.getElementById(`cardNumber${+idx + 1}`).focus();
  }
};

function checkCardNumber() {
  const numberParts = document.querySelectorAll('.cardNumber');
  const numberInput = Array.from(numberParts).reduce((acc, item) => {
    return `${acc}${item.value}`;
  }, ``);
    if (!VISA_REG_EXP.test(numberInput) && !MASTER_CARD_REG_EXP.test(numberInput)) {
      return false;
    }
  if (!checkCardValidation(numberInput)) return false;
  return true;
}

function invalidNumberHandler(repeatCards) {
  const rulesCards = `
  <div class="alert alert-danger card-rules" role="alert">
  Invalid card number.
</div>
  `;
  const repeatCard = `<div class="alert alert-danger card-rules" role="alert">
A card with the same name already exists.
</div>`;
document.querySelectorAll('.cardNumber').forEach((input) => {
  input.value = '';
  input.placeholder = 'XXXX';
});
document.querySelectorAll('.card-number-edit').forEach((item) => {
  item.innerHTML = '';
});

  if (repeatCards) {
    document.querySelector('.card-number-container').insertAdjacentHTML('afterend', repeatCard);
    return;
  }
      document.querySelector('.card-number-container').insertAdjacentHTML('afterend', rulesCards);
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

export {  showComment, showModalConfirm, showModal };
