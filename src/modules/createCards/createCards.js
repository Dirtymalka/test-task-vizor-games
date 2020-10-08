import { createStaticCardLayout } from '../layouts/layouts';
import { showComment, showModalConfirm, showModal } from '../handlers/handlers';
import { getFromLocalStorage, transformDataCards } from '../../utils/utils';
import { CARDS } from '../../constants/constants';

const createContent = () => {
  const cards = getFromLocalStorage(CARDS, []);
  cards.map(({ number, type, comment }) => {
    const [newComment, classType, disabled] = transformDataCards(type, comment);
    document.querySelector('.cards-list').insertAdjacentHTML('beforeend', createStaticCardLayout(number, type, newComment, classType, disabled));
  });
  document.getElementById('card-add').onclick = showModal;
  document.querySelectorAll('.delete').forEach((button) => button.onclick = showModalConfirm);
  document.querySelectorAll('.btn-collapse').forEach((button) => button.onclick = showComment);
}

export { createContent };
