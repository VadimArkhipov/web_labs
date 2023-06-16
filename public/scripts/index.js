const formFilter = document.getElementById("sort-form");
let lastFilter = "all";

formFilter.addEventListener("change", (e) =>{
    let value = e.target.value;
    lastFilter = value;
    let url = `/books?filter=${value}`;
    window.location.href = url;

 })

function confirmDelete(id, title){
    console.log(id);
    if(confirm(`Вы действительно хотите удалить книгу '${title}'`)){
        console.log('В скором времени книга будет удалена');
        // Хз, что тут писать
        fetch(`/books/${id}`, {
            method: "DELETE"
        });
        window.location.href = '/books';
    } else {
        return false;
    }
}


