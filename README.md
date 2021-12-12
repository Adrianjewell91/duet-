# Duet Duet: Online Piano Collaboration
<img width="1080" alt="Screen Shot 2021-12-11 at 9 20 58 PM" src="https://user-images.githubusercontent.com/28193592/145697950-3dbc448b-3079-47b2-aef9-b701de02cdd1.png">

https://duetduet.herokuapp.com/
Connect your midi keyboard, turn it on, and start the jam!

Demo video: https://www.youtube.com/watch?v=vvTyIhzYmQc&feature=youtu.be

# Overview

Duet Duet emerged from the challenges of both online teaching and group piano classes. For online teaching, it solves the visual challenge of communicating about the piano with limited visability. For group piano classes, it solves the problem of one teacher needing to supervise many students at once from a single point command. This is a proof of concept showing how these two problems could be solved by combining the internet and tools like electronic keyboards. Today, google chrome supports MIDI integration with electronic keyboards, and such data can be transmitted over the internet with relative ease. Duet Duet prototypes this technology by having people play their instrument and then transmitting all simultaneous players' music to everyone else.  

Simply connect the piano and let the app do the work. Currently only Casio P3100 supported, and no pedal. 

# Features:

1. [Online Piano](#piano)
2. [Web Socket Backend](#grid)
3. [Multiple Sessions](#flat)
4. [Colors](#analyzer)

# Feature Highlights:

## 1. <a name="piano"></a>Piano

The online piano is a collecton of samples that I made myself from Garageband. Originally I used web audio api, but then chose sampling. you can see the progression in the git history. 

Special thx to Benjamin Pritchard / Kundalini Software for some piano rendering code.  

## 2. <a name="grid"></a>Web Socket Backend

Structurally, the app uses a websocket server to host the session. Each piano key is one websocket connection. 

Socket server Repo: https://github.com/Adrianjewell91/duet-socketserver

## 3. <a name="flat"></a>Multiple Sessions

Right now, the mulitple sessions are hardcoded to multiple backends, but this could scale in the future containers and dynamic configs. 

## 4. <a name="analyzer"></a>Colors

Notes turn on and off when they are played, blue notes are your notes, and red notes are other's notes.

# Further Implementations

Scaling is a major opportunity in this project. One way is for for participators in a single sessions. Right now, max four people can participate in the session, but that number should be much higher. 

Another opportunity is in the number of sessions. There should really be unlimited number of sessions. Containerization will help with this, enabling Dynamic configs and the rest is pretty much from there.

Another opportunity is the syncing of the notes. Right now, the data is udp style but still over tcp, so the notes from other players just sound whenever they arrive. It would be great to sync the notes to a time frame of some sort, but the trade off is potentialy delay. The other option is to really streamline the packets. In fact, some improvements along this line has already made a big difference. One thing I did was compress the packets, and also create a single socket for each piano key.  

