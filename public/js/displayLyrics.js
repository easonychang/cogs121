$(document).ready(function(){

    console.log("javascript connected from DL");



    $('tr').click(function(e){
        
        
   
        //console.log(e.currentTarget.childNodes[1].innerText);
        
        if(this.id != "not_a_song"){
            console.log(this.id);
            let query = '/displaylyrics/' + this.id;
            $.get('/displaylyrics/', this.id, function(displayObj){
                
                const emotionStr =  "<p> sadness: " + displayObj.emotions.sadness + "<br>" +
                                    "joy: " + displayObj.emotions.joy + "<br>" +
                                    "fear: " + displayObj.emotions.fear + "<br>" +
                                    "disgust: " + displayObj.emotions.disgust + "<br>" +
                                    "anger: " + displayObj.emotions.anger + "</p>";

                //console.log(e.currentTarget.childNodes[1].innerText)
                $('.modal-title').text(e.currentTarget.childNodes[1].innerText);
                $('.modal-body').html(emotionStr + displayObj.lyrics.replace(/(?:\r\n|\r|\n)/g, '<br>'));
                
                //console.log(displayObj);
                console.log(displayObj.emotions);

            });
        }
        

        


    });

});

