from django.shortcuts import render
import requests
import json
from smsagent.vodios import videolist
from django.core import serializers
def index(request):
	return_var = {}
	return_var1 = videolist.objects.filter(deviceSerial=request.GET['deviceid']).order_by("channelNo")
	return_var['datas'] = json.loads(serializers.serialize("json",return_var1))
	# return_var['datas'] = return_var2
	return render(request, 'getonline.html', return_var)


