from django.shortcuts import render
import requests
import json

from . import client


def index(request):
	accessToken = client.index("")
	print(accessToken)
	url = 'https://open.ys7.com/api/lapp/device/list'
	parms = {
	   'pageStart' : '0',
	   'pageSize':'100',
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
	return render(request, 'getlist.html', return_var)


