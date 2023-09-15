from django.urls import path
from .views import ArtistListCreateView, AlbumListCreateView, ArtistRetrieveUpdateDestroyView, AlbumRetrieveUpdateDestroyView, SongListCreateView, SongRetrieveUpdateDestroyView, UserListCreateView, UserRetrieveUpdateDestroyView

urlpatterns = [
    # List and create views for Artists
    path('artists/', ArtistListCreateView.as_view(), name='artist-list-create'),
    # Retrieve, update, and delete views for a specific Artist
    path('artists/<int:pk>/', ArtistRetrieveUpdateDestroyView.as_view(), name='artist-retrieve-update-destroy'),

    # List and create views for Albums
    path('albums/', AlbumListCreateView.as_view(), name='album-list-create'),
    # Retrieve, update, and delete views for a specific Album
    path('albums/<int:pk>/', AlbumRetrieveUpdateDestroyView.as_view(), name='album-retrieve-update-destroy'),

    # List and create views for Songs
    path('songs/', SongListCreateView.as_view(), name='song-list-create'),
    # Retrieve, update, and delete views for a specific Song
    path('songs/<int:pk>/', SongRetrieveUpdateDestroyView.as_view(), name='song-retrieve-update-destroy'),

    # List and create views for Songs
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    # Retrieve, update, and delete views for a specific Song
    path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-retrieve-update-destroy'),
]