$(document).ready(function(){

    console.log("javascript connected");



    $('.btn').click(function(e){
        e.preventDefault();

        $.get('/getSong', function(e){
            //$('.song').hide();
            console.log(e);

            console.log(e.song);
            //$('.song').html( "<div class= 'song'> <img src='" +  e.albumimg +"' class = 'albumphoto'><p style='padding-left: 100px'> "+ e.song + "-" + e.artist + "</p></div>");

            $('.song').html( " <img class='card-img-top' src=' "+ e.albumimg + "' alt='Card image cap'> <div class='card-body'> <h6 class='card-text'>" + e.song + "-" + e.artist + " </h6><p class='card-text'>Song Length</p> </div></div>");


        });


    });

});