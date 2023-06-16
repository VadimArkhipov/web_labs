function submitButtonPressed() {
    let user_input = document.querySelector('input');
    let user_name = user_input.value;

    let index = window.localStorage.length;
    window.localStorage.setItem(index.toString(), JSON.stringify({name: user_name, score: 0}));

}

function autoFillInput() {
    let index_last_elem = window.localStorage.length - 1;
    if(index_last_elem < 0){
        return;
    }
    let last_elem = window.localStorage.getItem(index_last_elem.toString());

    let user_input = document.querySelector('input');
    user_input.value = JSON.parse(last_elem).name;
}

autoFillInput();


