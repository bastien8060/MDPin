# MDPin
MDPin. This runs a server and an UI to simulate a fullscreen Android login screen and steal their pin code.

## How it works
You need a static web server to serve the `index.html` and every folders with it like `/js` `/css` etc... It can be anything: eg. Wamp, Apache2, Httpd or even an ESP8266/32

The static webserver will serve the appearance & the code which will call the Python API, which retrieves the model as well as the collected Password Pin.

When the user reaches the static webpage, then they will try need to click on a button, which will trigger fullscreen on most browser as well as a UI, which tries to mimick as close as possible Android's login screen.

They will be prompted to slide up and enter their password. The password is sent to you by the Python API (which you are hosting). After then, there is an unlock animation, and the user will be redirected to `https://www.google.com` thinking their device just unlocked.

## How to run it

You will first need to host the static webpage somewhere, like described above. Then you need to run the Python API: `python3 pwn.py`.

You will also need to have a SSL certificate (`.cert` & `.key` file ) if you are hosting your static webpage with HTTPS (Because XHR disallow requests to http from https)

Note that grabbed password are never stored, so you should keep track of what the script shows.

## Configs

MDPin has two config files: `static/config.json` and `py/config.json`

Here is how to set them:

#### Python API configs

- `crt`: file path to the SSL Certificate (.crt file). May be Absolute or relative to the pwn.py file. 
- `key`: file path to the SSL Certificate's key (.key file). May be Absolute or relative to the pwn.py file. 

#### Static Page configs

- `Address`: Which domain name/IP Address can the Python API be reached by?
- `port`: Which port does the Python API run on? Https is usually 443 and http usually 80. Default port for Python API is 8070
- `prototocol`: Https uses certificate and ssl. Did you set them correctly? http doesn't use those. If anything doesn't work, it will fallback on http. Which one does the API run on?
