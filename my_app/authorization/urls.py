from django.urls import path
from authorization.views import RegisterView
from utils.URLPatternBuilder import URLPatternBuilder


app_name = 'authorization'

urlpatterns = URLPatternBuilder.get_urls_patterns(app_name)
urlpatterns.append(path('register', RegisterView.as_view(), name="register"))
