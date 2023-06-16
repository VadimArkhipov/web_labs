function deleteUser(id){
    let conf = confirm('Вы действительно хотите удалить выбранного пользователя?');
    if(conf){
        $.ajax({
            url: `/users/${id}`,
            type: 'delete',
            complete: function() {
                window.location.href = '/users';
            }
        });

    }
}

