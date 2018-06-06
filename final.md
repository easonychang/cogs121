Final
====

### DEMO
[Demo Video](https://youtu.be/vefJG9gyTgk)


## File Description

### Views (Handlebar Files)

#### home.handlebars
This is the home page, the handlebar template defines the outline and format of songs that will be displayed to users, when a user's songs are loaded through getSong.js.

#### login-index.handlebars
This is the login page's outline, once authenticated through spotify, will direct users to the home page.

#### mood.handlebars
The crux of the app, it displays the most recent 20 songs the user listened to on spotify, and displays them in a table form, has data such as name, artist, duration. Whenever a song is clicked, the song lyrics and the mood of that song will pop up.

### Public/Js (JavaScript Frontend)

#### displayLyrics.js
The frontend that displays lyrics and overall emotion given the data and data visualization of the mood of each songs.

#### displayModal.js
The frontend that has a pop up modal that includes a loading animation before the lyrics and emotion are fully loaded. Clicking anywehre else other than the modal closes it.

#### getSong.js
Using ajax function of jQuery, we display all the songs in a row of 4.

#### mood.js
Data Visualization with [Plotly](https://plot.ly/javascript/) of the overall mood.


### Routes (NodeJS Backend)

#### app.js
The backend engine/server, where all the routing happens.

#### displaylyrics.js
Using Firebase and [Lyricist](https://github.com/scf4/lyricist) (an online lyrics scraper that uses the genius.com API). The users interact with the frontend by clicking a song, that song's ID then is passed to the backend. We then get the name of the song users clicked on from firebase, search the song genius.com's API, get the lyrics of the song to pass into [IBM Watson Natural Language Understanding API](https://www.ibm.com/watson/services/natural-language-understanding/), we then get an sentiment/emotion of the song based on the lyrics, we couple the emotions with the lyrics and send it back to the frontend. 


#### getSong.js
Using Firebase, get all the songs that were recently played from the database, this data was entered into the database when the user logged in, then pass it back to frontend.

#### home.js
Using Firebase, [IBM Watson Natural Language Understanding API](https://www.ibm.com/watson/services/natural-language-understanding/), when the user logs in, they are redirected to the home page, we store user's basic info using spotify api, display them on the home page, we load their data into firebase's real time database, we also calcualte their overall emotion at this stage by entering all the lyrics into the IBM API, and taking the average. 

#### index.js
Displays the Login Page

#### login.js
Using spotify api, we authenticate users, and redirect them to the home page.

#### mood.js
This sends the data of the overall emotion to frontend, and also it's grab all the songs data and send to frontend's table of songs.

