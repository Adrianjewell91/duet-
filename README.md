TODO:

Set up a multi instrument calibration - have the user set up a function that determines noteOn notes off logic. 

Find some way to release the notes gracefully.
    noteOn -
    cancel scheduled values. 
     reset current time. 
    play if paused. 

    noteOff - just set a linear Ramp to zero but don't pause

Have notes from other pianos play in blue. 

Refactor to use classes and make this thing more readable. 

Create sessions:
Host another web socket-only server on heroku and try to connect to it. 
If it works, separate the web app from the socket server.
host another socket only server, 
Create options on the home page to join session one or session 2.
Add the overlord feature.

Scale to many sessions, somehow.

Make some kind of loading signal for when all the sockets are hooked up. 
Add reconnection options?


Pitch the software to the music schools in my neighborhood. 
