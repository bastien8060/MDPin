import os



directories=['static',str(os.path.join('..','static'))]

for i in directories:
	print(os.path.isdir(i))
#os.path.isdir('')