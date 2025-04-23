from django.urls import path
from django.contrib.auth.views import LogoutView
from authorization.views import RegisterView, IndexPage, ProfileView, CustomLogoutView


app_name = 'authorization'

urlpatterns = [
    path('', IndexPage.as_view(), name="index_page"),
    path('register', RegisterView.as_view(), name="register"),
    path('profile', ProfileView.as_view(), name="profile"),
    path('logout', CustomLogoutView.as_view(), name='logout'),
]
