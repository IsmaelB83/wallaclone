module.exports = {
    apps:[{
            "name": "wallaclone_api",
            "cwd": "./wallaclone/backend",
            "script": "npm",
            "args": "start",
            "watch": false,
            "autorestart": true,
            "out_file": "logs/wallaclone_api_app.log",
            "error_file": "logs/wallaclone_api_error.log"
    },
    {       "name": "wallaclone_photos",
            "cwd": "./wallaclone/backend",
            "script": "npm",
            "args": "run photos",
            "watch": false,
            "autorestart": true,
            "out_file": "logs/wallaclone_photos_app.log",
            "error_file": "logs/wallaclone_photos_error.log"
    },
    {       "name": "wallaclone_notify",
            "cwd": "./wallaclone/backend",
            "script": "npm",
            "args": "run notify",
            "watch": false,
            "autorestart": true,
            "out_file": "logs/wallaclone_notify_app.log",
            "error_file": "logs/wallaclone_notify_error.log"
    },
    {       "name": "wallaclone_chat",
            "cwd": "./wallaclone/backend",
            "script": "npm",
            "args": "run chat",
            "watch": false,
            "autorestart": true,
            "out_file": "logs/wallaclone_chat_app.log",
            "error_file": "logs/wallaclone_chat_error.log"
    }]
};
