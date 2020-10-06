import { createModal, createModalToConfirm, createAddCardLayout, createStaticCardLayout, createNewCardLayout } from '../layouts/layouts';
import { changeCardType, showComment, invalidNumberHandler, checkCardNumber, inputCardNumberHandler, deleteCard, saveCard, closeModal, showModalConfirm, showModal } from '../handlers/handlers';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/utils';
import { CARDS } from '../../constants/constants';

const createContent = () => {
  const cards = getFromLocalStorage(CARDS, []);
  const modalContainer = createModal(createNewCardLayout());
  const modalToConfirm = createModalToConfirm();
  const cardsList = `<ul class="cards-list list-group list-group-flush list-strings">${createAddCardLayout()}</ul>`;
  document.querySelector('.main').insertAdjacentHTML('afterbegin', cardsList);
  document.querySelector('.main').insertAdjacentHTML('beforeend', modalContainer);
  document.querySelector('.main').insertAdjacentHTML('beforeend', modalToConfirm);
  cards.map(({ number, type, comment }) => document.querySelector('.cards-list').insertAdjacentHTML('beforeend', createStaticCardLayout(number, type, comment)));
  document.getElementById('card-add').onclick = showModal;
  document.querySelectorAll('.delete').forEach((button) => button.onclick = showModalConfirm);
  document.querySelectorAll('.btn-collapse').forEach((button) => button.onclick = showComment);
}

export { createContent };
