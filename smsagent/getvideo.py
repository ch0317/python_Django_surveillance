from django.shortcuts import HttpResponse
from django.shortcuts import render
import requests
import json

from . import client

def index(request):
	accessToken = client.index("")
	deviceid = request.GET['str']
	url = 'https://open.ys7.com/api/lapp/live/address/get'
	parms = {
	   'source':deviceid,
	   'accessToken':accessToken
	} 
	headers = {
	    'User-agent' : 'none/ofyourbusiness',
	    'Spam' : 'Eggs'
	} 
	resp = requests.post(url, data=parms, headers=headers)
	text = resp.text
	response = json.loads(text)
	print(response['data'][0]['hls'])
	if response['data'][0]['hls'] == None : #如果没有获得地址，则开通直播功能
		deviceid = request.GET['str']
		url = 'https://open.ys7.com/api/lapp/live/video/open'
		parms = {
		   'source':deviceid,
		   'accessToken':accessToken
		} 
		headers = {
		    'User-agent' : 'none/ofyourbusiness',
		    'Spam' : 'Eggs'
		} 
		resp = requests.post(url, data=parms, headers=headers)
		print(resp.text)
	url = 'https://open.ys7.com/api/lapp/live/address/get'
	parms = {
	   'source':deviceid,
	   'accessToken':accessToken
	} 
	headers = {
	    'User-agent' : 'none/ofyourbusiness',
	    'Spam' : 'Eggs'
	} 
	resp = requests.post(url, data=parms, headers=headers)
	text = resp.text

	return_var = {}
	return_var['datas'] = json.loads(text)

	return render(request, 'videoplay.html', return_var)


