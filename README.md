https://duetduet.herokuapp.com/

Connect your midi keyboard, turn it on, and start the jam!

Duet lets you play duets over the internet. Structurally, the app uses a websocket server to host the session. Each piano key is one websocket connection. 

Socket server Repo: https://github.com/Adrianjewell91/duet-socketserver

Demo video: https://www.youtube.com/watch?v=vvTyIhzYmQc&feature=youtu.be


Further development todo:

Do a test listen with my family - four people. 
Should I set up clustering for the server?

Figure out session scaling?
    Run in docker and scale docker service with a connection string to each container?

Refactor session class and html to be better. 

Set up a multi instrument calibration - have the user set up a function that determines noteOn notes off logic. 

Put my samples on a cdn? 


Add the overlord feature.

Make some kind of loading signal for when all the sockets are hooked up. 
Add reconnection options?

Pitch the software to the music schools in my neighborhood. 
