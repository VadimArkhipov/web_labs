let button = $('form button')
console.log(button);
button.click(function(){
    let inputs = $('form input, select');
    let emptyInputs = [];
    let incorrectInputs = 0;
    for(let input of inputs){
        if(input.value === ''){
            incorrectInputs++;
            emptyInputs.push(input);

            $(input).css('background-color', 'mistyrose');

            if($('form .fill-all-inputs').length === 0){
                $('.create-user-form-elem').last().prev().after($('<div class="fill-all-inputs"> Заполните все поля </div>'));
            }
            $(emptyInputs).focus(function (){
                $(this).css('background-color', 'mintcream');
                $('form .fill-all-inputs').remove();

            })
        }
    }
    if(incorrectInputs === 0){
        let newData = {};
        for(let input of inputs){
            newData[input.name] = input.value;
        }

        $.ajax({
            type: "POST",
            url: document.location.href,
            data: newData,
            complete: function (){
                $('.header').after($('<div class="successful-data-update"> <p> Данные успешно обновлены </p> </div>'));
                $('.create-user-form-container').css('margin-top', '20px');
                setTimeout(() => {
                    $('.successful-data-update').remove();
                    $('.create-user-form-container').css('margin-top', '100px');
                }, 3000);
            }
        });

    }
})