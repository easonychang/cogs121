$(document).ready(function(){

    console.log("javascript connected moodjs");


    var xMood = [90, 30, 20, 5, 10];

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

    Plotly.newPlot('myDiv', data, layout);


    

});