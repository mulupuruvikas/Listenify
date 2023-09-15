from rest_framework import serializers
from .models import Song, Artist, User, Album

class SongSerializer(serializers.ModelSerializer):

    class Meta:
        model = Song
        fields = ['id', 'name', 'artist', 'genre', 'user', 'time_listened', 'album', 'cover_url']

    def validate(self, attrs):
        if attrs.get('name') is None:
            raise serializers.ValidationError('Name field is required')
        return attrs
    
class ArtistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Artist
        fields = ['id', 'name', 'pfp_url']

    def validate(self, attrs):
        if attrs.get('name') is None:
            raise serializers.ValidationError('Name field is required')
        return attrs
    
class AlbumSerializer(serializers.ModelSerializer):

    class Meta:
        model = Album
        fields = ['id', 'name', 'cover_url']

    def validate(self, attrs):
        if attrs.get('name') is None:
            raise serializers.ValidationError('Name field is required')
        return attrs
    

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User;
        fields = ['id', 'email']

    def validate(self, attrs):
        if attrs.get('email') is None:
            raise serializers.ValidationError('Email field is required.')
        return attrs
