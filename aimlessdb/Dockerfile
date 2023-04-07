FROM mysql:latest
WORKDIR /aimless-api
COPY db-schema.sql /aimless-api/
COPY .my.cnf /root/
RUN chmod 0444 /root/.my.cnf
