let table = document.querySelector('table');
let data = getAllData();

fillTableRecords(table, data);

function getAllData() {
    let data = [];

    for(let i = 0; i < window.localStorage.length; i++){
        let elem = JSON.parse(window.localStorage.getItem(i.toString()));
        data.push(elem);
    }

    return data;
}

function fillTableRecords(table, data) {
    let tbody = table.querySelector('tbody');

    for(let i = 0; i < data.length; i++){
        tbody.innerHTML += `<tr> 
                                <td>
                                    ${data[i].name}
                                </td>
                                 <td>
                                    ${data[i].score}
                                </td>
                            </tr>`;
    }
}