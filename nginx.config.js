server {
    root /home/node/wallaclone/frontend/build;
    server_name bernaldev.com www.bernaldev.com;
    index index.html index.htm;

    location / {
            try_files $uri /index.html;
    }

listen 443 ssl; # managed by Certbot
ssl_certificate /etc/letsencrypt/live/bernaldev.com/fullchain.pem; # managed by Certbot
ssl_certificate_key /etc/letsencrypt/live/bernaldev.com/privkey.pem; # managed by Certbot
include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
if ($host = www.bernaldev.com) {
    return 301 https://$host$request_uri;
} # managed by Certbot

if ($host = bernaldev.com) {
    return 301 https://$host$request_uri;
} # managed by Certbot

listen 80;
server_name bernaldev.com www.bernaldev.com;
return 404; # managed by Certbot
}
