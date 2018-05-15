$(document).ready(function(){

    console.log("javascript connected from DL");



    $('tr').click(function(e){
        //e.preventDefault();
        
        if(this.id != "not_a_song"){
            console.log(this.id);
            let query = '/displaylyrics/' + this.id;
            $.get('/displaylyrics/', this.id, function(displayObj){
                
                console.log(displayObj);

            });
        }
        

        


    });

});

