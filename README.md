# MDPin
MDPin. This runs a server and an UI to simulate a fullscreen Android login screen and steal their pin code, via a web browser.

<p float="left">
  <img src="https://user-images.githubusercontent.com/26277763/108247440-90746d80-714a-11eb-8fa2-265f371a11b6.png" width="300" />
  <img src="https://user-images.githubusercontent.com/26277763/108247444-910d0400-714a-11eb-80b8-0d5e15f0c17e.png" width="300" /> 
  <img src="https://user-images.githubusercontent.com/26277763/108247446-91a59a80-714a-11eb-848a-da732dde1000.png" width="300" />
</p>

## How it works

When the user reaches your webpage, and they try to click on a button, it will trigger fullscreen on most browser as well as a UI, which tries to mimick as close as possible Android's login screen.

They will be prompted to slide up and enter their password. The password is sent to you by the webpage (which you are hosting) to the Server (which you are hosting too). After then, there is an unlock animation, and the user will be redirected to `https://www.google.com` thinking their device just unlocked.

MDPin now includes a web server to serve the website which makes the UI. The website will call the Server, which retrieves the device model as well as the collected Password Pin. However, you can also host it yourself on a different server. It can be anything: eg. Wamp, Apache2, Httpd or even an ESP8266/32. All the static files to be served are in the static folder.

## How to run it

By default, the website is started with the server, and is accesible via `yourIpAdress:8075/web/index.html`. eg. `127.0.0.1:8075/web/index.html` If you want to, you can host the webpage somewhere else, like described above. To start the server with the Python API you need to run: 

```
$ git clone https://github.com/bastien8060/MDPin
$ cd MDPin/py
$ python3 pwn.py
```
### HTTPS
MDPin supports Https thanks to Flask. If you are hosting your webpage (static folder) with https using another server, you will need to add https to MDPin (Because XHR disallow requests to http from https). If MDPin uses https, both the webpage (served by MDPin) and the api will run with https.

You will need to have a SSL certificate (`.cert` & `.key` file ) in order to serve it as https, as well as a domain name. If no existing and working certificate certificates are found, MDPin will fallback to Plain HTTP.

The certificates file are stored in the config files (See Configs below). You will also need to correct the port in the configs (see below again) to 8070 when running as https. (Port `8075` == `http`, port `8070` == `https`)

Note that grabbed password are never stored, so you should keep track of what the script shows.

## Configs

MDPin has two config files: `static/config.json` and `py/config.json`

Here is how to set them:

#### Server configs

- `crt`: file path to the SSL Certificate (.crt file). May be Absolute or relative to the pwn.py file. Facultative.
- `key`: file path to the SSL Certificate's key (.key file). May be Absolute or relative to the pwn.py file. Facultative.

#### WebPage configs

- `Address`: Which domain name/IP Address **(Look for "Server Address" when starting pwn.py)** can the Server script be reached by? Your server IP? Your IP on your router?
- `port`: Which port does the Python API run on? **(Look for "port" when starting pwn.py).** Https is usually 443 and http usually 80. Default port for the Server script is 8070 for HTTPS and 8075 for HTTP. Port is shown on startup.
- `prototocol`: **(Look for "protocol" when starting pwn.py).** Https uses certificate and ssl. Did you set them correctly? http doesn't use those. If https doesn't work, it will fallback on http. Which one does the API run on? make sure to include the "://" after the protocol like so: `https://` or `http://`
