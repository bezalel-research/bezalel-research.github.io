(function () {
  const openButton = document.getElementById("start-exploring-btn");
  const modalBackdrop = document.getElementById("explore-modal");
  const closeButton = document.getElementById("close-explore-modal");
  const customizeLink = document.getElementById("customize-pack-link");
  let lastFocusedElement = null;

  if (!openButton || !modalBackdrop || !closeButton || !customizeLink) {
    return;
  }

  function openModal() {
    lastFocusedElement = document.activeElement;
    modalBackdrop.classList.add("is-open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeButton.focus();
  }

  function closeModal() {
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
  customizeLink.addEventListener("click", closeModal);

  modalBackdrop.addEventListener("click", function (event) {
    if (event.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modalBackdrop.classList.contains("is-open")) {
      closeModal();
    }
  });
})();
