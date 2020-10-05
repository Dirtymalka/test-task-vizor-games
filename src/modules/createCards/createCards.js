import { modal } from '../layouts/layouts';
import { changeCardType } from '../handlers/handlers';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/utils';
import { CARDS } from '../../constants/constants';

const cardsData = [
  {
    number: 1234123412341234,
    type: 'visa'
  },
  {
    number: 1234123412341234,
    type: 'master-card'
  }
]

const addCardLayout = () => {
  const cardLayout = `<li class="list-group-item">
  <div class=" card card-add" id="card-add">
      <div class="card-position card-position-add">
        <img class="add" id="add" src="img/add.png" alt="">
      </div>
  </div>
</div>
</li>`;
  return cardLayout;
}

const cardLayout = (number, type, comment) => {
  const classType = type === 'visa' ? 'visa-card' : 'master-card';
  const formatNumber = `${number.slice(0, 4)}  ${number.slice(4, 8)}  ${number.slice(8, 12)}  ${number.slice(12, 16)}`;
  const cardLayout = `<li class="list-group-item">
  <div class="card ${classType}" id="card">
      <div class="card-position">
          <div class="card-position">
              <p class="card-number" id="displayNumber">${formatNumber}</p>
          </div>
          <img class="sim" id="sim" src="https://i.hizliresim.com/MdZ3Cf.png" alt="">
          <div class="card-position">
              <img class="logo" id="logo" src="img/${type}.png" alt="">
          </div>
      </div>
  </div>
</div>
</li>`;
  return cardLayout;
}

const createNewCardLayout = () => {
  const cardLayout = `<div class="personal-container">
  <div class="pick-card">
      <input type="radio" id="visa" name="card" value="visa" checked>
      <label for="visa">Visa</label>
      <input type="radio" id="master" name="card" value="master">
      <label for="huey">Master</label>
  </div>
  <div class="card-number-container">
      <input class="form-control" type="text" maxlength="16" id="cardNumber" placeholder="Credit Card Number"/>
  </div>
  <div class="card visa-card" id="card-edit">
      <div class="card-position">
          <div class="card-position">
              <p class="card-number card-number-edit" id="displayNumber-edit"></p>
          </div>
          <img class="sim" id="sim" src="https://i.hizliresim.com/MdZ3Cf.png" alt="">
          <div class="card-position">
              <img class="logo" id="logo-edit" src="https://i.hizliresim.com/Lx4G72.png" alt="">
          </div>
      </div>
  </div>
</div>`;
  return cardLayout;
}



const createCards = () => {
  const cards = getFromLocalStorage(CARDS, []);
  const modalContainer = modal(createNewCardLayout());
  const cardsList = `<ul class="cards-list list-group list-group-flush list-strings">${addCardLayout()}</ul>`;
  document.querySelector('.app-container').insertAdjacentHTML('afterbegin', cardsList);
  document.querySelector('.app-container').insertAdjacentHTML('beforeend', modalContainer);
  cards.map(({ number, type }) => document.querySelector('.cards-list').insertAdjacentHTML('beforeend', cardLayout(number, type)));
  document.getElementById('card-add').onclick = showModal;
}

function showModal() {
  document.querySelector('.modal').style.display = 'block';
  document.getElementById('visa').onclick = changeCardType;
  document.getElementById('master').onclick = changeCardType;
  document.getElementById('cardNumber').oninput = cardNumber;
  document.querySelectorAll('.close-modal').forEach((item) => item.onclick = closeModal);
  document.querySelector('.save-card').onclick = saveCard;
}

function closeModal() {
  document.querySelector('.modal').style.display = 'none';
}

function saveCard() {
  const cards = getFromLocalStorage(CARDS, []);
  const number = document.getElementById("cardNumber").value;
  const type = document.getElementById('visa').checked ? 'visa' : 'master-card';
  const newCard = cardLayout(number, type);
  document.querySelector('.cards-list').insertAdjacentHTML('beforeend', newCard);
  setToLocalStorage(CARDS, [...cards, { number, type }]);
  closeModal();
}

function cardNumber() {
  let number = document.getElementById("cardNumber").value;
  number = number.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  document.getElementById("cardNumber").value = number;

  document.getElementById("displayNumber-edit").innerHTML = number.slice(0, 4) + " " + number.slice(4, 8) + " " + number.slice(8, 12) + " " + number.slice(12, 16);
};

export { cardLayout, createCards };
