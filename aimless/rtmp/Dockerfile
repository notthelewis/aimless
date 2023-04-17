FROM tiangolo/nginx-rtmp
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /aimless-rtmp
RUN mkdir -p /aimless-rtmp/tmp/recordings
RUN chown 777 /aimless-rtmp/tmp/recordings
