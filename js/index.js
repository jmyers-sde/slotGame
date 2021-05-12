let $name = $('#names');
let $email = $('#emails');
$('#confirmation').hide();

$(document).ready(function(){
//Modal button for the sign up 
    $('#modalSign').on('click', function(){
        $('#regModal').modal({backdrop: 'static'});
    })

//Modal button for the about information
    $('#modalAbout').on('click', function(){
        $('#aboutModal').modal({backdrop: 'static'});
    })

//Submit button on the form inside the modal that also resets the sign up modal and brings up the Confirmation div the ensure the proper information has been typed in
    $('.sub').on('click', function(){
        if($name.val() && $email.val()){
            $('#conName').append($name.val());
            $('#conEmail').append($email.val());
            $('#rules').hide();
            $('#confirmation').show();  
            $('.sub').attr('data-dismiss', 'modal');  
        }
    })
    
//Close button that closes the Confirmation div and resets the input fields and sets the page back to its original place     
    $('#conClose').on('click', function(){
        $name.val('');
        $email.val('');
        $('#conName').text('');
        $('#conEmail').text('');
        $('#rules').show();
        $('#confirmation').hide();
        $('.sub').removeAttr('data-dismiss');
    })
})