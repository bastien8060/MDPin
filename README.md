# MDPin
MDPin. This runs a server and an UI to simulate a fullscreen Android login screen and steal their pin code, via a web browser.

## How it works

When the user reaches your webpage, and they try to click on a button, it will trigger fullscreen on most browser as well as a UI, which tries to mimick as close as possible Android's login screen.

They will be prompted to slide up and enter their password. The password is sent to you by the webpage (which you are hosting) to the Server (which you are hosting too). After then, there is an unlock animation, and the user will be redirected to `https://www.google.com` thinking their device just unlocked.

MDPin now includes a web server to serve the website which makes the UI. The website will call the Server, which retrieves the device model as well as the collected Password Pin. However, you can also host it yourself on a different server. It can be anything: eg. Wamp, Apache2, Httpd or even an ESP8266/32. All the static files to be served are in the static folder.

## How to run it

By default, the website is started with the server, and is accesible via `yourIpAdress:8075/web/index.html`. eg. `127.0.0.1:8075/web/index.html` If you want to, you can host the static webpage somewhere else, like described above. To start the server with the Python API you need to run: 

```
$ cd py
$ python3 pwn.py
```

You will also need to have a SSL certificate (`.cert` & `.key` file ) if you are hosting your static webpage with HTTPS (Because XHR disallow requests to http from https). If no existing and working certificate certificates are found, MDPin will fallback to Plain HTTP.

Note that grabbed password are never stored, so you should keep track of what the script shows.

## Configs

MDPin has two config files: `static/config.json` and `py/config.json`

Here is how to set them:

#### Python API configs

- `crt`: file path to the SSL Certificate (.crt file). May be Absolute or relative to the pwn.py file. Facultative.
- `key`: file path to the SSL Certificate's key (.key file). May be Absolute or relative to the pwn.py file. Facultative.

#### Static Page configs

- `Address`: Which domain name/IP Address can the Python API be reached by? Your server IP? You're IP on your router?
- `port`: Which port does the Python API run on? Https is usually 443 and http usually 80. Default port for Python API is 8070 for HTTPS and 8075 for HTTP. Port is shown on startup.
- `prototocol`: Https uses certificate and ssl. Did you set them correctly? http doesn't use those. If anything doesn't work, it will fallback on http. Which one does the API run on? make sure to include the "://" after the protocol like so: `https://` or `http://`
