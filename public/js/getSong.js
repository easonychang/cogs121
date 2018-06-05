$(document).ready(function(){

    console.log("javascript connected");



    $('#getSong').click(function(e){
        e.preventDefault();

        $('.card').show();

        $.get('/getSong', function(songs){
            //$('.song').hide();

            console.log(songs);

            //console.log(e.song);
            //$('.song').html( "<div class= 'song'> <img src='" +  e.albumimg +"' class = 'albumphoto'><p style='padding-left: 100px'> "+ e.song + "-" + e.artist + "</p></div>");

            for([index, e] of songs.entries()) {
                $('#song'+index).html( " <img class='card-img-top' src=' "+ e.imageurl + "' alt='Card image cap'> <div class='card-body'> <h6 class='card-text'>" + e.name + "-" + e.artist + " </h6><p class='card-text'>"+ e.duration  + "</p> </div></div>");
            }
            
            

        });


    });

});