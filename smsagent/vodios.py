# Vodios.py
from django.db import models
 
class videolist(models.Model):
    deviceSerial = models.CharField(max_length=20)
    channelNo = models.CharField(max_length=20)
    channelName = models.CharField(max_length=20)
    picUrl = models.CharField(max_length=255)


