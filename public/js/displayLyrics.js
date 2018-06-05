$(document).ready(function(){

    console.log("javascript connected from DL");

    $('tr').click(function(e){
        //console.log(e.currentTarget.childNodes[1].innerText);
        
        if(this.id != "not_a_song"){
            console.log(this.id);
            let query = '/displaylyrics/' + this.id;
            $.get('/displaylyrics/', this.id, function(displayObj){
                

                var xMoodPercentage = [displayObj.emotions.anger, displayObj.emotions.disgust, displayObj.emotions.fear, displayObj.emotions.joy, displayObj.emotions.sadness];
                
                var xMood = xMoodPercentage.map(x => x * 100);

                var yMood = ['anger', 'disgust', 'fear', 'joy', 'sadness'];

                var trace1 = {
                x: xMood,
                y: yMood,
                xaxis: 'x1',
                yaxis: 'y1',
                type: 'bar',
                marker: {
                    color: 'rgba(50,171,96,0.6)',
                    line: {
                    color: 'rgba(50,171,96,1.0)',
                    width: 1
                    }
                },
                name: 'Mood',
                orientation: 'h'
                };


                var data = [trace1];

                var layout = {
                title: 'SpotiMood',
                xaxis1: {
                    range: [0, 100],
                    domain: [0, 1],
                    zeroline: true,
                    showline: false,
                    showticklabels: true,
                    showgrid: true
                },
                legend: {
                    x: 0.309,
                    y: 1.598,
                    font: {
                    size: 10
                    }
                },
                margin: {
                    l: 100,
                    r: 20,
                    t: 200,b: 70
                },
                
                paper_bgcolor: 'rgb(248,248,255)',
                plot_bgcolor: 'rgb(248,248,255)',

                }

                const emotionStr =  "<p> sadness: " + displayObj.emotions.sadness + "<br>" +
                                    "joy: " + displayObj.emotions.joy + "<br>" +
                                    "fear: " + displayObj.emotions.fear + "<br>" +
                                    "disgust: " + displayObj.emotions.disgust + "<br>" +
                                    "anger: " + displayObj.emotions.anger + "</p>";

                //console.log(e.currentTarget.childNodes[1].innerText)
                $('.modal-title').text(e.currentTarget.childNodes[1].innerText);
                $('.modal-body').html("<div id='dataVis' style=' height: 400px; '></div>" +displayObj.lyrics.replace(/(?:\r\n|\r|\n)/g, '<br>'));
                
                //console.log(displayObj);
                console.log(displayObj.emotions);
                Plotly.newPlot('dataVis', data, layout);

            });
        }
    });
});

