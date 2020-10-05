function changeCardNumber() {
  let number = document.getElementById("cardNumber").value;
  // number = number.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

  document.getElementById("displayNumber").innerHTML = number.slice(0, 4) + " " + number.slice(4, 8) + " " + number.slice(8, 12) + " " + number.slice(12, 16);
};

function changeCardType() {
  var visa = document.getElementById('visa');
  var master = document.getElementById('master');
  var card = document.getElementById('card-edit');
  var logo = document.getElementById('logo-edit');
  const number = document.querySelector('.card-number-edit');
  if (visa.checked) {
    card.style.backgroundImage = 'url(../img/background-visa.png)';
    logo.src = 'img/visa.png';
    logo.style.backgroundColor = 'transparent';
    number.style.color = 'white';
  }
  if (master.checked) {
    card.style.backgroundImage = 'url(../img/background-master-card.jpg)';
    logo.src = 'img/master-card.png';
    number.style.color = '#000';
  }
}

export { changeCardType };
