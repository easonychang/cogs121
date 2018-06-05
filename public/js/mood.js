$(document).ready(function(){

    console.log("javascript connected moodjs");

    $.get('/moods', function(mood){
        console.log(mood);
        

        /**
         * Averaging out the overall mood and visual display it with Plotly
         */
        mood.anger = mood.anger/20 *100;
        mood.disgust = mood.disgust/20*100;
        mood.fear = mood.fear/20 *100;
        mood.joy = mood.joy/20*100;
        mood.sadness = mood.sadness/20*100;

        console.log(mood);

        var xMood = [mood.anger, mood.disgust, mood.fear, mood.joy, mood.sadness];
        

        var yMood = ['anger', 'disgust', 'fear', 'joy', 'sadness'];

        console.log(yMood[xMood.indexOf(Math.max.apply(null, xMood))]);

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
        title: yMood[xMood.indexOf(Math.max.apply(null, xMood))],
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

        Plotly.newPlot('myDiv', data, layout);


    });

});