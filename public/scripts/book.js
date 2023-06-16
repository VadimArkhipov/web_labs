function goBack() {
    let url = `/books?filter=all`;
    window.location.href = url;
}

const modal = document.querySelector(".modalAssign");
const openModalButton = document.querySelector(".openModal");
openModalButton.addEventListener('click', () => {
    modal.showModal();
});



const closeModalButton = document.querySelector(".closeModal");
closeModalButton.addEventListener('click', () => {modal.close();
});
