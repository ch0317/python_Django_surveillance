from django.http import HttpResponse
import requests
import json
import os
import time
from datetime import date
import datetime
def index(request):
	#先通过缓存文件获取  token.txt
	fo = open(os.path.dirname(os.path.abspath(__file__))+"/token.txt", "r")
	line=fo.read()
	text = line
	if text!="":
		returns = json.loads(text)
		nowtime = int(round(time.time()))
		a=""
		t1 = time.strftime("%Y--%m--%d %H:%M:%S", time.localtime(int(returns['data']['expireTime']/1000)))
		t2 = time.strftime("%Y--%m--%d %H:%M:%S", time.localtime(nowtime))

		t1 = date.fromtimestamp(int(returns['data']['expireTime']/1000))
		t2 = date.fromtimestamp(nowtime)

		d1 = datetime.datetime(t1.year,t1.month,t1.day)
		d2 = datetime.datetime(t2.year,t2.month,t2.day)
		a = (d2-d1).days

		if a>7 :
			text = rev7("")
			returns = json.loads(text)
			# line = fo.write( text )
	else:
		text = rev7("")
		returns = json.loads(text)
		# line = fo.write( text )
	fo.close
	return HttpResponse(returns['data']['accessToken'])

def rev7(request):
	fo = open(os.path.dirname(os.path.abspath(__file__))+"/token.txt", "w")
	url = 'https://open.ys7.com/api/lapp/token/get'
	parms = {
	   'appKey' : 'de089a4f97834f999812530e5b69a876',
	   'appSecret':'2233ab45dee3a62a040cbdb46974add0'
	} 
	headers = {
	    'User-agent' : 'none/ofyourbusiness',
	    'Spam' : 'Eggs'
	} 
	resp = requests.post(url, data=parms, headers=headers)
	text = resp.text
	fo.write( text )
	fo.close
	return text