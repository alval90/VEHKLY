"""This module defines the url patterns and views to render"""
from django.contrib import admin
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.urls import re_path, path, include
from django.conf.urls.static import static
from django.conf import settings

@ensure_csrf_cookie
def index_view(request):
    """This function returns the HttpResponse created using the static build of the react app"""
    return render(request, 'dist/index.html')

urlpatterns = [
	path('admin/', admin.site.urls),
	path('api/', include('api.urls')),
	re_path(r'^(?!api\/|media\/|admin\/).*$', index_view, name='index'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
