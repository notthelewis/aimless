import { UserConfig } from "./UserConfig";

// TODO: Add username config
export const buildConfig = (conf: UserConfig): string =>
    `
    # Required for RTMP
    worker_processes 1;

    events {
        worker_connections 1024;
    }

    rtmp_auto_push on;

    http {
        # For authentication
        server { 
            listen 1523;
            root /usr/local/www/nginx/;
            index index.html;
        }
    }

    rtmp {
        server {
            listen 1935;
            listen [::]:1935 ipv6only=on;

            chunk_size 4096; 

            # Healthcheck, autoclose streams
            ping 3m;
            ping_timeout 30s;

            # Each user has a unique application address
            application ${conf.username}-stream {
                live on;
                on_publish http://localhost:5000/auth;
                record all;
                record_path "/aimless-rtmp/tmp/recordings";
                record_suffix ${conf.username}-%d-%b-%y-%T.flv;
            }
        }
    }`;
