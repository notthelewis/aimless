import { UserConfig } from './UserConfigGenerator';

export const buildConfig = (conf: UserConfig): string => 
    `worker_processes auto;
    rtmp_auto_push on;
    events {}

    http {
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

            ping 3m;
            ping_timeout 30s;

            application ${conf.streamKey} {
                live on;
                record all;
                record_path "/aimless-rtmp/tmp/recordings";
                record_suffix ${conf.username}-%d-%b-%y-%T.flv;
            }
        }
    }`;
