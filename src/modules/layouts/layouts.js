const modal = (child, okHandler) => {
  const modalLayout = `
  <div class="modal" tabindex="1" role="dialog">
            <div class="modal-dialog modal-dialog-centered">
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

export { modal };
