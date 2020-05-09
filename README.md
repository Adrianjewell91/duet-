TODO: Get this to a point where people can at least use it somewhat. 

Lets try to get hitomi and me to play in the same chat. 

Get sessions working.
    Homepage 
    Click a button and new window new session 
        - use the concept of a room


    /session/:id


Figure out the volume issue
Have a nice css layout.
Figure out socket.io?

Get two way playing on the same keyboard working.
Handle multiple initialization attempts. 
Show error if no keyboard connect and try to play.

____

Make it sound like a piano at least somewhat 
		- stop the speakers from blowing out.
		- get a nicer sound
		- pedal.

Add a visual keyboard and have something nice looking. 

Make the keyboard have no lag at all:
	- some kind of time loop on the client.
	- am i doing UDP in my websocket? (but what if the key up event doesn't work?)

Users can spin up a new session
		0. Home page with a button that says “start a new session”:
		1. Manage an array of server objects that server the same static file and listen on different ports (can set a max number of servers(lessons)),
			but if this main server crashes then they all crash? Is that true? If not, how do I terminate them?
		2. Then make them separate processes?
		3. Then make it containerized, more scalable later on?



