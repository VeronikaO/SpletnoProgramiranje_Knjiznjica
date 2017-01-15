 
from django.conf.urls import url
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^logout/', views.logout_user, name='logout'),
    url(r'^Legal/', views.legal, name='Legal'),
    url(r'^About/', views.about, name='About'),
    url(r'^Sitemap/', views.sitemap, name='Sitemap'),
    url(r'^Wishlist/', views.wishlist, name='Wishlist'),
    url(r'^Checkout/', views.checkout, name='Checkout'),
    url(r'^main/', views.book_main, name='book_main'),
    url(r'^main/(?P<filter>.*)/', views.book_filter, name='book_main_filter'),
    url(r'^(?P<book_title>.*)/', views.book_page, name='book_page'),
]
