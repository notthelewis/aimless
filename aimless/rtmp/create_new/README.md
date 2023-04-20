# Aimless Streaming Config Generator

This software generates a unique NGINX config each time it is ran, using a username and password as it's input.
It generates a completely random live stream key, which is provided to the streamer when they start streaming.

The outputed config file will be used to build a new Docker container completely unique to every stream.

Consequently, in theory, streams should be extremely stable as every stream has it's own separate container hosted 
somewhere on AWS. Since every stream is isolated from one another, one broken stream should never affect any others.

From an infrastructure cost perspective, servers are only running when they are being used. This should be considerably
cheaper than running servers all the time which aren't being actively used.

# How to use 

Your system must have:
 - yarn
 - node

Run:
 - `yarn build` to build the code 
 - `node ./lib/index.js` to run the code

