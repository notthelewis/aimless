FROM tiangolo/nginx-rtmp
WORKDIR /aimless-rtmp

# RTMP
COPY nginx.new.conf /etc/nginx/nginx.conf
RUN mkdir -p /aimless-rtmp/tmp/recordings
RUN chown 777 /aimless-rtmp/tmp/recordings

# AUTHENTICATION 
RUN curl -fsSL https://deb.nodesource.com/setup_19.x |  bash - &&  apt-get install -y nodejs
RUN mkdir auth

COPY ./auth/lib/* auth
COPY ./auth/.env auth
COPY ./auth/package.json auth

WORKDIR /aimless-rtmp/auth
RUN ls

RUN npm i 

CMD node ./index.js
