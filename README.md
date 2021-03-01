# MDPin
MDPin is a server and a website. It contains an UI to fake a Android login screen to steal their pin code. It works via a web browser, by going fullscreen.

<p float="left">
  <img src="https://user-images.githubusercontent.com/26277763/109572152-a9830400-7ae4-11eb-9ad9-09fb5f4566bc.gif" width="240" /><br><br>
  <img src="https://user-images.githubusercontent.com/26277763/108247440-90746d80-714a-11eb-8fa2-265f371a11b6.png" width="240" />
  <img src="https://user-images.githubusercontent.com/26277763/108247444-910d0400-714a-11eb-80b8-0d5e15f0c17e.png" width="240" /> 
  <img src="https://user-images.githubusercontent.com/26277763/108247446-91a59a80-714a-11eb-848a-da732dde1000.png" width="240" />
</p>

## How it works

When the user reaches your webpage, and they try to click on a button (Eg. A fake "Connect to wifi" button), it will trigger fullscreen and launch an interface which tries to mimick as close as possible Android's login screen.

They will be prompted to slide up and enter their password. The password is sent to you by the webpage (which you are hosting) to the Server (which you are hosting too). After then, there is an unlock animation, and the user will be redirected to `https://www.google.com` thinking their device just unlocked.

MDPin now includes a web server to serve the website which makes the Interface. The website will call the Server, which retrieves the device model as well as the collected Password Pin. However, you can also host it yourself on a different server. It can be anything: eg. Wamp, Apache2, Httpd or even an ESP8266/32. All the static files to be served are in the static folder.

## How to run it

By default, the website is started with the server, and is accessible via `yourIpAdress:8075/web/index.html`. eg. `127.0.0.1:8075/web/index.html`. To find it, you can search for "Website Reachable" when starting up the server script. If you want to, you can host the webpage somewhere else, like described above. To start the server with the Python API you need to run: 

```
$ git clone https://github.com/bastien8060/MDPin
$ cd MDPin/py
$ python3 pwn.py
```

Now you just need to visit the URL of the website started and visit it with a smartphone (All but non-IOS device). The password, once entered on the smartphone will appear on the Terminal/Command Prompt where you started the server (like shown above).
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

## Misc

#### Wallpapers

Wallpapers are chosen automatically for the device model. However, fallback haven't been written yet for when a device brand hasn't been added, so if you encounter a blank page when going fullscreen, make sure to drop an issue in the issue tab for me to fix it.

#### Battery Level

Battery Level is deteected automatically with the browser's API. However, not all browsers may support that feature.


#### Fullscreen

Not all browsers support FullScreen. Some InApp browser do support it though (Eg. visiting a link through Reddit/Instagram etc...). Some of those browser are insecure as they do not prompt the user when they enter fullscreen.
#### Carrier

A new feature will soon come to automatically detect the device's carrier bases on their ISP. This will detect the user's carrier if they are using 3G/4G/5G.
