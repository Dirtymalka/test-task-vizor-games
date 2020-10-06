const createAddCardLayout = () => {
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

  const createStaticCardLayout = (number, type, comment) => {
    const classType = type === 'visa' ? 'visa-card' : 'master-card';
    const formatNumber = `${number.slice(0, 4)}  ${number.slice(4, 8)}  ${number.slice(8, 12)}  ${number.slice(12, 16)}`;
    const newComment = comment == undefined ? '' : comment;
    const disabled = newComment ? '' : 'disabled';
    const cardLayout = `<li class="list-group-item" data-number="${number}">
    <div class="card ${classType}" id="card">
        <div class="card-position">
            <div class="card-position">
                <p class="card-number" id="displayNumber">${formatNumber}</p>
            </div>
            <img class="sim" id="sim" src="https://i.hizliresim.com/MdZ3Cf.png" alt="">
            <div class="card-position">
                <img class="logo" id="logo" src="img/${type}.png" alt="">
            </div>
            <img class="delete" id="delete" src="img/delete.png" alt="" data-toggle="tooltip" data-placement="top" title="Delete Card" data-number="${number}">
        </div>
    </div>
    <div class="cardd">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0 btn-collapse-container">
        <button class="btn btn-link btn-collapse" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" ${disabled} data-number="${number}">
          ${newComment}
        </button>
      </h5>
    </div>
    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample" data-number="${number}">
      <div class="card-body">
        ${newComment}
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
            <img class="sim" id="sim" src="img/sim.png" alt="">
            <div class="card-position">
                <img class="logo" id="logo-edit" src="img/visa.png" alt="">
            </div>
        </div>
    </div>
    <div class="card-comment-container">
        <textarea class="form-control " type="text" maxlength="1024" id="card-comment" placeholder="Comment"></textarea>
    </div>
  </div>`;
    return cardLayout;
  }

const createModal = (child, okHandler) => {
  const modalLayout = `
  <div class="modal modal-add" tabindex="1" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add card</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class="close-modal" aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${child}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary close-modal" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary save-card">Save card</button>
                    </div>
                </div>
            </div>
        </div>
`;
  return modalLayout;
}

const createModalToConfirm = () => {
    const modalLayout = `
  <div class="modal modal-confirm" tabindex="1" role="dialog">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class="close-modal" aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <span>Are you sure you want to delete this card?</span>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary close-modal" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary delete-card" >Ok</button>
                    </div>
                </div>
            </div>
        </div>
`;
  return modalLayout;
}

export { createModal, createModalToConfirm, createAddCardLayout, createStaticCardLayout, createNewCardLayout };
