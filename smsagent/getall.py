#采集所有摄像头信息
from django.shortcuts import HttpResponse
import requests
import json
from . import client
from smsagent.vodios import videolist

def index(request):
	accessToken = client.index("")
	url = 'https://open.ys7.com/api/lapp/camera/list'
	parms = {
	   'pageStart' : request.GET['p'],
	   'pageSize':'50',
	   'accessToken':accessToken,
	} 
	headers = {
	    'User-agent' : 'none/ofyourbusiness',
	    'Spam' : 'Eggs'
	} 
	resp = requests.post(url, data=parms, headers=headers)
	text = resp.text
	querylist = []
	retunarr = json.loads(text)
	if request.GET['p']==1:
		videolist.objects.all().delete() #先清空数据，再重新更新
	for datalist in retunarr['data']:
	    querylist.append(videolist(deviceSerial=datalist['deviceSerial'],channelNo=datalist['channelNo'],channelName=datalist['channelName'],picUrl=datalist['picUrl']))
	videolist.objects.bulk_create(querylist)

	return HttpResponse("操作成功,共有"+str(retunarr['page']['page'])+"页")


