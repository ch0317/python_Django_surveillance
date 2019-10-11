#coding=utf-8
from django import template
register=template.Library()
@register.filter

def mod(v, n):
    return v % n