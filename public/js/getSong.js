$(document).ready(function(){

    console.log("javascript connected");



    $('.btn').click(function(e){
        e.preventDefault();

        $.get('/getSong', function(e){
            //$('.song').hide();
            console.log(e);

            console.log(e.song);
            $('.song').html( "<div class= 'song'> <img src='" +  e.albumimg +"' class = 'userphoto'><p style='padding-left: 100px'> "+ e.song + "-" + e.artist + "</p></div>");
        });


    });

});