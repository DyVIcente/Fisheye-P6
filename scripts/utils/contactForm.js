function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const closeButton = document.querySelector('#contact_modal .close');
closeButton.addEventListener("click", function() {
    closeModal();
});
closeButton.addEventListener("keydown", handleKeyDown);