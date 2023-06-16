function addNewUser(){
    let inputs = $('form .create-user-form-input').not('button');
    let countIncorrectInput = 0;

    for (let elem of inputs){
        if(elem.value === ''){
            countIncorrectInput++;
          $(elem).css('background-color', 'mistyrose');

          if($.find('.fill-all-inputs').length === 0){
              let al = $('<div class="fill-all-inputs"> Заполните все поля </div>');
              $('.create-user-form-elem').last().prev().after(al);
          }

          $(elem).focus(function (){
              $(this).css('background-color', 'mintcream');
              $('.fill-all-inputs').remove();
          })
        }
    }

    if(countIncorrectInput === 0){
        let data = {};
        for(let elem of inputs){
            data[elem.name] = elem.value;
        }
        $.ajax({
            url: 'users',
            type: 'post',
            data: data,
            complete: function() {
                window.location = '/users';
            }
            });
    }

}
