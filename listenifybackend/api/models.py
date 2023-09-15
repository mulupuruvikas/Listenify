from django.db import models
from datetime import datetime, date

# Create your models here.

class User(models.Model):
    email = models.EmailField(unique=True)

class Artist(models.Model):
    name = models.CharField(max_length=100, default=None)
    pfp_url = models.URLField(max_length=200, blank=True, null=True)

class Album(models.Model):
    name = models.CharField(max_length=100, default=None)
    cover_url = models.URLField(max_length=200, blank=True, null=True)

class Song(models.Model):
    name = models.CharField(max_length=288, default=None)
    artist = models.ForeignKey('Artist', on_delete=models.RESTRICT, default=None)
    genre = models.CharField(max_length=50, default=None)
    user = models.ForeignKey('User', on_delete=models.RESTRICT, default=None)
    time_listened = models.DateTimeField(auto_now_add=True)
    album = models.ForeignKey('Album', on_delete=models.RESTRICT, default=None)
    cover_url = models.URLField(max_length=200, blank=True, null=True)






