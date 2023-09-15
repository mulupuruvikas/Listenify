from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from .models import Song, User, Album, Artist
from .serializers import SongSerializer, ArtistSerializer, AlbumSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from datetime import datetime

class SongListCreateView(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        artist_name = request.data.get('artist')
        genre = request.data.get('genre')
        user_id = request.data.get('user')
        time_listened = request.data.get('time_listened')
        album_name = request.data.get('album')
        cover_url = request.data.get('cover')
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'Invalid user ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Try to retrieve an existing artist or create a new one
        artist, created = Artist.objects.get_or_create(name=artist_name)
        
        # Try to retrieve an existing album or create a new one
        album, created = Album.objects.get_or_create(name=album_name)
        
        song = Song(
            name=name,
            genre=genre,
            user=user,
            time_listened=time_listened,
            artist=artist,
            album=album,
            cover_url=cover_url
        )
        song.save()
        
        serializer = self.get_serializer(song)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class SongRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

class ArtistListCreateView(generics.ListCreateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        pfp_url = request.data.get('pfp_url')

        if not name:
            return Response({'error': 'Name field is required'}, status=status.HTTP_400_BAD_REQUEST)

        artist = Artist(name=name, pfp_url=pfp_url)
        artist.save()
        serializer = self.get_serializer(artist)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ArtistRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

class AlbumListCreateView(generics.ListCreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        cover_url = request.data.get('cover_url')

        if not name:
            return Response({'error': 'Name field is required'}, status=status.HTTP_400_BAD_REQUEST)

        album = Album(name=name, cover_url=cover_url)
        album.save()
        serializer = self.get_serializer(album)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AlbumRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')

        if not email:
            return Response({'error': 'Email field is required'}, status=status.HTTP_400_BAD_REQUEST)

        user, created = User.objects.get_or_create(email=email)
        if not created:
            return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class UserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    



