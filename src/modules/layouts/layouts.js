
  const createStaticCardLayout = (number, type, comment, classType, disabled) => {
    const formatNumber = `${number.slice(0, 4)}  ${number.slice(4, 8)}  ${number.slice(8, 12)}  ${number.slice(12, 16)}`;
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
          ${comment}
        </button>
      </h5>
    </div>
    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample" data-number="${number}">
      <div class="card-body">
        ${comment}
      </div>
    </div>
  </div>
  </div>
  </li>`;
    return cardLayout;
  }

export { createStaticCardLayout };
